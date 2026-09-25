import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'currentdrew-directory-index',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/CurrentDrew' || req.url === '/CurrentDrew/') {
            req.url = '/CurrentDrew/index.html'
          }
          next()
        })
      },
    },
  ],
})
