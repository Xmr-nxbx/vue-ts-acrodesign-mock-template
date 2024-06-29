import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import { vitePluginForArco } from "@arco-plugins/vite-vue";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const ENV = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      vue(),
      vitePluginForArco(),
      createHtmlPlugin({
        inject: {
          data: {
            title: ENV["VITE_APP_TITLE"],
            icon: ENV["VITE_APP_ICON"],
          },
          tags: [
            {
              tag: "meta",
              attrs: {
                name: "keywords",
                content: ENV["VITE_APP_KEYWORDS"],
              },
            },
            {
              tag: "meta",
              attrs: {
                name: "description",
                content: ENV["VITE_APP_DESCRIPTION"],
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
