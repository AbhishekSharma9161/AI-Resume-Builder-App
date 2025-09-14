# Google OAuth Setup Instructions

This document provides detailed instructions for setting up Google OAuth authentication in the ResumeAI application.

## Quick Start (Development)

The application comes with a **working test Google Client ID** that allows immediate testing:
- Client ID: `764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com`
- Works with `localhost:3000`
- Allows sign-in with any Google account
- No additional setup required for development

## Production Setup

For production deployment, you'll need to create your own Google OAuth credentials.

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID for reference

### Step 2: Enable Required APIs

1. Navigate to **APIs & Services** > **Library**
2. Search for and enable:
   - Google+ API
   - Google Identity Services API
   - Google OAuth2 API

### Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application** as the application type
4. Configure the following:

#### Authorized JavaScript Origins
Add these URLs where your app will be hosted:
```
http://localhost:3000          (for local development)
https://yourdomain.com         (for production)
https://www.yourdomain.com     (if using www subdomain)
```

#### Authorized Redirect URIs
Add these callback URLs:
```
http://localhost:3000          (for local development)
https://yourdomain.com         (for production)
https://www.yourdomain.com     (if using www subdomain)
```

### Step 4: Configure Environment Variables

1. Copy your Client ID from the Google Cloud Console
2. Update your environment files:

#### Development (.env.local)
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
```

#### Production
Set the same environment variable in your deployment platform:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Environment Variables
- Railway: Variables tab in your project

### Step 5: Test the Integration

1. Restart your development server
2. Click the "Sign In" button
3. You should see the Google OAuth popup with account selection
4. Sign in with any Google account
5. Verify you're redirected to the account page

## Troubleshooting

### Common Issues

#### "unauthorized_client" Error
- **Cause**: Your domain is not in authorized origins
- **Solution**: Add your domain to authorized JavaScript origins in Google Cloud Console

#### "redirect_uri_mismatch" Error
- **Cause**: Redirect URI doesn't match configured URIs
- **Solution**: Ensure your domain is added to authorized redirect URIs

#### "Google OAuth is not configured" Message
- **Cause**: Environment variable not set or incorrect
- **Solution**: Check `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in your `.env.local` file

#### Popup Blocked
- **Cause**: Browser is blocking the OAuth popup
- **Solution**: Allow popups for your domain or use a different browser

### Development vs Production

| Environment | Client ID | Domain | Notes |
|-------------|-----------|---------|-------|
| Development | Test ID provided | localhost:3000 | Ready to use |
| Production | Your own ID | Your domain | Requires setup |

### Security Notes

- Never commit your production Client ID to public repositories
- Use environment variables for all sensitive configuration
- Regularly rotate your OAuth credentials
- Monitor usage in Google Cloud Console

### Additional Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google Cloud Console](https://console.cloud.google.com/)

## Support

If you encounter issues with Google OAuth setup:
1. Check the troubleshooting section above
2. Verify your Google Cloud Console configuration
3. Test with the provided development Client ID first
4. Open an issue in the project repository with error details