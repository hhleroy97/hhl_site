# EmailJS Setup Instructions

This project uses EmailJS to handle contact form submissions. Follow these steps to set up email functionality:

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID** (e.g., `service_abc123`)

## 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Set up your template with the following variables:

   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}

   New contact form submission:

   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   Service Interest: {{service}}

   Message:
   {{message}}
   ```

4. Save the template and note the **Template ID** (e.g., `template_xyz789`)

## 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abc123def456`)

## 5. Update Environment Variables

### For Local Development

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Update your `.env.local` file with your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

### For Production Deployment

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Add these repository secrets:
   - `VITE_EMAILJS_SERVICE_ID`: Your service ID
   - `VITE_EMAILJS_TEMPLATE_ID`: Your template ID
   - `VITE_EMAILJS_PUBLIC_KEY`: Your public key

## 6. Test the Contact Form

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the message

## Email Template Variables

The contact form sends these variables to your EmailJS template:

- `from_name`: User's name
- `from_email`: User's email address
- `subject`: Message subject
- `service`: Selected service (mapped from service ID to name)
- `message`: User's message
- `to_email`: Your email address (hartley.leroy1997@gmail.com)

## Troubleshooting

- **Missing environment variables**: Check that your `.env` file has all three EmailJS variables
- **Template not found**: Ensure your template ID matches exactly
- **Service not found**: Verify your service ID is correct
- **Rate limiting**: EmailJS free plan has sending limits
- **Email not received**: Check spam folder and verify template setup

## Security Notes

- **NEVER** commit `.env` or `.env.local` files to version control
- Use GitHub Repository Secrets for production credentials
- Keep your EmailJS credentials secure and rotate them regularly
- Consider setting up email allowlists in EmailJS dashboard for production
- The `.env.local` file is automatically ignored by git and safe for local development
- Only use the `.env.example` file as a template (safe to commit)
