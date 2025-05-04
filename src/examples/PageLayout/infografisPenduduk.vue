<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-green-800 mb-6">Jumlah Penduduk dan Kepala Keluarga</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="item in dataCards" :key="item.title" class="flex items-center bg-white shadow rounded-lg p-4">
        <img :src="item.icon" alt="icon" class="w-20 h-20 mr-4" />
        <div>
          <h3 class="text-sm text-gray-500 font-semibold uppercase">{{ item.title }}</h3>
          <p class="text-2xl text-green-700 font-bold">{{ item.value }} <span class="text-gray-700 text-lg font-normal">Jiwa</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardPenduduk",
  data() {
    return {
      dataCards: [
        {
          title: "Total Penduduk",
          value: "4.635",
          //icon: new URL('@/assets/total-penduduk.png', import.meta.url).href
        },
        {
          title: "Kepala Keluarga",
          value: "1.618",
          //icon: new URL('@/assets/kepala-keluarga.png', import.meta.url).href
        },
        {
          title: "Perempuan",
          value: "2.335",
          //icon: new URL('@/assets/perempuan.png', import.meta.url).href
        },
        {
          title: "Laki-Laki",
          value: "2.300",
          //icon: new URL('@/assets/laki-laki.png', import.meta.url).href
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
