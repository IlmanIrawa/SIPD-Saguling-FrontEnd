<template>
  <section class="profil-desa-section">
    <div class="profil-wrapper">
      <!-- Video -->
      <div class="video-container">
        <iframe
          :src="youtubeEmbed"
          title="Profil Desa Saguling"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Teks -->
      <div class="kata-kata">
        <h3 class="judul">🏛️ PROFILE DESA SAGULING</h3>
        <hr>
        <i><p class="deskripsi">
          Saksikan keindahan dan potensi Desa Saguling melalui video profil ini. Temukan bagaimana desa kami tumbuh dengan semangat gotong royong, memanfaatkan sumber daya lokal untuk membangun masa depan yang lebih baik dan berkelanjutan.
        </p></i>
      </div>
    </div>
  </section>
</template>

<script setup>
const youtubeEmbed = "https://www.youtube.com/embed/gjExpiFYjmE";
</script>

<style scoped>
.profil-desa-section {
  width: 100%;
  padding: 60px 20px;
  background: linear-gradient(145deg, #f0f4f8, #d9e2ec);
}

.profil-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  height: 450px;
}

.video-container {
  flex: 1;
  min-width: 300px;
  aspect-ratio: 16 / 9;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.video-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.kata-kata {
  flex: 1;
  min-width: 300px;
}

.judul {
  font-size: 2rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 1rem;
}

.deskripsi {
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
}
</style>
