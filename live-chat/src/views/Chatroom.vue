<template>
	<div class="container">
		<Navbar />
		<ChatWindow />
		<NewChatForm />
	</div>
</template>

<script>
	import Navbar from '../components/Navbar'
	import {watch} from 'vue'
	import getUser from '../composables/getUser'
	import {useRouter} from 'vue-router'
	import NewChatForm from '../components/NewChatForm'
	import ChatWindow from '../components/ChatWindow'
	export default {
		name: 'Chatroom',
		setup() {
			const {user} = getUser()
			const router = useRouter()
			watch(user, () => {
				if (!user.value) {
					router.push({name: 'Welcome'})
				}
			})
		},
		components: {
			Navbar,
			NewChatForm,
			ChatWindow
		}
	}
</script>

<style scoped>

</style>