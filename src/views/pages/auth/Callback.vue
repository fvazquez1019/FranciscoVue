<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const hash = window.location.hash.substring(1); // Remove the '#' from the URL
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');

  if (accessToken) {
    console.log('Spotify Access Token:', accessToken);

    // ✅ Save the token somewhere (localStorage for now)
    localStorage.setItem('spotify_access_token', accessToken);

    // ✅ Redirect to home page or dashboard
    router.push('/app');
  } else {
    console.error('No access token found in URL!');
    alert('Spotify login failed!');
    router.push('/');
  }
});
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center min-h-screen">
    <h2 class="text-xl font-semibold">Connecting your Spotify account...</h2>
    <p class="mt-4 text-muted-color">Please wait while we complete the connection.</p>
  </div>
</template>

<style scoped>
.text-muted-color {
  color: #6c757d;
}
</style>
