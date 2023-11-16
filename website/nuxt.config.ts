import { nodePolyfills } from 'vite-plugin-node-polyfills'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-monaco-editor'],
  app: {
    head: {
      title: 'JS Deobfuscator',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/logo.svg',
        },
      ],
    },
  },
  ssr: false,
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
  vue: {
    defineModel: true,
  },
  vite: {
    define: {
      'process.env': JSON.stringify({}),
      'process.versions.node': JSON.stringify('18.17.1'),
    },
    plugins: [
      nodePolyfills({
        overrides: {
          fs: 'memfs',
        },
      }),
    ],
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/global.css',
  ],
  imports: {
    dirs: ['./composables', './utils'],
  },
  hooks: {
    'build:manifest': (manifest) => {
      for (const key of Object.keys(manifest)) {
        manifest[key].dynamicImports = []
      }
    },
  },
  devtools: { enabled: true }
})
