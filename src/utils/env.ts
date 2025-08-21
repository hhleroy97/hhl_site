export const env = {
  NODE_ENV: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  site: {
    url: import.meta.env.VITE_SITE_URL || 'http://localhost:3000',
    name: import.meta.env.VITE_SITE_NAME || 'Hartley H. Leroy',
    description:
      import.meta.env.VITE_SITE_DESCRIPTION ||
      'Engineer • Builder • Creative Technologist',
  },

  contact: {
    formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT,
    formApiKey: import.meta.env.VITE_CONTACT_FORM_API_KEY,
  },

  analytics: {
    gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID,
    hotjarId: import.meta.env.VITE_HOTJAR_ID,
  },

  social: {
    github:
      import.meta.env.VITE_GITHUB_URL || 'https://github.com/hartleyhleroy',
    linkedin:
      import.meta.env.VITE_LINKEDIN_URL ||
      'https://linkedin.com/in/hartleyhleroy',
    twitter: import.meta.env.VITE_TWITTER_URL,
    email: import.meta.env.VITE_EMAIL || 'contact@hartleyleroy.dev',
  },

  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
    redirectUri:
      import.meta.env.VITE_GITHUB_REDIRECT_URI ||
      `${import.meta.env.VITE_SITE_URL || 'http://localhost:3000'}/auth/github/callback`,
  },

  features: {
    animations: import.meta.env.VITE_ENABLE_ANIMATIONS === 'true',
    cyberpunkMode: import.meta.env.VITE_ENABLE_CYBERPUNK_MODE === 'true',
    contactForm: import.meta.env.VITE_ENABLE_CONTACT_FORM === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    githubAuth: import.meta.env.VITE_ENABLE_GITHUB_AUTH === 'true',
  },
} as const
