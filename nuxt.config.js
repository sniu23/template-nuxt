module.exports = {
  head: {
    title: 'template-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  css: [
    '~/assets/css/index.css',
    '~/assets/css/font-awesome.min.css'
  ],
  router: {
    middleware: ['auth']
  },
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    'baseURL': 'http://127.0.0.1:3001'
  },
  plugins: [
    '~/plugins/element-ui', '~/plugins/axios'
  ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'axios', 'element-ui', 'js-cookie', 'md5'
    ]
  }
}
