import firebase from "firebase/app"

import "firebase/auth"
import 'firebase/firestore'

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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



export const auth = firebase.auth();

export const db = firebase.firestore()

export const coursesRef = db.collection("courses");

export const chaptersRef = function(courseId) {
  return db.collection("courses").doc(courseId).collection("chapters");
}


export const questionsRef = function(courseId, chapterId) {
  return db.collection("courses").doc(courseId).collection("chapters").doc(chapterId).collection("questions");
}


export const getSyncFirestore = (collection, data) => {

  const unsubscribe = collection.onSnapshot(ref => {
      ref.docChanges().forEach((change) => {
        const { newIndex, oldIndex, doc, type } = change;
        if (type === "added") {
          data.splice(newIndex, 0, { id: doc.id, ...doc.data() }); // add
        } else if (type === "modified") {
          data.splice(oldIndex, 1); // remove old
          data.splice(newIndex, 0, { id: doc.id, ...doc.data() }); // add new
        } else if (type === "removed") {
          data.splice(oldIndex, 1); // remove
        }
      });
    },
    function (err) {
      console.log(err);
    });
  return unsubscribe;
};