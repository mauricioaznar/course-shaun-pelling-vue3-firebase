import {ref} from 'vue'
import {projectFirestore} from '../firebase/config'

const useCollection  = (collection) => {
	const error = ref(null)

	const addDoc = async (doc) => {
		error.value = null
		try {
			await projectFirestore.collection(collection).add(doc)
		} catch (e) {
			console.log(e.message)
			error.value = 'could not send the message'
		}
	}

	return {addDoc, error}
}

export default useCollection