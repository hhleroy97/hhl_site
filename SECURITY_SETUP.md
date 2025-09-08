# Security Setup Guide

## CRITICAL: Immediate Actions Required

Your repository previously had exposed secrets. Follow this guide to properly secure your application.

## Required GitHub Repository Secrets

Navigate to **Settings → Secrets and variables → Actions** in your GitHub repository and add these secrets:

### EmailJS Configuration

```
VITE_EMAILJS_SERVICE_ID=your_new_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_new_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_new_public_key_here
```

### Analytics (Optional)

```
VITE_GA_TRACKING_ID=your_new_ga_tracking_id_here
VITE_HOTJAR_ID=your_hotjar_id_here
```

### GitHub OAuth (If Using)

```
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Steps to Secure Your Application

### 1. Rotate All Exposed Credentials (CRITICAL)

#### EmailJS Credentials

1. Go to [EmailJS Dashboard](https://www.emailjs.com/)
2. Create a new service (delete the old one)
3. Create a new email template (delete the old one)
4. Generate a new public key
5. Add the new credentials to GitHub Secrets

#### Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get the new Measurement ID (G-XXXXXXXXXX format)
4. Add to GitHub Secrets as `VITE_GA_TRACKING_ID`

#### GitHub OAuth (If applicable)

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth application or regenerate secrets for existing one
3. Add credentials to GitHub Secrets

### 2. Force Push Cleaned History

**WARNING**: This will rewrite git history and require force push.

```bash
# The history has already been cleaned locally
# Force push to update remote repository
git push --force-with-lease origin --all
git push --force-with-lease origin --tags
```

### 3. Verify Security

1. Check that `.env` is no longer in repository history
2. Verify all secrets are set up in GitHub repository settings
3. Test that the application works with new credentials
4. Confirm no sensitive data appears in build artifacts

## Local Development Setup

### Create .env.local for Development

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your development credentials
# This file is already in .gitignore and won't be committed
```

### Environment Files Priority

1. `.env.local` - Local development (highest priority, gitignored)
2. `.env.example` - Template file (safe to commit)
3. GitHub Secrets - Production deployment

## Pre-commit Security Hooks

The repository includes pre-commit hooks that will:

- Check for accidentally committed secrets
- Scan for sensitive patterns
- Prevent commits with potential security issues

## Emergency Procedures

### If Secrets Are Accidentally Committed Again

1. Immediately rotate all exposed credentials
2. Remove secrets from git history using `git filter-repo`
3. Force push cleaned history
4. Update GitHub Secrets with new credentials
5. Notify team members of the incident

### Secret Rotation Schedule

- EmailJS credentials: Every 90 days
- Analytics tokens: Every 180 days
- OAuth credentials: Every 90 days or when team members leave

## Security Monitoring

Enable these GitHub security features:

1. **Secret scanning** - Automatically detect secrets in commits
2. **Dependency alerts** - Monitor for vulnerable dependencies
3. **Code scanning** - Static analysis for security issues

## Contact

For security incidents or questions, contact: security@hartleyleroy.dev
