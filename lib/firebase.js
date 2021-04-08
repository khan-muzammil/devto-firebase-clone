import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: NEXT_PUBLIC_APP_ID,
}

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
// export const auth = firebase.auth()
