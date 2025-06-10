<template>
  <div class="background-blur"></div>
  <header :class="{ scrolled: isScrolled }">
    <Header />
  </header>
  <div class="container mt-4 pt-5">
    <!-- Visi dan Misi 
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
      <div class="card p-5 shadow-lg bg-white rounded-xl">
        <h2 class="text-xl font-bold mb-3">Visi</h2>
        <hr />
        <p class="text-gray-700">
          “Mewujudkan Desa Saguling yang Mandiri, Sejahtera, dan Berkelanjutan
          Berbasis Potensi Lokal dan Teknologi.”
        </p>
      </div>
      <div class="card p-5 shadow-lg bg-white rounded-xl">
        <h2 class="text-xl font-bold mb-3">Misi</h2>
        <hr />
        <ul class="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            Meningkatkan kualitas pelayanan publik yang transparan dan
            akuntabel.
          </li>
          <li>
            Memberdayakan masyarakat melalui pelatihan dan pendidikan berbasis
            potensi lokal.
          </li>
          <li>Mendorong pengelolaan sumber daya alam yang berkelanjutan.</li>
          <li>Memanfaatkan teknologi informasi dalam pembangunan desa.</li>
        </ul>
      </div>
    </div>
     -->
  </div>
 
  <!-- struktur organisasi -->
  <div class="struktur">
    <strukturOrganisasi/>
  </div>
  <!-- profile desa -->
  <div class="yt" data-aos="fade-up">
    <profile />
  </div>
  <!-- sejarah singkat desa -->
  <div class="sejarah" data-aos="fade-up">
    <sejarahDesa />
  </div>
  <!-- peta lokasi -->
  <div class="lokasi" data-aos="fade-up">
    <petaLokasi/>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useUIStore } from "@/store/uiStore";
import Header from "@/examples/PageLayout/header.vue";
import Footer from "@/examples/PageLayout/Footer.vue";
import sejarahDesa from "@/examples/PageLayout/sejarahDesa.vue";
import profile from "@/examples/PageLayout/profile.vue";
import petaLokasi from "@/examples/PageLayout/petaLokasi.vue";
import strukturOrganisasi from "@/examples/PageLayout/strukturOrganisasi.vue";
import AOS from 'aos';
import 'aos/dist/aos.css';

const uiStore = useUIStore();
uiStore.layout = "homeDesa";

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  AOS.init({
    duration: 1000,})
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
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

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.background-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url("@/assets/img/bg-profile.jpg") no-repeat center center/cover;
  z-index: -1;
  filter: blur(40px);
}

.card {
  background: white;
}

.sejarah {
  width: 100%;
  background: #b7c6d4;
}
.yt {
  background-color: white;
}
.struktur{
    background-color: white;
}
</style>
