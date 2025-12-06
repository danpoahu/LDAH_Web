# LDAH Website - Leadership in Disabilities & Achievement of Hawai'i

A modern, dynamic website with full CMS capabilities for managing content, events, and services.

## 🌟 Features

### For Visitors
- **Modern, Responsive Design** - Beautiful UI that works perfectly on all devices
- **Dynamic Content** - Real-time updates from Firebase
- **Event Calendar** - Browse upcoming workshops and training sessions
- **Service Information** - Comprehensive details about LDAH programs
- **Volunteer Portal** - Easy registration and management
- **Contact Information** - Multiple office locations with directions

### For Administrators
- **Complete CMS** - Edit all website content without touching code
- **Image Management** - Upload and manage images with Firebase Storage
- **Event Management** - Syncs with mobile app admin panel
- **Stats Dashboard** - Update statistics and metrics
- **Service Editor** - Add, edit, and remove service offerings
- **Real-time Updates** - Changes go live immediately

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks needed)
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Hosting**: Can be deployed to Firebase Hosting, GitHub Pages, or any static host
- **CMS**: Custom-built admin panel integrated with Firebase

### Firebase Collections Structure

```
website_content/
├── hero/          # Hero section content
├── services/      # Services section with items
├── cta/          # Call-to-action section
└── settings/     # General settings

events/           # Event listings (synced with mobile app)
├── id/
│   ├── title
│   ├── description
│   ├── date
│   ├── location
│   ├── imageUrl
│   └── status

stats/            # Website statistics
├── id/
│   ├── icon
│   ├── number
│   ├── label
│   └── order

users/            # Admin users
├── uid/
│   ├── email
│   ├── role
│   └── permissions
```

## 🚀 Setup Instructions

### 1. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)

2. Enable the following services:
   - **Firestore Database**
   - **Authentication** (Email/Password)
   - **Storage**

3. Get your Firebase config from Project Settings and update `js/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 2. Create Admin User

1. Go to Firebase Console → Authentication
2. Add a new user with email/password
3. Note the User UID
4. In Firestore, create a document:
   - Collection: `users`
   - Document ID: [User UID]
   - Fields:
     ```
     email: "admin@ldahawaii.org"
     role: "admin"
     ```

### 3. Initialize Content

Open your browser console when first loading the site and run:
```javascript
initializeContent();
```

This will populate Firestore with default content structure.

### 4. Deploy

#### Option A: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

#### Option B: GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select branch and folder

#### Option C: Any Static Host
Simply upload all files to your web server.

## 📁 File Structure

```
ldah-website/
├── index.html              # Main homepage
├── cms.html               # Admin CMS panel
├── events.html            # Events page
├── volunteer.html         # Volunteer page
├── contact.html           # Contact page
├── install.html           # PWA installation guide
├── assets/
│   ├── logo_transparent.png
│   ├── icon-192.png
│   └── icon-512.png
└── js/
    ├── firebase-config.js  # Firebase configuration
    ├── app.js             # Main application logic
    └── cms.js             # CMS admin logic
```

## 🎨 Customization

### Colors
Edit CSS variables in `index.html`:
```css
:root {
  --primary-blue: #004E7C;
  --light-blue: #0066a1;
  --accent-teal: #4DD0E1;
  --warm-sand: #D4B896;
}
```

### Content
1. Log into CMS at `/cms.html`
2. Navigate through tabs to edit:
   - Hero Section
   - Statistics
   - Services
   - Call to Action
3. Click "Save Changes" to publish

### Adding New Sections
1. Add HTML structure in `index.html`
2. Create Firestore collection for data
3. Add loading function in `js/app.js`
4. Add edit interface in `cms.html`
5. Add save function in `js/cms.js`

## 🔐 Security Rules

Set these Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access
    match /{document=**} {
      allow read: if true;
    }
    
    // Admin-only write access
    match /website_content/{document} {
      allow write: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /stats/{document} {
      allow write: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /services/{document} {
      allow write: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /events/{document} {
      allow write: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

Storage rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /website/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📊 Analytics

Google Analytics is pre-configured. Update the tracking ID in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
```

## 🔄 Integration with Mobile App

The website shares the Firebase backend with the LDAH mobile app:
- **Events**: Managed through mobile app admin panel, automatically displayed on website
- **User Data**: Admin authentication shared across platforms
- **Analytics**: Unified tracking across web and mobile

## 🆘 Support

### Common Issues

**CMS won't load**
- Verify Firebase config is correct
- Check that user has admin role in Firestore
- Clear browser cache

**Images not uploading**
- Check Firebase Storage rules
- Verify file size (max 10MB recommended)
- Ensure proper authentication

**Content not updating**
- Check browser console for errors
- Verify Firestore rules allow writes
- Try hard refresh (Ctrl+F5)

### Contact
- **Developer**: DP Consulting
- **Email**: dan@dpconsulting.com
- **GitHub**: [github.com/danpoahu](https://github.com/danpoahu)

## 📝 License

© 2025 Leadership in Disabilities and Achievement of Hawai'i. All rights reserved.

Developed with ❤️ by DP Consulting

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Modern homepage design
- ✅ Full CMS system
- ✅ Event integration
- ✅ Service management

### Phase 2 (Upcoming)
- [ ] Blog/news system
- [ ] Resource library with PDF uploads
- [ ] Team member profiles
- [ ] Testimonials section
- [ ] Newsletter signup
- [ ] Donation integration

### Phase 3 (Future)
- [ ] Multi-language support
- [ ] Advanced search
- [ ] Member portal
- [ ] Training video library
- [ ] Interactive calendar with RSVP
- [ ] Chat support widget

## 🙏 Acknowledgments

- LDAH team for their amazing work with families
- Firebase for the robust backend platform
- The open-source community for inspiration and resources

---

**Made with ❤️ in Hawaii**
