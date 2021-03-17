<template>
  <h2>Playlist details {{id}}</h2>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="no image"/>
      </div>
      <h2>
        {{playlist.title}}
      </h2>
      <p class="username">
        Created by {{playlist.userName}}
      </p>
      <p class="description">
        {{playlist.description}}
      </p>
      <button v-if="ownership" @click="handleDelete">
        Delete playlist
      </button>
    </div>
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet
      </div>
      <div v-for="song in playlist.songs" class="single-song" :key="song.id">
        <div class="details">
          <h3>{{song.title}}</h3>
          <p>{{song.artist}}</p>
        </div>
        <button v-if="ownership" @click="() => {handleDeleteSong(song.id)}">Delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
  <div v-if="error" class="error">
    {{error}}
  </div>
</template>

<script>
import useDocument from "../../composables/useDocument";
import getDocument from "../../composables/getDocument";
import getUser from "../../composables/getUser";
import {computed} from "vue";
import useStorage from "../../composables/useStorage";
import {useRouter} from "vue-router";
import AddSong from "../../components/AddSong";

export default {
  components: {AddSong},
  setup(props) {
    const {document: playlist, error} = getDocument('playlists', props.id)
    const {deleteImage} = useStorage()
    const {user} = getUser()
    const {deleteDoc, updateDoc} = useDocument('playlists', props.id)
    const router = useRouter()
    const ownership = computed(() => {
      return playlist.value && user.value && user.value.uid === playlist.value.userId
    })
    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath)
      const res = await deleteDoc('playlists', props.id)
      await router.push({name: 'Home'})
    }
    const handleDeleteSong = async (songId) => {
      const newSongs = playlist.value.songs.filter(song => {
        return song.id !== songId
      })
      await updateDoc({songs: newSongs})
    }
    return {playlist, error, ownership, handleDelete, handleDeleteSong}
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>