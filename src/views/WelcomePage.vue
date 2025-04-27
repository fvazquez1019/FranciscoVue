<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (path) => {
  router.push(path);
};
</script>

<template>
    
    <!-- Title Section -->
    <div class="text-center mb-4">
      <h1 class="text-4xl font-bold text-black mb-2">View Your Personal Spotify Stats</h1>
    </div>

    <div class="text-center text-gray-600">
        <p>Choose what you want to explore:</p>
    </div>
    
    <!-- Buttons in Grid Layout - 2 columns -->

      <div class="center">
        <Button label="Top Tracks" class="p-button-success p-4 text-xl w-20rem" style="width: 886px; height:70px;" @click="navigate('/top-tracks')" />
      </div>
      <div class="center">
        <Button label="Top Artists" class="p-button-success p-4 text-xl w-20rem" style="width: 886px; height:70px;" @click="navigate('/top-artists')" />
      </div>
      <div class="center">
        <Button label="Top Genres" class="p-button-success p-4 text-xl w-20rem" style="width: 886px; height:70px;" @click="navigate('/top-genres')" />
      </div>
      <div class="center">
        <Button label="Recently Played" class="p-button-success p-4 text-xl w-20rem" style="width: 886px; height:70px;" @click="navigate('/recently-played')" />
      </div>
   

    <!-- Feature Cards in Grid Layout - 2 columns -->
    <div class="grid">
      <div class="center">
        <Card class="surface-card shadow-2 p-4 w-20rem">
          <template #title>
            <i class="pi pi-list text-3xl text-green-500"></i>
          </template>
          <template #content>
            <h3 class="text-xl font-bold text-black mb-2">Your Charts</h3>
            <p class="text-gray-600">View your top tracks, artists, and genres over time periods.</p>
          </template>
        </Card>
      </div>

      <div class="center">
        <Card class="surface-card shadow-2 p-4 w-20rem">
          <template #title>
            <i class="pi pi-sort-alt text-3xl text-green-500"></i>
          </template>
          <template #content>
            <h3 class="text-xl font-bold text-black mb-2">Compare to Last Visit</h3>
            <p class="text-gray-600">See how your rankings change compared to your last visit.</p>
          </template>
        </Card>
      </div>

      <div class="center">
        <Card class="surface-card  shadow-2 p-4 w-20rem">
          <template #title>
            <i class="pi pi-save text-3xl text-green-500"></i>
          </template>
          <template #content>
            <h3 class="text-xl font-bold text-black mb-2">Create Playlists</h3>
            <p class="text-gray-600">Generate a playlist based on your top tracks and genres.</p>
          </template>
        </Card>
      </div>

      <div class="center">
        <Card class="surface-card shadow-2 p-4 w-20rem">
          <template #title>
            <i class="pi pi-clock text-3xl text-green-500"></i>
          </template>
          <template #content>
            <h3 class="text-xl font-bold text-black mb-2">Recently Played</h3>
            <p class="text-gray-600">View your recent listening history.</p>
          </template>
        </Card>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center p-4 text-gray-600 text-sm mt-8">
      <span>© 2025 - SpotifyDiscovery | We are not related to Spotify AB</span>
    </footer>


</template>

<style scoped>

.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
.surface-ground {
  background-color: #f9f9f9;
}
.surface-card {
  background-color: white;
  color: black;
  border-radius: 12px;
}

/* Make buttons glow slightly on hover */
.p-button-success {
  transition: all 0.3s ease;
}

.p-button-success:hover {
  background-color: #1ed760 !important; /* slightly lighter Spotify green */
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Button width responsiveness */
@media (max-width: 768px) {
  .w-20rem {
    width: 100% !important;
    max-width: 20rem;
  }
}
</style>
