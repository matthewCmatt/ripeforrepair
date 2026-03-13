// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    prefetch: true,
    site: "https://ripe4repair.org",
    integrations: [svelte(), sitemap()],
    image: {
        domains: ["admin.ripe4repair.org"],
    },
    experimental: {
        rustCompiler: true,
        queuedRendering: {
            enabled: true,
        },
    },
});
