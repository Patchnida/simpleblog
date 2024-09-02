import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcMEbhCYjB_jL0mD8M-uSuCrMzYAJkXpU",
  authDomain: "simpleblog-d4e46.firebaseapp.com",
  projectId: "simpleblog-d4e46",
  storageBucket: "simpleblog-d4e46.appspot.com",
  messagingSenderId: "851848197364",
  appId: "1:851848197364:web:2ac6285da9cdc6bf115aa1"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};