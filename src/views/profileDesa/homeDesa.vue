<template>
  <header :class="{ 'scrolled': isScrolled }">
    <Header />
  </header>

  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/img/PLTA3.jpg" class="d-block w-100" alt="/">
        <div class="carousel-caption">
          <h1>Selamat Datang</h1>
          <h2 class="nowrap-text">Website Resmi Desa Saguling</h2>
          <p class="nowrap-text">Sumber informasi terbaru tentang pemerintahan di Desa Saguling</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/PLTA3.jpg" class="d-block w-100" alt="/">
        <div class="carousel-caption">
          <h1>Selamat Datang</h1>
          <h2 class="nowrap-text">Website Resmi Desa Saguling</h2>
          <p class="nowrap-text">Sumber informasi terbaru tentang pemerintahan di Desa Saguling</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/PLTA3.jpg" class="d-block w-100" alt="/">
        <div class="carousel-caption">
          <h1>Selamat Datang</h1>
          <h2 class="nowrap-text">Website Resmi Desa Saguling</h2>
          <p class="nowrap-text">Sumber informasi terbaru tentang pemerintahan di Desa Saguling</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/PLTA3.jpg" class="d-block w-100" alt="/">
        <div class="carousel-caption">
          <h1>Selamat Datang</h1>
          <h2 class="nowrap-text">Website Resmi Desa Saguling</h2>
          <p class="nowrap-text">Sumber informasi terbaru tentang pemerintahan di Desa Saguling</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <!-- sambutan kepala desa -->
  <div class="sambutan">
    <sambutanKades/>
  </div>
  <!-- Potensi Desa -->
  <div class="potensi">
    <potensiDesa/>
  </div>
  <!-- statistik administrasi -->
  <div class="statistik">
    <statistikAdm/>
  </div>
   <!-- APBD  -->
  <div class="apbd">
    <apbdInfo/>
  </div>
  <!-- Galerry Desa -->
  <div class="galerry">
    <galeryDesa/>
  </div>
   <!-- Kontak  -->
  <div class="kontak">
    <kontakDesa/>
  </div>
  <Footer/>
  <router-view />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useUIStore } from "@/store/uiStore";
import Header from "@/examples/PageLayout/header.vue";
import Footer from "@/examples/PageLayout/Footer.vue";
import sambutanKades from "@/examples/PageLayout/sambutanKades.vue";
import potensiDesa from "@/examples/PageLayout/potensiDesa.vue";
import statistikAdm from "@/examples/PageLayout/statistikAdm.vue";
import apbdInfo from "@/examples/PageLayout/apbdInfo.vue";
import kontakDesa from "@/examples/PageLayout/kontakDesa.vue";
import galeryDesa from "@/examples/PageLayout/galeryDesa.vue";


const uiStore = useUIStore();
uiStore.layout = "homeDesa";

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Gaya header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  transition: background-color 0.3s ease-in-out;
  z-index: 1000;
}

/* Header transparan saat awal */
header:not(.scrolled) {
  background-color: transparent;
}

/* Header berubah saat scroll */
header.scrolled {
  background-color: rgb(37, 37, 37);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Carousel full-screen */
#carouselExample {
  width: 100%;
  height: 100vh;
  margin: 0;
  position: relative;
}

/* Gaya teks di tengah carousel */
.carousel-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Efek bayangan untuk meningkatkan keterbacaan */
}

.carousel-caption h1 {
  font-size: 3rem;
  font-weight: bold;
}

.carousel-caption h2 {
  font-size: 2rem;
  margin-top: 10px;
}

/* Agar teks tetap dalam satu baris */
.nowrap-text {
  white-space: nowrap;
  max-width: 90vw;
  font-size: 1.6rem;
}

h1, h2, p {
  color: white;
}
.sambutan{
  background-color: white;
  margin-top: 170px;
  width: 100%;
  padding: 20px;
  
}

.potensi{
  margin-bottom: 50px;
}
.statistik{
  width: 100%;
  margin-bottom: 50px;
}
.apbd{
  margin-top: 50px;
}
.galerry{
  margin: 50px;
  border-radius: 20px;
}
</style>
