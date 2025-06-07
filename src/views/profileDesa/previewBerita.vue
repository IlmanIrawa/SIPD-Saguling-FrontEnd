<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <h1 class="text-2xl font-bold mb-4 text-center">{{ berita.judul }}</h1>
    
    <img
      v-if="berita.gambar"
      :src="berita.gambar"
      alt="Gambar Berita"
      class="w-full h-auto object-cover rounded shadow mb-6"
    />

    <div class="prose prose-lg max-w-none" v-html="berita.isi"></div>
  </div>
</template>

<script>
export default {
  name: "PreviewBerita",
  data() {
    return {
      berita: {
        judul: "",
        gambar: "",
        isi: ""
      },
      loading: true,
      error: null
    };
  },
  async mounted() {
    const beritaId = this.$route.params.beritaid;
    if (!beritaId) {
      this.$router.push('/');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/berita/${beritaId}`);
      const data = await response.json();
      this.berita = {
        judul: data.judul,
        gambar: data.gambar,
        isi: data.isiBerita
      };
    } catch (err) {
      console.error("Gagal memuat data:", err);
      this.error = "Berita tidak ditemukan.";
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.prose img {
  max-width: 100%;
  height: auto;
}
</style>
