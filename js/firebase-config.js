// Firebase Configuration for LDAH Website
// Note: These credentials are safe to expose in client-side code
// Firebase security is enforced through Firestore security rules

const firebaseConfig = {
  apiKey: "AIzaSyAU3CQ07bCVKlJIqGak-i50kaJEyPKldLk",
  authDomain: "ldah-932d5.firebaseapp.com",
  projectId: "ldah-932d5",
  storageBucket: "ldah-932d5.firebasestorage.app",
  messagingSenderId: "662130454003",
  appId: "1:662130454003:web:437576d5a5811ecd8df686",
  measurementId: "G-32PRRS0W85"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Collection references
const collections = {
  content: db.collection('website_content'),
  events: db.collection('events'),
  services: db.collection('services'),
  stats: db.collection('stats'),
  team: db.collection('team'),
  testimonials: db.collection('testimonials'),
  settings: db.collection('settings')
};

// Content fetching functions
async function getHeroContent() {
  try {
    const doc = await collections.content.doc('hero').get();
    if (doc.exists) return doc.data();
    
    return {
      title: "Empowering Families, Transforming Lives",
      subtitle: "Supporting children and youth with disabilities across Hawai'i and the Pacific Islands through advocacy, education, and community partnerships.",
      image: "https://www.ldahawaii.org/wp-content/uploads/2023/10/Leadership-in-Disabilities-Achievement-of-Hawaii-5.jpg"
    };
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
}

async function getServicesContent() {
  try {
    const doc = await collections.content.doc('services').get();
    if (doc.exists) return doc.data();
    
    return {
      title: "Comprehensive Support Services",
      description: "We provide a wide range of services designed to empower families and support children with disabilities throughout their educational journey.",
      items: []
    };
  } catch (error) {
    console.error('Error fetching services content:', error);
    return null;
  }
}

async function getStats() {
  try {
    const snapshot = await collections.stats.orderBy('order').get();
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}

async function getEvents(limit = 6) {
  try {
    const snapshot = await collections.events
      .orderBy('date', 'asc')
      .limit(limit)
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

async function getCTAContent() {
  try {
    const doc = await collections.content.doc('cta').get();
    if (doc.exists) return doc.data();
    
    return {
      title: "Ready to Make a Difference?",
      description: "Join our community of volunteers, supporters, and advocates working to create opportunities for children with disabilities."
    };
  } catch (error) {
    console.error('Error fetching CTA content:', error);
    return null;
  }
}

// Content update functions (for CMS)
async function updateContent(section, field, value) {
  try {
    await collections.content.doc(section).update({
      [field]: value,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating content:', error);
    return { success: false, error: error.message };
  }
}

async function updateStat(statId, data) {
  try {
    await collections.stats.doc(statId).update({
      ...data,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating stat:', error);
    return { success: false, error: error.message };
  }
}

// Image upload function
async function uploadImage(file, path) {
  try {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`${path}/${Date.now()}_${file.name}`);
    const snapshot = await imageRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();
    return { success: true, url: downloadURL };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error.message };
  }
}

// Initialize default content (run once)
async function initializeContent() {
  try {
    const heroDoc = await collections.content.doc('hero').get();
    if (!heroDoc.exists) {
      console.log('Run initialization from CMS panel');
    }
  } catch (error) {
    console.error('Error checking content:', error);
  }
}
