import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: 'AIzaSyCdBvaK1iMzR7--ApnKdo1PkV4EuGer6Jo',
  authDomain: 'todo-list-e3d58.firebaseapp.com',
  databaseURL:
    'https://todo-list-e3d58-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-list-e3d58',
  storageBucket: 'todo-list-e3d58.firebasestorage.app',
  messagingSenderId: '23017718687',
  appId: '1:23017718687:web:0d99d24719e457d723f3aa',
  databaseURL:
    'https://todo-list-e3d58-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
