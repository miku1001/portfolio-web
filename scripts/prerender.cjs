const fs = require('fs')
const path = require('path')
const Prerenderer = require('@prerenderer/prerenderer')
const JSDOMRenderer = require('@prerenderer/renderer-jsdom')

const outputDir = path.join(process.cwd(), 'dist')
const routes = ['/']

async function run() {
  const prerenderer = new Prerenderer({
    staticDir: outputDir,
    routes,
    renderer: new JSDOMRenderer(),
  })

  try {
    await prerenderer.initialize()
    const renderedRoutes = await prerenderer.renderRoutes(routes)

    renderedRoutes.forEach(route => {
      const routePath = route.route === '/' ? '' : route.route
      const outputPath = path.join(outputDir, routePath, 'index.html')
      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      fs.writeFileSync(outputPath, route.html.trim(), 'utf-8')
    })
  } finally {
    await prerenderer.destroy()
  }
}

run().catch(err => {
  console.error('[prerender] Failed:', err)
  process.exit(1)
})
