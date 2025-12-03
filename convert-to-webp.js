#!/usr/bin/env bun
/**
 * Конвертация PNG изображений в WebP
 * Сохраняет визуальное качество, но значительно уменьшает размер файлов
 */

import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = './images';
const QUALITY = 85; // Баланс между качеством и размером

async function convertToWebP() {
    try {
        const files = await readdir(IMAGES_DIR);
        const pngFiles = files.filter(file => extname(file).toLowerCase() === '.png');

        console.log(`\n🎨 Найдено ${pngFiles.length} PNG файлов для конвертации\n`);

        let totalOriginalSize = 0;
        let totalNewSize = 0;

        for (const file of pngFiles) {
            const inputPath = join(IMAGES_DIR, file);
            const outputPath = join(IMAGES_DIR, basename(file, '.png') + '.webp');

            try {
                // Получаем информацию о входном файле
                const inputStats = await Bun.file(inputPath).size;
                totalOriginalSize += inputStats;

                // Конвертируем в WebP
                await sharp(inputPath)
                    .webp({ quality: QUALITY, effort: 6 })
                    .toFile(outputPath);

                // Получаем информацию о выходном файле
                const outputStats = await Bun.file(outputPath).size;
                totalNewSize += outputStats;

                const reduction = ((1 - outputStats / inputStats) * 100).toFixed(1);
                const originalMB = (inputStats / 1024 / 1024).toFixed(2);
                const newMB = (outputStats / 1024 / 1024).toFixed(2);

                console.log(`✅ ${file}`);
                console.log(`   ${originalMB}MB → ${newMB}MB (уменьшение на ${reduction}%)`);
            } catch (err) {
                console.error(`❌ Ошибка при конвертации ${file}:`, err.message);
            }
        }

        const totalReduction = ((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1);
        const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
        const totalNewMB = (totalNewSize / 1024 / 1024).toFixed(2);

        console.log(`\n📊 Итоги:`);
        console.log(`   Было: ${totalOriginalMB}MB`);
        console.log(`   Стало: ${totalNewMB}MB`);
        console.log(`   Уменьшение: ${totalReduction}%\n`);

    } catch (err) {
        console.error('❌ Ошибка:', err);
        process.exit(1);
    }
}

convertToWebP();
