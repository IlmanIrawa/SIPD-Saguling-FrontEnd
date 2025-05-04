<template>
  <div class="gallery-section">
    <div class="header">
      <h1 class="title">Galeri Foto Desa</h1>
      <p class="subtitle">Potret keindahan dan aktivitas warga di Desa Saguling</p>
    </div>

    <div class="gallery-row left-scroll">
      <div class="image-track">
        <img
          v-for="(img, i) in images.slice(0, 5)"
          :key="'row1-' + i"
          :src="img"
          alt="Foto Desa"
        />
      </div>
    </div>

    <div class="gallery-row right-scroll">
      <div class="image-track">
        <img
          v-for="(img, i) in images.slice(5, 10)"
          :key="'row2-' + i"
          :src="img"
          alt="Foto Desa"
        />
      </div>
    </div>

    <div class="gallery-row left-scroll">
      <div class="image-track">
        <img
          v-for="(img, i) in images.slice(10, 15)"
          :key="'row3-' + i"
          :src="img"
          alt="Foto Desa"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GaleriDesa",
  data() {
    return {
      images: [
        require('@/assets/img/lokal/foto1.jpg'),
        require('@/assets/img/lokal/foto2.jpg'),
        require('@/assets/img/lokal/foto3.jpg'),
        require('@/assets/img/lokal/foto4.jpg'),
        require('@/assets/img/lokal/foto5.jpg'),
        require('@/assets/img/lokal/foto6.jpg'),
        require('@/assets/img/lokal/foto7.webp'),
        require('@/assets/img/lokal/foto8.jpeg'),
        require('@/assets/img/lokal/foto9.jpeg'),
        require('@/assets/img/lokal/foto10.jpeg'),
        require('@/assets/img/lokal/foto11.jpeg'),
        require('@/assets/img/lokal/foto12.jpeg'),
        require('@/assets/img/lokal/foto13.jpeg'),
        require('@/assets/img/lokal/foto14.jpeg'),
        require('@/assets/img/lokal/foto15.jpeg'),
      ]
    }
  }
}
</script>

<style scoped>
.gallery-section {
  background: linear-gradient(to bottom right, #f0f8ff, #e6f2ff);
  padding: 50px 20px;
  text-align: center;
  border-radius: 20px;
}

.header {
  margin-bottom: 40px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
}

.gallery-row {
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 30px;
  position: relative;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.image-track {
  display: inline-block;
  animation: scroll-left 30s linear infinite;
}

.gallery-row.right-scroll .image-track {
  animation: scroll-right 30s linear infinite;
}

.image-track img {
  display: inline-block;
  margin: 0 10px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.image-track img:hover {
  transform: scale(1.05);
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
