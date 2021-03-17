import {ref} from 'vue'
import {projectAuth} from '../firebase/config'

const error = ref(null)

const logout = async () => {
	error.value = null

	try {
		await projectAuth.signOut()
	} catch (e) {
		console.log(e.message)
		error.value = e.message
	}
}

const useLogout = () => {
	return { logout, error }
}

export default useLogout