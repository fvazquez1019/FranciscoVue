
import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/landing',
            component: AppLayout,
            children: [
                {
                    path: '/landing',
                    name: 'landing',
                    component: () => import('@/views/pages/Landing.vue')
                },
                {
                    path: '/',
                    name: 'welcomepage',
                    component: () => import('@/views/WelcomePage.vue')
                },

                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/CountryGraph',
                    name: 'CountryGraph',
                    component: () => import('@/views/pages/CountryGraph.vue')
                },

                {
                    path: '/pages/VennDiagram',
                    name: 'VennDiagram',
                    component: () => import('@/views/pages/VennDiagram.vue')
                },
                {
                    path: '/pages/MoodJourney',
                    name: 'MoodJourney',
                    component: () => import('@/views/pages/MoodJourney.vue')
                },
                {
                    path: '/yourMusic/TopTracks',
                    name: 'TopTracks',
                    component: () => import('@/views/pages/yourMusic/TopTracks.vue')
                },
                {
                    path: '/yourMusic/TopArtists',
                    name: 'TopArtists',
                    component: () => import('@/views/pages/yourMusic/TopArtists.vue')
                },
                {
                    path: '/yourMusic/TopGenres',
                    name: 'TopGenres',
                    component: () => import('@/views/pages/yourMusic/TopGenres.vue')
                },
                {
                    path: '/yourMusic/RecentlyPlayed',
                    name: 'RecentlyPlayed',
                    component: () => import('@/views/pages/yourMusic/RecentlyPlayed.vue')
                },
            ]
        },

        {
            path: '/callback',
            name: 'callback',
            component:  () => import('@/views/pages/auth/Callback.vue') 
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },

    ]
});

export default router;