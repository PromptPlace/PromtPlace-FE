import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import {VitePWA} from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), 
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'favicon-96x96.png','web-app-manifest-192x192.png', 'web-app-manifest-512x512.png'],
      manifest: {
        name: 'PromptPlace',
        short_name: 'PromptPlace',
        start_url: '/',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: "standalone",
        icons: [
          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: "any maskable"
          },
          {
            src: 'web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: "any maskable"
          }
        ]
      },
       workbox: {
        // 런타임 캐싱 규칙을 정의합니다.
        runtimeCaching: [
          {
            // 이 규칙은 'navigation' 요청 (페이지 이동/새로고침)에만 적용됩니다.
            urlPattern: ({ request }) => request.mode === 'navigate',
            // 'NetworkFirst': 네트워크를 먼저 시도하고, 실패 시(오프라인) 캐시를 사용합니다.
            handler: 'NetworkFirst',
            options: {
              // 네비게이션 요청을 위한 캐시 이름
              cacheName: 'pages-cache',
            },
          },
        ],
      },

    }),  
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@apis', replacement: '/src/apis' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@enums', replacement: '/src/enums' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@types', replacement: '/src/types' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@data', replacement: '/src/data' },
    ],
  },
});
