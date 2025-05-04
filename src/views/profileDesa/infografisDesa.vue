<template>
  <header :class="{ 'scrolled': isScrolled }">
    <Header />
  </header>

  <div class="penduduk">
    <pendudukInfografis/>
  </div>

  <div class="statistik">
    <infografisPenduduk/>
  </div>
  <!-- <Footer /> -->
</template>


<script setup>
import { useUIStore } from "@/store/uiStore";
import Header from "@/examples/PageLayout/header.vue";
import pendudukInfografis from "@/examples/PageLayout/pendudukInfografis.vue";
import infografisPenduduk from "@/examples/PageLayout/infografisPenduduk.vue";

const uiStore = useUIStore();
uiStore.layout = "homeDesa";


</script>

<style scoped lang="scss">
/* Header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  transition: background-color 0.3s ease-in-out;
  z-index: 1000;
}

header:not(.scrolled) {
  background-color: black;
}

header.scrolled {
  background-color: rgb(37, 37, 37);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.penduduk{
    margin-top: 115px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
}

</style>
