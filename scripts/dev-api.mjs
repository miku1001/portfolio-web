import { createServer } from 'http'
import handler from '../api/chat.js'

const server = createServer((req, res) => {
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      handler(req, { 
        status: (code) => ({ json: (data) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)) } }),
        json: (code, data) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)) },
      })
    })
  } else {
    res.writeHead(404); res.end('Not found')
  }
})

server.listen(3001, () => console.log('API server running on http://localhost:3001'))