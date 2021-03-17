
<template>
	<form @submit.prevent="handleSubmit">
		<label>Title</label>
		<input type="text" v-model="title" required>
		<label>Details</label>
		<textarea v-model="details" required></textarea>
		<button>Update Project</button>
	</form>
</template>

<script>
	export default {
		props: ['id'],
		data() {
			return {
				uri: 'http://localhost:3000/projects/' + this.id,
				title: '',
				details: '',
			}
		},
		mounted() {
			fetch(this.uri)
				.then(res => res.json())
				.then(data => {
					this.title = data.title
					this.details = data.details
				}).catch(err => console.log(err))
		},
		methods: {
			handleSubmit() {
				let project = {
					title: this.title,
					details: this.details
				}
				fetch(this.uri,
					{
						method: 'PATCH',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(project)
					}
				)
					.then(() => {
						this.$router.push('/')
					})
					.catch((e) => {
						console.log(e)
					})
			}
		}
	}
</script>

<style>
</style>