import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // 前端配置 - 清理可能的協議前綴
    const frontendPort = parseInt(env.VITE_FRONTEND_PORT?.replace(/[^0-9]/g, '') || '3001', 10);
    let frontendHost = env.VITE_FRONTEND_HOST || '0.0.0.0';
    frontendHost = frontendHost.replace(/^https?:\/\//, '').split(':')[0];
    
    // 後端配置 - 清理可能的協議前綴
    const apiPort = env.API_PORT?.replace(/[^0-9]/g, '') || '3002';
    let apiHost = env.API_HOST || 'localhost';
    apiHost = apiHost.replace(/^https?:\/\//, '').split(':')[0];
    
    // API Base URL - 如果提供了完整 URL 就使用，否則構建
    let apiBaseUrl = env.API_BASE_URL;
    if (!apiBaseUrl || apiBaseUrl === 'http://localhost:5199' || apiBaseUrl.includes('http://localhost')) {
      apiBaseUrl = `http://${apiHost}:${apiPort}`;
    }
    
    return {
      server: {
        port: frontendPort,
        host: frontendHost,
        proxy: {
          '/api': {
            target: apiBaseUrl,
            changeOrigin: true,
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.ADMIN_USERNAME': JSON.stringify(env.ADMIN_USERNAME || 'admin'),
        'process.env.ADMIN_PASSWORD': JSON.stringify(env.ADMIN_PASSWORD || 'admin123'),
        // 在開發環境中，不設置 VITE_API_BASE_URL，讓前端使用相對路徑 /api（通過 Vite proxy）
        // 在生產環境中，可以通過環境變量設置完整的 API URL
        'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
