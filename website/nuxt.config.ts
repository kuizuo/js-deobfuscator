import { nodePolyfills } from 'vite-plugin-node-polyfills'

const __dirname = new URL('.', import.meta.url).pathname

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
    optimizeDeps: {
      exclude: ['isolated-vm'],
    },
    build: {
      target: 'chrome89',
      sourcemap: true,
      rollupOptions: {
        external: ['isolated-vm'],
      },
    },
    worker: {
      format: 'es',
    },
    define: {
      'process.env': JSON.stringify({}),
      'process.versions.node': JSON.stringify('18.17.1'),
    },
    resolve: {
      alias: {
        // @codemod/matchers imports @codemod/utils which imports @babel/core, but it's not needed
        // by replacing it with a dummy module we can reduce the bundle size by 360kb
        '@babel/core': `${__dirname}/_empty.ts`,
        'isolated-vm': `${__dirname}/_empty.ts`,
        'deob': `${__dirname}../packages/deob/src`,
      },
    },
    plugins: [
      nodePolyfills({ exclude: ['fs'] }),

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
      for (const key of Object.keys(manifest))
        manifest[key].dynamicImports = []
    },
  },
  devtools: { enabled: true },
})
