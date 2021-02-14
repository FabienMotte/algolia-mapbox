import path from 'path'
import express from 'express'
import shrinkRay from 'shrink-ray-current'
import helmet from 'helmet'

const port = process.env.PORT || 5000
const distPath = path.join('dist')

const app = express()

app.use(shrinkRay())
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': [
          "'self'",
          'https://*.algolia.net',
          'https://*.mapbox.com',
        ],
        'img-src': ["'self'", 'data:', 'https://*.unsplash.com'],
        'worker-src': ['blob:'],
      },
    },
  }),
)
app.set('port', port)
app.use(express.static(distPath))
app.get('*', (req, res) =>
  res.sendFile(path.join(process.cwd(), distPath, 'index.html')),
)
app.listen(app.get('port'), () =>
  console.log(`Serving '${distPath}' on port ${port}`),
)
