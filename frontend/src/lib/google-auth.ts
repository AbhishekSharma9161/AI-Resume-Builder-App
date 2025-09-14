// Google OAuth configuration - Using working test client ID
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com";

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

declare global {
  interface Window {
    google: any;
    googleSignInCallback: (response: any) => void;
  }
}

// Initialize Google OAuth
export const initializeGoogleAuth = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not defined'));
      return;
    }

    // Check if script is already loaded
    if (window.google) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Wait a bit for the Google API to be fully loaded
      setTimeout(() => {
        if (window.google) {
          resolve();
        } else {
          reject(new Error('Google API failed to load'));
        }
      }, 100);
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google API script'));
    };

    document.head.appendChild(script);
  });
};

// Handle Google Sign-In with real Google OAuth
export const handleGoogleSignIn = (): Promise<GoogleUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if we have a valid client ID
      if (!GOOGLE_CLIENT_ID) {
        reject(new Error('Google Client ID not available'));
        return;
      }

      // Ensure Google API is loaded
      await initializeGoogleAuth();

      if (!window.google) {
        reject(new Error('Google API not available'));
        return;
      }

      // Real Google OAuth implementation
      window.googleSignInCallback = (response: any) => {
        try {
          // Decode the JWT token to get user info
          const payload = JSON.parse(atob(response.credential.split('.')[1]));
          const user: GoogleUser = {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            given_name: payload.given_name,
            family_name: payload.family_name,
          };
          resolve(user);
        } catch (error) {
          reject(error);
        }
      };

      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: window.googleSignInCallback,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Try to show the One Tap prompt first
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If One Tap is not available, use the popup flow
          if (window.google.accounts.oauth2) {
            const tokenClient = window.google.accounts.oauth2.initTokenClient({
              client_id: GOOGLE_CLIENT_ID,
              scope: 'openid email profile',
              callback: (response: any) => {
                if (response.access_token) {
                  // Fetch user info using the access token
                  fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`)
                    .then(res => res.json())
                    .then(userInfo => {
                      const user: GoogleUser = {
                        id: userInfo.id,
                        email: userInfo.email,
                        name: userInfo.name,
                        picture: userInfo.picture,
                        given_name: userInfo.given_name,
                        family_name: userInfo.family_name,
                      };
                      resolve(user);
                    })
                    .catch(reject);
                } else {
                  reject(new Error('Failed to get access token'));
                }
              },
            });
            tokenClient.requestAccessToken();
          } else {
            reject(new Error('Google OAuth2 not available'));
          }
        }
      });

    } catch (error) {
      reject(error);
    }
  });
};

// Sign out from Google
export const signOutGoogle = () => {
  if (typeof window !== 'undefined' && window.google) {
    window.google.accounts.id.disableAutoSelect();
    // Also revoke the token if available
    if (window.google.accounts.oauth2) {
      window.google.accounts.oauth2.revoke();
    }
  }
};