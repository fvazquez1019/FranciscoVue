<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const artists = ref([]);
const loading = ref(true);
const error = ref(null);
const timeRange = ref('short_term'); // Default: last 4 weeks

const fetchTopArtists = async () => {
  const token = localStorage.getItem('spotify_access_token');

  if (!token) {
    error.value = "No Spotify token found. Please login again.";
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=20&time_range=${timeRange.value}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top artists. Maybe your token expired?");
    }

    const data = await response.json();
    artists.value = data.items;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTopArtists);
watch(timeRange, fetchTopArtists);
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">Top Artists</h1>

    <!-- Time Range Selector -->
    <div class="flex justify-content-center gap-3 mb-6">
      <Button
        label="Last 4 Weeks"
        class="p-button-success"
        outlined
        :class="{ 'p-button-outlined': timeRange !== 'short_term' }"
        @click="timeRange = 'short_term'"
      />
      <Button
        label="Last 6 Months"
        class="p-button-success"
        outlined
        :class="{ 'p-button-outlined': timeRange !== 'medium_term' }"
        @click="timeRange = 'medium_term'"
      />
      <Button
        label="Last 12 Months"
        class="p-button-success"
        outlined
        :class="{ 'p-button-outlined': timeRange !== 'long_term' }"
        @click="timeRange = 'long_term'"
      />
    </div>

    <div v-if="loading" class="text-center text-xl">
      Loading your top artists...
    </div>

    <div v-else-if="error" class="text-center text-red-500 text-lg">
      {{ error }}
      <br />
      <Button label="Go Home" class="mt-4 p-button-danger" @click="router.push('/')" />
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead >
  <tr>
    <th class="p-3">#</th>
    <th class="p-3">Artist</th>
    <th class="p-3" style="min-width: 200px;">Genre(s)</th> <!-- Widened -->
    <th class="p-3">Open</th>
  </tr>
</thead>

        <tbody>
            <tr v-for="(artist, index) in artists" :key="artist.id" class="border-t">
            <td class="p-3">{{ index + 1 }}</td>

                <td class="p-3 flex align-items-center gap-3">
                <img :src="artist.images[2]?.url" alt="artist" class="rounded" style="width: 48px; height: 48px;" />
                <span class="font-medium">{{ artist.name }}</span>
             </td>

  <td class="p-3" style="min-width: 200px;"> <!-- Widened -->
    {{ artist.genres.length > 0 ? artist.genres.slice(0, 3).join(', ') : 'N/A' }}
  </td>

  <td class="p-3">
    <a :href="artist.external_urls.spotify" target="_blank" rel="noopener noreferrer">
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
