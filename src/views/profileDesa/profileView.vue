<template>
  <div>

    <router-view></router-view> 
    
    <!-- Daftar fitur khusus untuk Profile -->
    <ul>
      <div v-if="currentComponent === 'cekBansos'">
      <div class="component-container">
        <cekBansos />
      </div>
    </div>

    <div v-if="currentComponent === 'beritaDesa'">
      <div class="component-container">
        <beritaDesa />
      </div>
    </div>
    
    <div v-if="currentComponent === 'visiMisi'">
      <div class="component-container">
        <visiMisi />
      </div>
    </div>

    <div v-if="currentComponent === 'inforgafis'">
      <div class="component-container">
        <infografisDesa />
      </div>
    </div>
      
    </ul>
  </div>
</template>

<script setup>
import cekBansos from "./cekBansos.vue";
import beritaDesa from "./beritaDesa.vue"
import visiMisi from "./visiMisi.vue"
import infografisDesa from "./infografisDesa.vue"

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
