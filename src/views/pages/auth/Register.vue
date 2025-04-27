<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';
import { auth } from '@/firebase/init';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const checked = ref(false);

const saveUser = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert('Account created successfully!');
    email.value = '';
    password.value = '';
  } catch (e) {
    console.error("Error creating user:", e.message);
    alert(e.message);
  }
};
const clientId = '604650260d744f78bf14f1f7a9b90334';
const redirectUri = 'http://localhost:5173/callback';
const scopes = 'user-read-email playlist-read-private';

const loginWithSpotify = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&show_dialog=true`;
  window.location.href = authUrl; // Redirect user to Spotify OAuth page
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Spotify Visualizer!</div>
                        <span class="text-muted-color font-medium">Please create an account</span>
                    </div>
                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />
                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>
                        <Button label="Register Account" @click="saveUser" class="w-full" />
                        <Button label="Already have an account? Login" class="w-full mt-4" @click="() => router.push('/auth/login')" />
                            <Button 
  label="Connect with Spotify" 
  @click="loginWithSpotify" 
  class="p-4 text-xl w-full mt-4" 
  style="font-family: 'Circular', sans-serif; background-color: #1DB954; border: none; color: white;"
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
