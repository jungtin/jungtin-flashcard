import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"


const config = {
    apiKey: "AIzaSyAIgROlJjoZbWR2SSQd1SfWYC1U6992N40",
    authDomain: "vue-test-9ae94.firebaseapp.com",
    databaseURL: "https://vue-test-9ae94.firebaseio.com",
    projectId: "vue-test-9ae94",
    storageBucket: "vue-test-9ae94.appspot.com",
    messagingSenderId: "292253619688",
    appId: "1:292253619688:web:c4f8beaa3ce3270cbac05d",
    measurementId: "G-MWYGDC02TL"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const storage = firebase.storage();