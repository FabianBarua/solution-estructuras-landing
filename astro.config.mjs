import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [db(), tailwind(
    {
      applyBaseStyles: false,
    }
  ), react()],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  },
  
});