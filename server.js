#!/usr/bin/env bun
/**
 * Простой локальный сервер для тестирования сайта
 */

import { serve } from "bun";
import { file } from "bun";

const server = serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Главная страница
    if (path === "/") {
      path = "/index.html";
    }

    // Убираем начальный слэш
    const filePath = `.${path}`;

    try {
      const fileContent = file(filePath);
      return new Response(fileContent);
    } catch (err) {
      return new Response("404 Not Found", { status: 404 });
    }
  },
});

console.log(`🚀 Сервер запущен на http://localhost:${server.port}`);
console.log(`📁 Откройте http://localhost:${server.port} в браузере`);
console.log(`⏹  Нажмите Ctrl+C для остановки`);
