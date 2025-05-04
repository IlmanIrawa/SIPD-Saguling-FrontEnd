<script setup>
import { storeToRefs } from "pinia";
import { useUIStore } from "@/store/uiStore";
import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";

// Gunakan Pinia Store
const uiStore = useUIStore();
const { showSidenav, layout, showNavbar } = storeToRefs(uiStore);
</script>

<template>
  <div>
    <!-- Gunakan layout berbeda jika bukan halaman homeDesa -->
    <template v-if="layout !== 'homeDesa'">
      <sidenav v-if="showSidenav" :role="selectedRole" />

      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <navbar v-if="showNavbar" :selected-role="selectedRole" />
        <router-view />
      </main>
    </template>

    <!-- Jika halaman homeDesa, gunakan layout sendiri -->
    <template v-else>
      <router-view />
    </template>
  </div>
</template>
