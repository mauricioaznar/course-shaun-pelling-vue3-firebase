<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login form</h3>
    <input type="text" placeholder="display name" v-model="displayName"/>
    <input type="email" placeholder="Email" v-model="email"/>
    <input type="password" placeholder="password" v-model="password"/>
    <div v-if="error" class="error"> {{error}}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import useSignup from "../../composables/useSignup";
import {useRouter} from "vue-router";


export default {
  setup() {
    const {error, signup, isPending} = useSignup()
    const email = ref('')
    const displayName = ref('')
    const password = ref('')
    const router = useRouter()

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value)
      if (!error.value) {
        await router.push({name: 'UserPlaylist'})
      }
    }

    return {email, password, displayName, handleSubmit, error, isPending}
  }
}
</script>

<style scoped>


</style>