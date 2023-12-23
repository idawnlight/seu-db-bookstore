import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: false,
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    vite: {
        plugins: [
            Components({
                dts: true,
                resolvers: [NaiveUiResolver()],
            }),
        ],
    }
})