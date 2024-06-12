import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDTrWm53iVXHtRzYi0CoB0_cne3aD1QI9w",
    authDomain: "logofoods-d0abd.firebaseapp.com",
    projectId: "logofoods-d0abd",
    storageBucket: "logofoods-d0abd.appspot.com",
    messagingSenderId: "991295215914",
    appId: "1:991295215914:web:8058538f8f8dd165b9e653"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app, "gs://logofoods-d0abd");

const auth = getAuth(app);

export {app, db, storage, auth};