import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import tailwindcss from '@tailwindcss/vite'
import { getPlatformProxy } from 'wrangler'

export default defineConfig(async () => {
  const { env, dispose } = await getPlatformProxy({
    configPath: './wrangler.toml',
  })

  return {
    plugins: [
      pages(),
      devServer({
        entry: 'src/index.tsx',
        env,
      }),
      tailwindcss(),
      {
        name: 'dispose-proxy',
        closeBundle: dispose,
      },
    ],
  }
})
