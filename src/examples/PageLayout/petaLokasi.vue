<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-100 rounded-lg shadow-lg">
    
    <!-- Keterangan Geografis (Card) -->
    <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h1 class="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-500 to-green-400 uppercase mb-2">
        PETA LOKASI DESA SAGULING
      </h1>
      <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full mx-auto mb-6"></div>

      <h2 class="text-xl font-semibold mb-4">Keterangan Geografis:</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-4">
        <div>
          <p><strong>Koordinat Geografis:</strong> Sekitar 6°53′27″ LS dan 107°22′2″ BT.</p>
          <p><strong>Ketinggian:</strong> Sekitar 643 mdpl.</p>
        </div>
        <div>
          <p><strong>Jalan Utama:</strong> Akses melalui Jl. Raya Batujajar & Cihampelas.</p>
        </div>
      </div>

      <hr class="my-3">
      <p><strong>Luas Desa:</strong> 0 km²</p>
      <hr class="my-3">
      <p><strong>Jumlah Penduduk:</strong> 4.635 jiwa</p>
    </div>

    <!-- Peta Lokasi -->
    <div class="bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
      <div id="map" class="h-80 w-full rounded-xl"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

let leafletMap = null

onMounted(() => {
  if (leafletMap) leafletMap.remove()

  leafletMap = L.map('map').setView([-6.8909892, 107.3671431], 14)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(leafletMap)

  L.marker([-6.8909892, 107.3671431])
    .addTo(leafletMap)
    .bindPopup('<b>Desa Saguling</b><br>Kecamatan Saguling, Bandung Barat')
    .openPopup()
})
</script>

<style scoped>
#map {
  height: 320px;
}
h1 {
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #2c3e50, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  padding-bottom: 0.5rem;
}

h1::after {
  content: "";
  display: block;
  width: 80px;
  height: 4px;
  margin: 0.5rem auto 0;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 2px;
}

</style>
