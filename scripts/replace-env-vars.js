import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local for local development (if exists)
const envFile = path.join(__dirname, '..', '.env.local')
const env = {}

if (fs.existsSync(envFile)) {
  console.log('📋 Loading local environment variables from .env.local')
  const envContent = fs.readFileSync(envFile, 'utf8')
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
      env[key.trim()] = value.trim()
    }
  })
} else {
  console.log(
    '📋 No .env.local found, using environment variables from process/GitHub Secrets'
  )
}

// Replace environment variables in built HTML file
const distIndexPath = path.join(__dirname, '..', 'dist', 'index.html')

if (fs.existsSync(distIndexPath)) {
  let htmlContent = fs.readFileSync(distIndexPath, 'utf8')

  // Define all environment variables that might need replacement
  const envVars = {
    VITE_GA_TRACKING_ID:
      process.env.VITE_GA_TRACKING_ID || env.VITE_GA_TRACKING_ID || '',
    VITE_HOTJAR_ID: process.env.VITE_HOTJAR_ID || env.VITE_HOTJAR_ID || '',
    VITE_SITE_URL: process.env.VITE_SITE_URL || env.VITE_SITE_URL || '',
  }

  // Replace all placeholders in the HTML content
  Object.entries(envVars).forEach(([key, value]) => {
    const placeholder = `%${key}%`
    if (htmlContent.includes(placeholder)) {
      htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value)
      if (value) {
        console.log(`✅ ${key} injected into built files`)
      } else {
        console.log(`⚠️  ${key} is empty or not set`)
      }
    }
  })

  fs.writeFileSync(distIndexPath, htmlContent)

  // Summary
  const replacedCount = Object.values(envVars).filter(v => v).length
  console.log(
    `📦 Environment variable replacement completed. ${replacedCount} variables injected.`
  )
} else {
  console.log('❌ dist/index.html not found. Make sure to run build first.')
}
