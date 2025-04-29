<template>
    <div >
      <h1 class="text-3xl font-bold text-center mb-6">Recently played Tracks</h1>
  
      <div v-if="loading" class="text-center text-gray-600 text-xl">Loading...</div>
  
      <div v-else-if="error" class="text-center text-red-500 text-lg">
        {{ error }}
      </div>
  
      <div v-else class="overflow-x-auto">
        <table class="min-w-full text-sm text-left border-separate border-spacing-y-2">
          <thead class="font-semibold">
            <tr>
              <th class="p-3">Track</th>
              <th class="p-3">Artist(s)</th>
              <th class="p-3">Played at</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(track, index) in recentlyPlayed" :key="index" >
              <td class="p-3">{{ track.name }}</td>
              <td class="p-3">{{ track.artists.join(', ') }}</td>
              <td class="p-3">{{ formatDate(track.played_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const accessToken = localStorage.getItem('spotify_access_token')
  const recentlyPlayed = ref([])
  const loading = ref(true)
  const error = ref(null)
  
  const fetchRecentlyPlayed = async () => {
    if (!accessToken) {
      error.value = 'No access token found.'
      loading.value = false
      return
    }
  
    try {
      const response = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played?limit=50',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
  
      if (!response.ok) throw new Error('Failed to fetch recently played tracks.')
  
      const data = await response.json()
  
      recentlyPlayed.value = data.items.map(item => ({
        name: item.track.name,
        artists: item.track.artists.map(a => a.name),
        played_at: item.played_at
      }))
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }
  
  onMounted(fetchRecentlyPlayed)
  </script>
  
  <style scoped>
  
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    text-align: left;
  }
  
  tbody tr {
    border-radius: 8px;
    overflow: hidden;
  }
  </style>
  