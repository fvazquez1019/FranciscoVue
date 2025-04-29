<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';

const accessToken = localStorage.getItem('spotify_access_token');
const genres = ref([]);
const loading = ref(true);
const error = ref(null);

// Custom helper: Split array into chunks of n size
const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const fetchTopGenres = async () => {
  if (!accessToken) {
    error.value = "No Spotify token found. Please login again.";
    loading.value = false;
    return;
  }

  try {
    let setOfArtists = new Set();
    let nextURL = 'https://api.spotify.com/v1/me/tracks?limit=50';

    // 1. Recursively collect all artist IDs from saved tracks
    while (nextURL) {
      const response = await fetch(nextURL, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch saved tracks.');
      }

      const data = await response.json();
      data.items.forEach(track => {
        track.track.artists.forEach(artist => {
          setOfArtists.add(artist.id);
        });
      });

      nextURL = data.next;
    }

    const artistIds = Array.from(setOfArtists);

    // 2. Fetch artists info in chunks of 50
    const artistChunks = chunkArray(artistIds, 50);
    const artistGenrePromises = artistChunks.map(chunk => {
      return fetch(`https://api.spotify.com/v1/artists?ids=${chunk.join(',')}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => res.json())
      .then(data => {
        let genreDict = {};
        data.artists.forEach(artist => {
          artist.genres.forEach(genre => {
            genreDict[genre] = (genreDict[genre] || 0) + 1;
          });
        });
        return genreDict;
      });
    });

    const allGenreDicts = await Promise.all(artistGenrePromises);

    // 3. Flatten the array of genre dictionaries into one big genre dictionary
    const flattenedGenres = allGenreDicts.reduce((acc, curr) => {
      for (const genre in curr) {
        if (acc[genre]) {
          acc[genre] += curr[genre];
        } else {
          acc[genre] = curr[genre];
        }
      }
      return acc;
    }, {});

    // 4. Map to array, sort descending by frequency
    genres.value = Object.entries(flattenedGenres)
      .map(([name, count]) => ({
        name,
        count,
        spotifyLink: 'https://open.spotify.com/genre/placeholder' // You can replace with real logic
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 genres only

  } catch (err) {
    console.error(err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTopGenres);
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">Top Genres Based on Saved Tracks</h1>

    <div v-if="loading">
      Loading your top genres...
    </div>

    <div v-else-if="error" class="text-center text-red-500 text-lg">
      {{ error }}
    </div>

    <div v-else class="grid-container">
      <div
        v-for="(genre, index) in genres"
        :key="index"
        class="genre-card"
      >
        <h3 class="text-lg font-semibold text-center mb-2">
          {{ index + 1 }}. {{ genre.name }}
        </h3>
        <p class="text-center">
          Appears in {{ genre.count }} of your saved artists
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>


.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.genre-card {

  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.genre-card:hover {
  transform: scale(1.02);
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
