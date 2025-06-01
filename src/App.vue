<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useUIStore } from "@/store/uiStore";

import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";

const uiStore = useUIStore();
const { showSidenav, layout, showNavbar } = storeToRefs(uiStore);
const route = useRoute();

// Gunakan layout dari meta route atau default dari store
const currentLayout = computed(() => route.meta.layout || layout.value);

// Role opsional
const selectedRole = ref("admin");

// Cegah flicker layout dashboard muncul sebentar
const isReady = ref(false);
watch(
  () => route.fullPath,
  () => {
    isReady.value = true;
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="isReady">
    <!-- Layout dashboard (Argon) -->
    <template v-if="currentLayout === 'dashboard'">
      <div class="g-sidenav-show bg-gray-100">
        <Sidenav v-if="showSidenav" :role="selectedRole" />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
          <Navbar v-if="showNavbar" :selected-role="selectedRole" />
          <router-view />
        </main>
      </div>
    </template>

    <!-- Layout khusus -->
    <template v-else>
      <router-view />
    </template>
  </div>
</template>
