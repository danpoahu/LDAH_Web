# LDAH Website - Quick Setup Guide

## 🚀 Get Started in 15 Minutes

### Step 1: Firebase Project Setup (5 minutes)

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add Project"
   - Name it "LDAH-Website"
   - Disable Google Analytics (optional)
   - Click "Create Project"

2. **Enable Required Services**
   - In Firebase Console, go to:
     - **Build → Firestore Database** → Create Database → Start in production mode
     - **Build → Authentication** → Get Started → Email/Password → Enable
     - **Build → Storage** → Get Started → Start in production mode

3. **Get Your Config**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps" → Click web icon (</>)
   - Register app as "LDAH Website"
   - Copy the firebaseConfig object

### Step 2: Configure Website (3 minutes)

1. **Update Firebase Config**
   - Open `js/firebase-config.js`
   - Replace the config object with your values:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

2. **Deploy Security Rules**
   ```bash
   # If using Firebase CLI
   firebase deploy --only firestore:rules
   firebase deploy --only storage
   
   # Or manually in Firebase Console:
   # - Firestore → Rules → Copy from firestore.rules file
   # - Storage → Rules → Copy from storage.rules file
   ```

### Step 3: Create Admin User (2 minutes)

1. **Add User in Authentication**
   - Firebase Console → Authentication → Users
   - Click "Add User"
   - Email: `admin@ldahawaii.org` (or your email)
   - Password: Create a strong password
   - Click "Add User"
   - **Copy the User UID** (important!)

2. **Set Admin Role in Firestore**
   - Firebase Console → Firestore Database
   - Click "Start Collection"
   - Collection ID: `users`
   - Document ID: [Paste the User UID you copied]
   - Fields:
     ```
     email (string): "admin@ldahawaii.org"
     role (string): "admin"
     ```
   - Click "Save"

### Step 4: Initialize Content (2 minutes)

1. **Open Website Locally**
   - Open `index.html` in your browser
   - Open Browser Console (F12)
   - Run this command:
   ```javascript
   initializeContent();
   ```
   - You should see "Default content initialized successfully!"

2. **Verify Content**
   - Check Firestore Database - you should see:
     - `website_content` collection with documents
     - `stats` collection with entries

### Step 5: Deploy Website (3 minutes)

#### Option A: Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init hosting
# Select: Use existing project
# Choose: LDAH-Website
# Public directory: . (current directory)
# Single-page app: No
# Automatic builds: No

# Deploy
firebase deploy --only hosting
```

Your site will be live at: `https://YOUR_PROJECT_ID.web.app`

#### Option B: GitHub Pages
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ldah-website.git
git push -u origin main

# Enable GitHub Pages
# Go to repository → Settings → Pages
# Source: main branch / root folder
# Save
```

Your site will be live at: `https://YOUR_USERNAME.github.io/ldah-website`

## ✅ Verify Everything Works

### Test Public Site
1. Visit your deployed URL
2. You should see:
   - Beautiful hero section
   - Statistics cards
   - Services grid
   - Events section (may be empty initially)

### Test Admin CMS
1. Go to `your-url.com/cms.html`
2. Login with your admin credentials
3. Try editing the hero title and saving
4. Refresh the homepage - changes should appear

### Test Image Upload
1. In CMS, go to Hero Section
2. Click "Choose Image"
3. Select an image
4. Click "Save Changes"
5. Check homepage - image should update

## 🎨 Customize Your Site

### Update Colors
Edit `index.html` CSS variables:
```css
:root {
  --primary-blue: #004E7C;    /* Main brand color */
  --light-blue: #0066a1;      /* Secondary color */
  --accent-teal: #4DD0E1;     /* Accent/highlights */
}
```

### Update Content
1. Login to CMS (`/cms.html`)
2. Edit sections:
   - **Hero**: Main landing message
   - **Stats**: Key numbers/metrics
   - **Services**: What you offer
   - **CTA**: Call to action message

### Add Events
Events are managed through your mobile app admin panel. They automatically sync to the website!

## 🆘 Troubleshooting

### "Permission denied" errors
- Check Firestore rules are deployed
- Verify user has "admin" role in Firestore
- Make sure you're logged in

### CMS won't load
- Verify Firebase config is correct
- Check browser console for errors
- Clear cache and try again

### Images not uploading
- Check Storage rules are deployed
- Verify file size < 10MB
- Check browser console for errors

### Content not updating
- Hard refresh page (Ctrl+F5)
- Check Firestore to see if data saved
- Verify you're logged in as admin

## 📞 Need Help?

Contact DP Consulting:
- Email: dan@dpconsulting.com
- Include: screenshots, error messages, what you tried

## 🎉 You're Done!

Your LDAH website is now live with:
- ✅ Modern, responsive design
- ✅ Full CMS for content management
- ✅ Event integration with mobile app
- ✅ Admin panel for easy updates
- ✅ Professional hosting

**Next Steps:**
1. Add your actual content through CMS
2. Upload real images
3. Update contact information
4. Share with team for feedback
5. Promote your new website!

---

Made with ❤️ by DP Consulting for LDAH
