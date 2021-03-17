import {ref} from 'vue'
import {projectFirestore} from "../firebase/config";

const useDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async () => {
        isPending.value = true
        error.value = null
        try {
            const res = await docRef.delete()
            isPending.value = false
            error.value = false
            return res
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'Could not delete the document'
        }
    }

    const updateDoc = async (updates) => {
        isPending.value = true
        error.value = null
        try {
            const res = await docRef.update(updates)
            isPending.value = false
            error.value = false
            return res
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'Could not update the document'
        }
    }

    return {error, isPending, deleteDoc, updateDoc}
}

export default useDocument