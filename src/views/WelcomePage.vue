<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const navigate = (path) => {
  router.push(path);
};
</script>

<template>
  <div class="dashboard-wrapper">

    <!-- Title Section -->
    <div class="text-center mb-4">
      <h1 class="text-4xl font-bold mb-2 text-title">Welcome! Your Personal Spotify Stats</h1>
      <p class="text-subtitle">Choose what you want to explore today:</p>
    </div>

    <!-- Buttons -->
    <div class="center">
      <Button label="Top Tracks" class="p-button-success p-4 text-xl w-20rem" style="width: 886px; height:70px;" @click="navigate('/yourMusic/TopTracks')" />
    </div>
    <div class="center">
      <Button label="Top Artists" class="p-button-success p-4 text-xl w-20rem" style="width: 886px; height:70px;" @click="navigate('/yourMusic/TopArtists')" />
    </div>
    <div class="center">
      <Button label="Top Genres" class="p-button-success p-4 text-xl w-20rem" style="width: 886px; height:70px;" @click="navigate('/yourMusic/TopGenres')" />
    </div>
    <div class="center">
      <Button label="Recently Played" class="p-button-success p-4 text-xl w-20rem" style="width: 886px; height:70px;" @click="navigate('/yourMusic/RecentlyPlayed')" />
    </div>

    <!-- Feature Cards -->
    <div class="grid">
      <div class="center">
        <Card class="custom-card shadow-2 p-4 w-20rem">
          <template #title>
            <i class="pi pi-list text-3xl text-green-500"></i>
          </template>
          <template #content>
            <h3 class="card-title">Your Charts</h3>
            <p class="card-desc">View your top tracks, artists, and genres over time periods.</p>
          </template>
        </Card>
      </div>

      <div class="center">
        <Card class="custom-card shadow-2 p-4 w-20rem">
          <template #title>
            <i class="pi pi-sort-alt text-3xl text-green-500"></i>
          </template>
          <template #content>
            <h3 class="card-title">Compare to Last Visit</h3>
            <p class="card-desc">See how your rankings change compared to your last visit.</p>
          </template>
        </Card>
      </div>

      <div class="center">
        <Card class="custom-card shadow-2 p-4 w-20rem">
          <template #title>
            <i class="pi pi-save text-3xl text-green-500"></i>
          </template>
          <template #content>
            <h3 class="card-title">Create Playlists</h3>
            <p class="card-desc">Generate a playlist based on your top tracks and genres.</p>
          </template>
        </Card>
      </div>

      <div class="center">
        <Card class="custom-card shadow-2 p-4 w-20rem">
          <template #title>
            <i class="pi pi-clock text-3xl text-green-500"></i>
          </template>
          <template #content>
            <h3 class="card-title">Recently Played</h3>
            <p class="card-desc">View your recent listening history.</p>
          </template>
        </Card>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center p-4 text-footer mt-8">
      <span>© 2025 - RhythmLens | We are not related to Spotify AB</span>
    </footer>

  </div>
</template>

<style scoped>
/* Centering utility */
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}

/* Responsive width */
@media (max-width: 768px) {
  .w-20rem {
    width: 100% !important;
    max-width: 20rem;
  }
}

/* Theme wrapper */
.dashboard-wrapper {
  background-color: var(--bg-color);
  color: var(--text-default);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Text color helpers */
.text-title {
  color: var(--text-title);
}

.text-subtitle {
  color: var(--text-subtitle);
}

.text-footer {
  color: var(--text-footer);
}

/* Card style */
.custom-card {
  background-color: var(--card-bg);
  color: var(--card-text);
  border-radius: 12px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--card-text);
}

.card-desc {
  color: var(--card-subtext);
}

/* Light Theme */
:root {
  --bg-color: #f9f9f9;
  --text-default: #000;
  --text-title: #000000;
  --text-subtitle: #444444;
  --text-footer: #666666;

  --card-bg: #ffffff;
  --card-text: #000000;
  --card-subtext: #444444;
}

/* Dark Theme Overrides */
:global(body.dark) {
  --bg-color: #121212;
  --text-default: #ffffff;
  --text-title: #ffffff;
  --text-subtitle: #cccccc;
  --text-footer: #999999;

  --card-bg: #1e1e1e;
  --card-text: #ffffff;
  --card-subtext: #bbbbbb;
}
</style>
