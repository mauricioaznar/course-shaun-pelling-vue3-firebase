import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyCsO5kT0SJiUEi2rLk__6dL0Gv9VC4FqFQ",
	authDomain: "muso-ninjas-2f9f9.firebaseapp.com",
	projectId: "muso-ninjas-2f9f9",
	storageBucket: "muso-ninjas-2f9f9.appspot.com",
	messagingSenderId: "986626756954",
	appId: "1:986626756954:web:e3aefcc9123ec91ecf6363"
};

// init firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//timestamp

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp}