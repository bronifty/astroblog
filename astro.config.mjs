import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // output: "server",
  // adapter: vercel(),
  site: "https://blog.bronifty.xyz",
  integrations: [
    mdx(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    react(),
    sitemap(),
    tailwind(),
  ],
  vite: {
    server: {
      watch: {
        ignored: "**/node_modules/**",
      },
    },
  },
});
