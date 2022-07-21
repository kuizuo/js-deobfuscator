import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'
import PurgeIcons from 'vite-plugin-purge-icons'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
    'process.platform': null,
    'process.version': null,
    ...(process.env.NODE_ENV === 'production' ? null : { Buffer: ['buffer', 'Buffer'] }),
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '/@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core'],
      dts: 'src/auto-import.d.ts',
      dirs: ['src/composables', 'src/store'],
      vueTemplate: true,
    }),

    Components({
      resolvers: [ElementPlusResolver()],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),

    WindiCSS(),
    PurgeIcons({}),
    Inspect(),
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
