/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_SITE_NAME: string
  readonly VITE_SITE_DESCRIPTION: string
  readonly VITE_CONTACT_FORM_ENDPOINT: string
  readonly VITE_CONTACT_FORM_API_KEY: string
  readonly VITE_GA_TRACKING_ID: string
  readonly VITE_HOTJAR_ID: string
  readonly VITE_GITHUB_URL: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_TWITTER_URL: string
  readonly VITE_EMAIL: string
  readonly VITE_ENABLE_ANIMATIONS: string
  readonly VITE_ENABLE_CYBERPUNK_MODE: string
  readonly VITE_ENABLE_CONTACT_FORM: string
  readonly VITE_ENABLE_ANALYTICS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
