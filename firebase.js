import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCnXfnbDRM3xzhzLW9D7yfQ81Be3RHLNdI",
  authDomain: "dbfyp-27eb4.firebaseapp.com",
  databaseURL: "https://dbfyp-27eb4-default-rtdb.firebaseio.com",
  projectId: "dbfyp-27eb4",
  storageBucket: "dbfyp-27eb4.firebasestorage.app",
  messagingSenderId: "107812965407",
  appId: "1:107812965407:web:bf72b18b4ff31b6394992a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
