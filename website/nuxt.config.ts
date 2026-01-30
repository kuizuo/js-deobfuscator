import { nodePolyfills } from 'vite-plugin-node-polyfills'

const __dirname = new URL('.', import.meta.url).pathname

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-monaco-editor', '@nuxtjs/seo'],
  app: {
    head: {
      title: 'JS Deobfuscator - 在线 JS 反混淆工具',
      titleTemplate: '%s',
      htmlAttrs: { lang: 'zh-CN' },
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
  site: {
    url: 'https://js-deobfuscator.vercel.app',
    name: 'JS Deobfuscator',
    description: '让混淆不再成为逆向分析中的绊脚石。基于 Babel AST 的自动化 JS 反混淆工具，提供在线 Playground、命令行与可编程 API。',
    defaultLocale: 'zh-CN',
  },
  seo: {
    meta: {
      description: '让混淆不再成为逆向分析中的绊脚石。基于 Babel AST 的自动化 JS 反混淆工具，提供在线 Playground、命令行与可编程 API。Make obfuscation no longer a stumbling block in reverse analysis.',
      themeColor: [
        { content: '#18181b', media: '(prefers-color-scheme: dark)' },
        { content: '#fef3c7', media: '(prefers-color-scheme: light)' },
      ],
      ogImage: 'https://img.kuizuo.me/js-deobfuscator.png',
      ogTitle: 'JS Deobfuscator - 在线 JS 反混淆工具',
      ogSiteName: 'JS Deobfuscator',
      twitterCard: 'summary_large_image',
      twitterTitle: 'JS Deobfuscator - 在线 JS 反混淆工具',
    },
  },
  schemaOrg: {
    enabled: false,
  },
  devtools: { enabled: true },
})
