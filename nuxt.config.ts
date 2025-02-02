// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
		head: {
			title: "Clockify_summary",
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: process.env.NUXT_PUBLIC_LOGO || '/logo.png' },
			]
		}
	},
  routeRules: {
    '/': { prerender: true },
  },
  runtimeConfig: {
		public: {
			API_KEY: process.env.API_KEY ?? '',
      		WORKSPACE : process.env.WORKSPACE ?? '',
			PUBLIC_URL : process.env.PUBLIC_API ?? 'http://localhost:5800'
		}
	},
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
  imports: {
		dirs: ['composables', 'composables/**'],
	},

 	build: {
		transpile: [
			''
		]
	},
})