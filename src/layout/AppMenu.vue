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
                label: 'Mood Journey',
                icon: 'pi pi-fw pi-face-smile',
                to: '/pages/MoodJourney'
            },
            


        ]
    },
    {
        label: 'Information',
        items: [
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/fvazquez1019/FranciscoVue',
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
