<template>
	<div class="project" :class="{complete: project.complete}">
		<div class="actions">
			<h3 @click="toggleDetails">
				{{project.title}}
			</h3>
		</div>
		<div class="icons">
			<router-link
				:to="{name: 'EditProject', params: {id: project.id}}"
			>
				<span class="material-icons"
				>edit</span>
			</router-link>
			<span
				@click="() => {handleDelete()}"
				class="material-icons"
			>delete</span>
			<span
				@click="() => {toggleComplete()}"
				class="material-icons tick"
			>done</span>
		</div>
		<div
			class="details"
			v-show="showDetails"
		>
			<p>
				{{project.details}}
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			project: {
				type: Object
			}
		},
		data() {
			return {
				showDetails: false,
				uri: 'http://localhost:3000/projects/' + this.project.id
			}
		},
		methods: {
			toggleDetails: function () {
				this.showDetails = !this.showDetails
			},
			toggleComplete: function () {
				fetch(this.uri, {
					method: 'PATCH',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({complete: !this.project.complete})
				})
				.then(() => {
					this.$emit('complete', this.project.id)
				})
				.catch((e) => {
					console.log(e)
				})
			},
			handleDelete: function () {
				fetch(this.uri, {method: 'DELETE'})
					.then(() => {
						this.$emit('delete', this.project.id)
					})
					.catch(e => {
						console.log(e)
					})
			}
		}
	}
</script>

<style>
	.project {
		margin: 20px auto;
		background: white;
		padding: 10px 20px;
		border-radius: 4px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
		border-left: 4px solid red
	}
	.project.complete {
		border-left: 4px solid green;
	}

	.project.complete .tick{
		color: green;
	}

	h3 {
		cursor: pointer;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.material-icons {
		font-size: 24px;
		margin-left: 10px;
		color: #bbb;
		cursor: pointer;
	}

	.material-icons:hover {
		color: #777;
	}
</style>