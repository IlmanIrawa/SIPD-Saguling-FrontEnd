<template>
  <div>

    <router-view></router-view> 
    
    <!-- Daftar fitur khusus untuk WH Operator -->
    <ul>
      <div v-if="currentComponent === 'profile'">
      <div class="component-container">
        <profileUser />
      </div>
    </div>

    
      <div v-if="currentComponent === 'pengajuan-user'">
      <div class="component-container">
        <pengajuanUser />
      </div>
    </div>

      
      <div v-if="currentComponent === 'riiwayat-pengajuan'">
      <div class="component-container">
        <riwayatPengajuan />
      </div>
    </div>

      <div v-if="currentComponent === 'berita-user'">
      <div class="component-container">
        <beritaUser />
      </div>
    </div>

    <div v-if="currentComponent === 'bansos-info'">
      <div class="component-container">
        <bansosInfo />
      </div>
    </div>

    <div v-if="currentComponent === 'lapor'">
      <div class="component-container">
        <lapor />
      </div>
    </div>

    <div v-if="currentComponent === 'cetak'">
      <div class="component-container">
        <buktiPengajuan />
      </div>
    </div>

    </ul>
  </div>
</template>

<script setup>
import profileUser from "./profileUser.vue";
import pengajuanUser from "./pengajuanUser.vue";
import riwayatPengajuan from "./riwayatPengajuan.vue";
import beritaUser from "./beritaUser.vue";
import bansosInfo from "./bansosInfo.vue";
import lapor from "./lapor.vue";
import buktiPengajuan from "./buktiPengajuan.vue";

</script>

<style scoped>
/* Style spesifik untuk WH Operator Dashboard */
h1 {
  color: #4caf50;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
