// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",

  adapter: cloudflare(),
  vite: {
    ssr: {
      target: "webworker",
      external: ["node:crypto", "node:path"]
    },
    define: {
      'process.env.TURSO_DATABASE_URL': JSON.stringify(process.env.TURSO_DATABASE_URL),
      'process.env.TURSO_AUTH_TOKEN': JSON.stringify(process.env.TURSO_AUTH_TOKEN),
      'process.env.RECAPTCHA_SECRET': JSON.stringify(process.env.RECAPTCHA_SECRET),
      'process.env.PUSHER_APP_ID': JSON.stringify(process.env.PUSHER_APP_ID),
      'process.env.PUBLIC_PUSHER_KEY': JSON.stringify(process.env.PUBLIC_PUSHER_KEY),
      'process.env.PUSHER_SECRET': JSON.stringify(process.env.PUSHER_SECRET),
      'process.env.PUBLIC_PUSHER_CLUSTER': JSON.stringify(process.env.PUBLIC_PUSHER_SECRET)
    }
  }
});
