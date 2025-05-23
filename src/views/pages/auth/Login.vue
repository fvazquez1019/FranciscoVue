<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';
import { auth } from '@/firebase/init';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router'; 

const router = useRouter(); 

const email = ref('');
const password = ref('');
const checked = ref(false); // ✅ You were missing this

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    alert('Login successful!');
    router.push('/');
  } catch (error) {
    console.error('Login error:', error.message);
    alert(error.message);
  }
};

// Updated Spotify Login
const clientId = '604650260d744f78bf14f1f7a9b90334';
const redirectUri = 'http://localhost:5173/callback';
const scopes = [
  'user-read-email',
  'playlist-read-private',
  'user-top-read',
  'user-library-read',
  'user-read-recently-played',
  'playlist-modify-public', 
  'playlist-modify-private'  // ✅ This is what you were missing
].join(' ');

const loginWithSpotify = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&show_dialog=true`;
  window.location.href = authUrl;
};
</script>

<template>
  <FloatingConfigurator />
  <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
          <div class="text-center mb-8">
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to RythmnLens!</div>
            <span class="text-muted-color font-medium">Sign in to continue</span>
          </div>

          <div>
            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
            <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
            <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false" />

            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
              <div class="flex items-center">
                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
            </div>

            <Button label="Sign In" class="w-full mb-4" @click="login" />

            <Button 
              label="Connect with Spotify (reccomended)" 
              @click="loginWithSpotify" 
              class="p-4 text-xl w-full"
              style="font-family: 'Circular', sans-serif; ; border: none; color: white;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}
.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
