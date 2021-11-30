export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "todolist",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        integrity:
          "sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p",
        crossorigin: "anonymous",
        href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/base/reset.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios-accessor.ts", "~/plugins/vee-validate.ts"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/apollo",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/apollo",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate"],
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
  // publicRuntimeConfig: {
  //   axios: {
  //     baseURL: "https://api.nuxtjs.dev",
  //   },
  // },
  // publicRuntimeConfig: {
  //   axios: {
  //     baseURL: "http://localhost:3001",
  //   },
  // },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "http://localhost:8080/graphql",
      },
    },
  },
};
