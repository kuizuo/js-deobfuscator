import { nodePolyfills } from 'vite-plugin-node-polyfills'

const __dirname = new URL('.', import.meta.url).pathname

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-11',
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-monaco-editor', '@nuxtjs/seo'],
  app: {
    head: {
      title: 'JS Deobfuscator - Online JavaScript Deobfuscation Tool',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
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
  vite: {
    legacy: {
      inconsistentCjsInterop: true,
    },
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
        'deob': `${__dirname}/../packages/deob/src`,
      },
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/global.css',
  ],
  imports: {
    dirs: ['./composables', './utils'],
  },
  hooks: {
    'vite:extendConfig': (config, { isClient }) => {
      if (isClient) {
        Object.assign(config, { plugins: [...(config.plugins ?? []), ...nodePolyfills({
          exclude: ['fs'],
          globals: { process: false },
        })] })
      }
    },
    'build:manifest': (manifest) => {
      for (const entry of Object.values(manifest))
        entry.dynamicImports = []
    },
  },
  site: {
    url: 'https://js-deobfuscator.vercel.app',
    name: 'JS Deobfuscator',
    description: 'Turn obfuscated JavaScript into clean, readable code with an online playground, CLI, and programmable API powered by Babel AST.',
    defaultLocale: 'en',
  },
  seo: {
    meta: {
      description: 'Turn obfuscated JavaScript into clean, readable code with an online playground, CLI, and programmable API powered by Babel AST.',
      themeColor: [
        { content: '#18181b', media: '(prefers-color-scheme: dark)' },
        { content: '#fef3c7', media: '(prefers-color-scheme: light)' },
      ],
      ogImage: 'https://img.kuizuo.me/js-deobfuscator.png',
      ogTitle: 'JS Deobfuscator - Online JavaScript Deobfuscation Tool',
      ogSiteName: 'JS Deobfuscator',
      twitterCard: 'summary_large_image',
      twitterTitle: 'JS Deobfuscator - Online JavaScript Deobfuscation Tool',
    },
  },
  schemaOrg: {
    enabled: false,
  },
  ogImage: {
    enabled: false,
  },
  devtools: { enabled: true },
})
