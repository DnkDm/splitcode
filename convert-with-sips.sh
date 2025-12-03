#!/bin/bash
# Конвертация PNG в WebP с использованием системных инструментов

echo "🎨 Начинаем конвертацию PNG → WebP..."
echo ""

cd images

# Проверяем наличие cwebp
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp не установлен. Устанавливаем через Homebrew..."
    if command -v brew &> /dev/null; then
        brew install webp
    else
        echo "❌ Homebrew не установлен. Пожалуйста, установите webp вручную."
        exit 1
    fi
fi

total_original=0
total_new=0
count=0

for file in *.png; do
    if [ -f "$file" ]; then
        # Получаем размер оригинального файла
        original_size=$(stat -f%z "$file")
        total_original=$((total_original + original_size))

        # Конвертируем в WebP
        output="${file%.png}.webp"
        cwebp -q 85 "$file" -o "$output" 2>/dev/null

        # Получаем размер нового файла
        new_size=$(stat -f%z "$output")
        total_new=$((total_new + new_size))

        # Вычисляем уменьшение
        reduction=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc)
        original_mb=$(echo "scale=2; $original_size / 1024 / 1024" | bc)
        new_mb=$(echo "scale=2; $new_size / 1024 / 1024" | bc)

        echo "✅ $file"
        echo "   ${original_mb}MB → ${new_mb}MB (уменьшение на ${reduction}%)"

        count=$((count + 1))
    fi
done

echo ""
echo "📊 Итоги:"
total_original_mb=$(echo "scale=2; $total_original / 1024 / 1024" | bc)
total_new_mb=$(echo "scale=2; $total_new / 1024 / 1024" | bc)
total_reduction=$(echo "scale=1; (1 - $total_new / $total_original) * 100" | bc)

echo "   Обработано файлов: $count"
echo "   Было: ${total_original_mb}MB"
echo "   Стало: ${total_new_mb}MB"
echo "   Уменьшение: ${total_reduction}%"
echo ""
