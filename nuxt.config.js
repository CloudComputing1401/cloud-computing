import colors from "vuetify/es5/util/colors";

export default {
  env: {
    API_URL: process.env.API_URL,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "خدمات ابری دانشگاه کاشان",
    title: "خدمات ابری دانشگاه کاشان",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main.css",
    "~/assets/css/styles.css",
    "~/assets/css/vuetify.css",
    "~/assets/fonts/style.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/GlobalComponents" },
    { src: "~/plugins/persistedState.client.js" },
    { src: "~/plugins/axios" },
    { src: "@/plugins/datePicker", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxt/postcss8",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    rtl: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#060d2d",
          silver: "#E0F0F5",
          green: "#01987A",
          alert: "#2E1942",
          accent: "#1b6939",
          secondary: "#1b6939",
          yellow: "#F8C23A",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: "#EF476F",
          success: "#06D6A0",
          danger: "#EF476F",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost
  },
};
