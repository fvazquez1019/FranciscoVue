<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Your Listening',
        items: [
            { label: 'Top Tracks ', icon: 'pi pi-fw pi-star', to: '/yourMusic/TopTracks' },
            { label: 'Top Artists ', icon: 'pi pi-fw pi-microphone', to: '/yourMusic/TopArtists' },
            { label: 'Top Genres ', icon: 'pi pi-fw pi-headphones', to: '/yourMusic/TopGenres' },
            { label: 'Recently Played', icon: 'pi pi-fw pi-history', to: '/yourMusic/RecentlyPlayed' },
        ]
    },
    {
        label: 'Discovery',
        icon: 'pi pi-fw pi-sparkles',
        to: '/pages',
        items: [
            {
                label: 'Landing (remove later)',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Auth (move to top right)',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Register',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/Register'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Country Graph',
                icon: 'pi pi-fw pi-map',
                to: '/pages/CountryGraph'
            },

            {
                label: 'VennDiagram',
                icon: 'pi pi-fw pi-link',
                to: '/pages/VennDiagram'
            },
            
            {
                label: 'Not Found (remove later)',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation (remove later)',
                icon: 'pi pi-fw pi-book',
                to: '/documentation'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: /*'https://github.com/primefaces/sakai-vue'*/ 'https://github.com/fvazquez1019/FranciscoVue',
                target: '_blank'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
