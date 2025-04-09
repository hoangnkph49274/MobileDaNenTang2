// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxle5KGRAe76FdJ_-5-wGLkIWhj9r_2yo",
  authDomain: "cro102-5e3e9.firebaseapp.com",
  projectId: "cro102-5e3e9",
  storageBucket: "cro102-5e3e9.appspot.com",
  messagingSenderId: "265636842993",
  appId: "1:265636842993:web:0233e9e8008806d5f68850",
  measurementId: "G-2NJ6YH7FJP",
};

// ✅ Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// ✅ Khởi tạo các dịch vụ Firebase
const auth = getAuth(app);        // Authentication (không cần AsyncStorage)
const db = getFirestore(app);     // Firestore Database
const storage = getStorage(app);  // Firebase Storage

// ✅ Xuất để dùng trong toàn app
export { app, auth, db, storage };
