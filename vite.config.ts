import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
// import Icons from 'unplugin-icons/vite'
// import ElementPlus from 'unplugin-element-plus/vite'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import IconsResolver from 'unplugin-icons/resolvers'
// import { preloadImagePlugin } from './src/plugins/preloadImagePlugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // preloadImagePlugin({
    //   dir: '*.{jpg,jpeg,png,svg,gif,webp,bmp,ico}',
    //   attrs: {
    //     rel: 'preload',
    //   },
    // }),
    vue(),
    vueJsx(),
    vueDevTools(),
    // 开启 Element Plus 自动引入CSS
    // ElementPlus({}),
    // 自动导入组件
    // AutoImport({
    // // 定义需要自动引入的框架
    //   imports: ['vue', 'vue-router', 'pinia'],
    //   // 处理eslint 自动生成 .eslintrc-auto-import.json 文件
    //   eslintrc: {
    //     enabled: true
    //   },
    //   resolvers: [ElementPlusResolver(), IconsResolver()],
    //   dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url)),
    //   // imports: ['vue', 'vue-router'],
    //   // dirs: ['./src/composables', './src/stores'],
    // }),
    // 自动注册组件
    // Components({
    //   resolvers: [ElementPlusResolver(), IconsResolver()],
    //   dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url)),
    //   dirs: [fileURLToPath(new URL('./src/components/auto', import.meta.url))],
    // }),
    // Icons({
    //   autoInstall: true
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: { api: 'modern-compiler' },
  //   }
  // },
})
