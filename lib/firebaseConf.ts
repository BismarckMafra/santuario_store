import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

/**
 * Configuração do Firebase
 * As variáveis de ambiente devem ser definidas no arquivo .env.local
 * Em React Native com Expo, não use NEXT_PUBLIC_ prefix
 */

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCt_iNL2sRC2VK9EE49bkVwq5lcJ76wtaI",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "manejamentoprodpessoa.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "manejamentoprodpessoa",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "manejamentoprodpessoa.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "421931382368",
  appId: process.env.FIREBASE_APP_ID || "1:421931382368:web:829e5eabbcfaa454c0f505",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

console.log('🔧 Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('✅ Firebase inicializado com sucesso!');

export { db, app };