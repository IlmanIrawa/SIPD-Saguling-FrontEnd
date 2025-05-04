<template>
  <div>

    <router-view></router-view> 
    
    <!-- Daftar fitur khusus untuk Admin -->
    <ul>
      <div v-if="currentComponent === 'dashboardAdmin'">
      <div class="component-container">
        <dashboardAdmin />
      </div>
    </div>

      <div v-if="currentComponent === 'master-data'">
      <div class="component-container">
        <masterData />
      </div>
    </div>

    
      <div v-if="currentComponent === 'pengajuan-masuk'">
      <div class="component-container">
        <pengajuanMasuk />
      </div>
    </div>

      
      <div v-if="currentComponent === 'riwayat-pengajuan'">
      <div class="component-container">
        <riwayatPengajuan />
      </div>
    </div>

      
      <div v-if="currentComponent === 'unggah-berita'">
      <div class="component-container">
        <unggahBerita />
      </div>
    </div>

    <div v-if="currentComponent === 'riwayat-berita'">
      <div class="component-container">
        <riwayatBerita />
      </div>
    </div>

    <div v-if="currentComponent === 'sosial-infoAdmin'">
      <div class="component-container">
        <sosialInfoAdmin />
      </div>
    </div>

      <div v-if="currentComponent === 'lapor-masuk'">
      <div class="component-container">
        <laporMasuk />
      </div>
    </div>

    <div v-if="currentComponent === 'aset-desa'">
      <div class="component-container">
        <asetDesa />
      </div>
    </div>

    </ul>
  </div>
</template>

<script setup>
import masterData from "./masterData.vue";
import pengajuanMasuk from "./pengajuanMasuk.vue";
import riwayatPengajuan from "./riwayatPengajuan.vue";
import unggahBerita from "./unggahBerita.vue";
import riwayatBerita from "./riwayatBerita.vue";
import sosialInfoAdmin from "./sosialInfoAdmin.vue";
import laporMasuk from "./laporMasuk.vue";
import asetDesa from "./asetDesa.vue";
import dashboardAdmin from "./dashboardAdmin.vue";


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
