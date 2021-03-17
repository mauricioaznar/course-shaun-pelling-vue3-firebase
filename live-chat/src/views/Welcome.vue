<template>
	<div class="welcome container">
		<p>Welcome</p>
		<div v-if="formToggle">
			<LoginForm @login="enterChat"/>
			<p>No account yet? <span @click="updateToggle">Sign up</span> instead</p>
		</div>
		<div v-else>
			<SignupForm @signup="enterChat" />
			<p>Already registerd? <span @click="updateToggle">Log in</span> instead</p>
		</div>
	</div>
</template>

<script>
	import SignupForm
		from '../components/SignupForm'
	import LoginForm
		from '../components/LoginForm'
	import {ref} from 'vue'
	import {useRouter} from 'vue-router'
	export default {
		components: {
			SignupForm,
			LoginForm
		},
		setup () {
			let formToggle = ref(false)

			const router = useRouter()

			const updateToggle = () => {
				formToggle.value = !formToggle.value
			}

			const enterChat = () => {
				router.push({name: 'Chatroom'})
			}

			return {formToggle, updateToggle, enterChat}
		}
	}
</script>

<style>
	.welcome {
		text-align: center;
		padding: 20px 0;
	}
	.welcome form {
		width: 300px;
		margin: 20px auto;
	}
	.welcome label {
		display: block;
		margin: 20px 0 10px;
	}
	.welcome input {
		width: 100%;
		padding: 10px;
		border-radius: 20px;
		border: 1px solid #eee;
		outline: none;
		color: #999;
		margin: 10px auto;
	}
	.welcome span{
		font-weight: bold;
		text-decoration: underline;
		cursor: pointer;
	}
	.welcome button {
		margin: 20px auto;
	}
</style>