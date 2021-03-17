<template>
  <div class="navbar">
    <nav>
      <img src="../assets/ninja.png" alt=""/>
      <h1>
        <router-link :to="{name: 'Home'}">Muso Ninjas</router-link>
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{name: 'CreatePlaylist'}">Create playlist</router-link>
          <router-link :to="{name: 'UserPlaylist'}">My playlist</router-link>
          <span>Hi there, {{user.displayName}}</span>
          <button @click="handleSubmit">Logout</button>
          <button v-if="isPending" disabled>Waiting...</button>
        </div>
        <div v-if="!user">
          <router-link class="btn" :to="{name: 'Signup'}">Signup</router-link>
          <router-link class="btn" :to="{name: 'Login'}">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composables/useLogout";
import {useRouter} from "vue-router";
import getUser from "../composables/getUser";

export default {

  setup() {
    const {logout, error, isPending} = useLogout()
    const {user} = getUser()
    const router = useRouter()
    const handleSubmit = async () => {
      const res = await logout()
      if (!error.value) {
        await router.push({name: 'Login'})
      }
    }

    return {handleSubmit, isPending, user}
  }
}
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav img {
  max-height: 60px;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a, button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
</style>