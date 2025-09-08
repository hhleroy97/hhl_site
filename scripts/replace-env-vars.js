import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
const envFile = path.join(__dirname, '..', '.env')
const env = {}

if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf8')
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
      env[key.trim()] = value.trim()
    }
  })
}

// Replace environment variables in built HTML file
const distIndexPath = path.join(__dirname, '..', 'dist', 'index.html')

if (fs.existsSync(distIndexPath)) {
  let htmlContent = fs.readFileSync(distIndexPath, 'utf8')

  // Replace GA tracking ID
  const gaTrackingId =
    process.env.VITE_GA_TRACKING_ID || env.VITE_GA_TRACKING_ID || ''
  htmlContent = htmlContent.replace(/%VITE_GA_TRACKING_ID%/g, gaTrackingId)

  fs.writeFileSync(distIndexPath, htmlContent)

  if (gaTrackingId) {
    console.log(
      `✅ Google Analytics tracking ID (${gaTrackingId}) injected into built files`
    )
  } else {
    console.log(
      '⚠️  No Google Analytics tracking ID found. Set VITE_GA_TRACKING_ID in your .env file'
    )
  }
} else {
  console.log('❌ dist/index.html not found. Make sure to run build first.')
}
