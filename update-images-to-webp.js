#!/usr/bin/env bun
/**
 * Автоматическая замена всех PNG изображений на WebP с fallback
 */

import { readFile, writeFile } from 'fs/promises';

const HTML_FILE = './index.html';

async function updateImagesToWebP() {
    try {
        let html = await readFile(HTML_FILE, 'utf-8');

        // Паттерн для поиска img тегов с PNG
        const imgRegex = /<img\s+([^>]*src="images\/([^"]+)\.png"[^>]*)>/gi;

        // Заменяем каждый img на picture с WebP и PNG fallback
        html = html.replace(imgRegex, (match, attributes, filename) => {
            // Извлекаем все атрибуты
            const srcMatch = match.match(/src="([^"]+)"/);
            const altMatch = match.match(/alt="([^"]*)"/);
            const classMatch = match.match(/class="([^"]+)"/);
            const loadingMatch = match.match(/loading="([^"]+)"/);

            const src = srcMatch ? srcMatch[1] : '';
            const alt = altMatch ? altMatch[1] : '';
            const className = classMatch ? classMatch[1] : '';
            const loading = loadingMatch ? loadingMatch[1] : 'lazy';

            const webpSrc = src.replace('.png', '.webp');

            // Для декоративных звёзд не меняем (уже SVG)
            if (src.includes('star-decor')) {
                return match;
            }

            // Создаем picture элемент с WebP и PNG fallback
            return `<picture>
                <source type="image/webp" srcset="${webpSrc}">
                <img src="${src}" alt="${alt}"${className ? ` class="${className}"` : ''}${loading ? ` loading="${loading}"` : ''}>
            </picture>`;
        });

        await writeFile(HTML_FILE, html, 'utf-8');

        console.log('✅ HTML обновлен для использования WebP с PNG fallback');
    } catch (err) {
        console.error('❌ Ошибка:', err);
        process.exit(1);
    }
}

updateImagesToWebP();
