import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyCf7Cn6zEKLKVwzjkQVVA6EZvjGIK8ceeA",
	authDomain: "vue-firabase-udemy.firebaseapp.com",
	projectId: "vue-firabase-udemy",
	storageBucket: "vue-firabase-udemy.appspot.com",
	messagingSenderId: "513695555613",
	appId: "1:513695555613:web:7aaad12cea2cfe89d1a6f4"
};

// init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {projectFirestore, projectAuth, timestamp}