<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <svg viewBox="0 0 54 40" xmlns="http://www.w3.org/2000/svg">
  <!-- Wave bars adjusted for 54x40 viewbox -->
  <rect x="5" y="20" width="3" height="6" rx="1.5" fill="#4ade80" />
  <rect x="10" y="16" width="3" height="14" rx="1.5" fill="#4ade80" />
  <rect x="15" y="12" width="3" height="22" rx="1.5" fill="#4ade80" />
  <rect x="20" y="8" width="3" height="30" rx="1.5" fill="#4ade80" />
  <rect x="25" y="12" width="3" height="22" rx="1.5" fill="#4ade80" />
  <rect x="30" y="16" width="3" height="14" rx="1.5" fill="#4ade80" />
  <rect x="35" y="20" width="3" height="6" rx="1.5" fill="#4ade80" />
</svg>

                <span>RythmnLens</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <!--<div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div> -->
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <!--<button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button> -->
                    <Button type="button" class="layout-topbar-action" text as="router-link" to="/auth/login">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </Button>
                    
                </div>
            </div>
        </div>
    </div>
</template>
