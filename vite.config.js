import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const contentFile = path.join(projectRoot, 'src', 'data', 'portfolioContent.json')
const imagesDirectory = path.join(projectRoot, 'public', 'images')

function sendJson(response, statusCode, data) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(data))
}

function readJsonRequest(request, maxBytes = 12 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let totalBytes = 0
    let tooLarge = false

    request.on('data', (chunk) => {
      totalBytes += chunk.length
      if (totalBytes > maxBytes) {
        tooLarge = true
        return
      }
      chunks.push(chunk)
    })

    request.on('end', () => {
      if (tooLarge) {
        reject(new Error('The upload is too large.'))
        return
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch {
        reject(new Error('The request body must be valid JSON.'))
      }
    })

    request.on('error', reject)
  })
}

function isLocalSameOrigin(request) {
  const origin = request.headers.origin
  const host = request.headers.host
  const clientAddress = request.socket?.remoteAddress
  const isLoopback = ['::1', '127.0.0.1', '::ffff:127.0.0.1'].includes(clientAddress)
  if (!isLoopback) return false
  if (!origin || !host) return false

  try {
    const parsedOrigin = new URL(origin)
    return parsedOrigin.protocol === 'http:' && parsedOrigin.host === host
  } catch {
    return false
  }
}

function localPortfolioEditorPlugin() {
  return {
    name: 'local-portfolio-editor',
    configureServer(server) {
      server.middlewares.use('/__portfolio-content', async (request, response, next) => {
        if (request.url !== '/') return next()

        try {
          if (request.method === 'GET') {
            const content = await readFile(contentFile, 'utf8')
            response.statusCode = 200
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.setHeader('Cache-Control', 'no-store')
            response.end(content)
            return
          }

          if (request.method !== 'PUT') return next()
          if (!isLocalSameOrigin(request)) {
            sendJson(response, 403, { error: 'Only the local site can save portfolio content.' })
            return
          }

          const content = await readJsonRequest(request, 1024 * 1024)
          if (
            !content ||
            !Array.isArray(content.skills) ||
            !Array.isArray(content.projects?.items) ||
            !Array.isArray(content.awards?.items) ||
            !Array.isArray(content.awards?.photos)
          ) {
            sendJson(response, 400, { error: 'The content is missing a required list.' })
            return
          }

          await writeFile(contentFile, `${JSON.stringify(content, null, 2)}\n`, 'utf8')
          sendJson(response, 200, { saved: true })
        } catch (error) {
          sendJson(response, 400, { error: error.message })
        }
      })

      server.middlewares.use('/__portfolio-image', async (request, response, next) => {
        if (request.url !== '/') return next()
        if (request.method !== 'POST') return next()
        if (!isLocalSameOrigin(request)) {
          sendJson(response, 403, { error: 'Only the local site can upload portfolio images.' })
          return
        }

        try {
          const { fileName, dataUrl } = await readJsonRequest(request)
          const match = /^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || '')
          if (!match) {
            sendJson(response, 400, { error: 'Choose a JPG, PNG, WebP, or GIF image.' })
            return
          }

          const mimeType = match[1]
          const imageBytes = Buffer.from(match[2], 'base64')
          if (imageBytes.length > 8 * 1024 * 1024) {
            sendJson(response, 400, { error: 'Images must be 8 MB or smaller.' })
            return
          }

          const extensionByMime = {
            'image/jpeg': '.jpg',
            'image/png': '.png',
            'image/webp': '.webp',
            'image/gif': '.gif',
          }
          const baseName = path.parse(String(fileName || 'image')).name
            .toLowerCase()
            .replace(/[^a-z0-9-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 48) || 'image'
          const randomSuffix = Math.random().toString(36).slice(2, 8)
          const savedName = `${Date.now()}-${randomSuffix}-${baseName}${extensionByMime[mimeType]}`

          await mkdir(imagesDirectory, { recursive: true })
          await writeFile(path.join(imagesDirectory, savedName), imageBytes, { flag: 'wx' })
          sendJson(response, 200, { path: `/images/${savedName}` })
        } catch (error) {
          sendJson(response, 400, { error: error.message })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [localPortfolioEditorPlugin(), react(), tailwindcss()],
})
