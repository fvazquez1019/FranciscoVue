<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tracks = ref([]);
const loading = ref(true);
const error = ref(null);
const timeRange = ref('short_term');

const fetchTopTracks = async () => {
  loading.value = true;
  error.value = null;
  
  const token = localStorage.getItem('spotify_access_token');

  if (!token) {
    error.value = "No Spotify token found. Please login again.";
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=${timeRange.value}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top tracks. Maybe your token expired?");
    }

    const data = await response.json();
    tracks.value = data.items;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTopTracks);

// Watch for changes to timeRange and refetch tracks when it changes
watch(timeRange, () => {
  fetchTopTracks();
});

const createPlaylistWithTracks = async () => {
  const token = localStorage.getItem('spotify_access_token');
  if (!token || tracks.value.length === 0) {
    alert('Missing token or no tracks!');
    return;
  }

  try {
    // Step 1: Get user ID
    const userRes = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!userRes.ok) {
      const errorData = await userRes.json();
      throw new Error(`Failed to get user profile: ${errorData.error?.message || userRes.status}`);
    }
    
    const userData = await userRes.json();
    const userId = userData.id;

    // Step 2: Create a playlist
    const playlistName = `My Top ${timeRange.value === 'short_term' ? '4 Weeks' : 
                         timeRange.value === 'medium_term' ? '6 Months' : '12 Months'} Tracks`;
    
    const playlistRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: `Your Top Tracks from (${new Date().toLocaleDateString()}) created using RythmnLens`,
        public: true // Make public for easier finding
      })
    });

    if (!playlistRes.ok) {
      const errorData = await playlistRes.json();
      throw new Error(`Failed to create playlist: ${errorData.error?.message || playlistRes.status}`);
    }

    const playlist = await playlistRes.json();

    // Step 3: Add tracks
    const uris = tracks.value.map(track => track.uri);
    const addTracksRes = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris })
    });

    if (!addTracksRes.ok) {
      const errorData = await addTracksRes.json();
      throw new Error(`Failed to add tracks: ${errorData.error?.message || addTracksRes.status}`);
    }

    const playlistUrl = playlist.external_urls.spotify;
    
    // Provide a link to the created playlist
    alert(`Playlist created! View it here: ${playlistUrl}`);
    
    // Open the playlist in a new tab
    window.open(playlistUrl, '_blank');
  } catch (err) {
    console.error('Playlist creation error:', err);
    alert(`Failed to create playlist: ${err.message}`);
  }
};

</script>

<template>
  
  <div class="min-h-screen p-6">
    <h1 class="text-3xl font-bold text-center mb-6">Top Tracks</h1>
     <!-- Time Range Selector -->
     <div class="flex justify-content-center gap-3 mb-6">
      <Button
        label="Last 4 Weeks"
        class="p-button-success"
        :outlined="timeRange !== 'short_term'"
        @click="timeRange = 'short_term'"
      />
      <Button
        label="Last 6 Months"
        class="p-button-success"
        :outlined="timeRange !== 'medium_term'"
        @click="timeRange = 'medium_term'"
      />
      <Button
        label="Last 12 Months"
        class="p-button-success"
        :outlined="timeRange !== 'long_term'"
        @click="timeRange = 'long_term'"
      />
    </div>
    <div v-if="loading" class="text-center text-xl">
      Loading your top tracks...
    </div>

    <div v-else-if="error" class="text-center text-red-500 text-lg">
      {{ error }}
      <br />
      <Button label="Go Home" class="mt-4 p-button-danger" @click="router.push('/')" />
    </div>
      
    <div v-else class="overflow-x-auto">
      <div class="flex justify-end mb-4">
  <Button label="Add Playlist" icon="pi pi-plus" class="p-button-outlined" @click="createPlaylistWithTracks" />
</div>

      <table class="min-w-full text-sm text-left">
        <thead >
          <tr>
            <th class="p-3">#</th>
            <th class="p-3">Track</th>
            <th class="p-3">Artist</th>
            <th class="p-3">Open</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(track, index) in tracks" :key="track.id" class="border-t">
            <!-- Ranking -->
            <td class="p-3">{{ index + 1 }}</td>

            <!-- Track: Album Cover + Name -->
            <td class="p-3 flex align-items-center gap-3">
              <img :src="track.album.images[2]?.url" alt="album" class="rounded" style="width: 48px; height: 48px;" />
              <span class="font-medium">{{ track.name }}</span>
            </td>

            <!-- Artist -->
            <td class="p-3">{{ track.artists.map(artist => artist.name).join(', ') }}</td>

            <!-- Open Spotify -->
            <td class="p-3">
              <a :href="track.external_urls.spotify" target="_blank" rel="noopener noreferrer">
                <Button icon="pi pi-spotify" class="p-button-sm p-button-success" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

.rounded {
  border-radius: 8px;
}
</style>