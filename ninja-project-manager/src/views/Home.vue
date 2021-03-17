<template>
	<div class="home">
		<FilterNav
			@filterChange="(by) => {handleFilter(by)}"
			:current="current"
		/>
		<div v-if="filteredProjects.length">
			<div
				v-for="project in filteredProjects"
				:key="project.id"
			>
				<SingleProject
					:project="project"
					@delete="handleDelete"
					@complete="handleComplete"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import SingleProject
		from '../components/SingleProject'
	import FilterNav
		from '../components/FilterNav'

	export default {
		name: 'Home',
		components: {
			FilterNav,
			SingleProject
		},
		data() {
			return {
				projects: [],
				current: 'all'
			}
		},
		mounted() {
			fetch('http://localhost:3000/projects')
				.then(res => res.json())
				.then(data => {
					this.projects = data
				})
				.catch(err => console.log(err.message))
		},
		methods: {
			handleFilter: function (by) {
				this.current = by
			},
			handleDelete: function (id) {
				this.projects = this.projects.filter(project => project.id !== id)
			},
			handleComplete: function (id) {
				this.projects = this.projects.map(project => {
					if (project.id === id) {
						return {
							...project,
							complete: !project.complete
						}
					}
					return project
				})
			}
		},
		computed: {
			filteredProjects: function () {
				if (this.current === 'all') {
					return this.projects
				} else if (this.current === 'ongoing') {
					return this.projects.filter(project => !project.complete)
				} else if (this.current === 'completed') {
					return this.projects.filter(project => project.complete)
				}
			}
		}
	}
</script>
