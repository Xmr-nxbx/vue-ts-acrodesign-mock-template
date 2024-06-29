import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router/index";

const pinia = createPinia();

// mock
if (import.meta.env.VITE_USE_MOCK === "true") {
  import("@/mock/index")
    .then((mockModule) => {
      mockModule.mockRequest();
    })
    .catch((error) => {
      console.log(error);
    });
}

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
