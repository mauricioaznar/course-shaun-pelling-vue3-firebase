import {ref, watchEffect} from 'vue'
import {projectFirestore} from '../firebase/config'

const getCollection = (collection) => {
	const documents = ref(null)
	const error = ref(null)

	let collectionRef = projectFirestore.collection(collection)
		.orderBy('createdAt')

	const unsub = collectionRef.onSnapshot((snap) => {
		let results = []
		snap.docs.forEach(doc => {
			doc.data().createdAt && results.push({...doc.data(), id: doc.id})
		})
		documents.value = results
		error.value = null
	}, (err) => {
		console.log(err.message)
		document.value = null
		error.value = 'Could not fetch data'
	})

	watchEffect((onInvalidate) => {
		onInvalidate(() => {
			console.log('unsubscribed from ', collection)
			unsub()
		})
	})

	return {documents, error}

}

export default getCollection
