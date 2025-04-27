import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, grtFirestore} from "firebase/firestore";

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
const firebaseConfig = {
    apiKey: "AIzaSyAI3dldbWTuP_2aTUyA75zrsoy9h1PzGnM",
    authDomain: "web-programming-final-88382.firebaseapp.com",
    projectId: "web-programming-final-88382",
    storageBucket: "web-programming-final-88382.firebasestorage.app",
    messagingSenderId: "334629079531",
    appId: "1:334629079531:web:8a96ca358d68a7f52431ae",
    measurementId: "G-3N655EBF5B"
  };
initializeApp(firebaseConfig);
const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
const db = getFirestore();
export default db;
