import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login'
import Signup from "../views/auth/Signup";
import CreatePlaylist from "../views/playlists/CreatePlaylist";
import {projectAuth} from "../firebase/config";
import PlaylistDetails from "../views/playlists/PlaylistDetails";
import UserPlaylists from "../views/playlists/UserPlaylists";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({name: 'Login'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth
  },
  {
    path: '/playlists/user',
    name: 'UserPlaylist',
    component: UserPlaylists,
    beforeEnter: requireAuth
  },
  {
    path: '/playlist/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
