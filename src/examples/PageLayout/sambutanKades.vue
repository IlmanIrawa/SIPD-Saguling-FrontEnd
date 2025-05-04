<template>
  <section class="sambutan-container">
    <div class="sambutan-content">
      <div class="foto-kades">
        <img src="@/assets/img/kadess.jpeg" :alt="`Foto ${nama}`" />
      </div>
      <div class="teks-sambutan">
        <h2>Sambutan Kepala Desa</h2>
        <p class="nama-kades">Oleh: {{ nama }}</p>
        <blockquote>
          <p>{{ sambutan }}</p>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SambutanKepalaDesa',
  props: {
    nama: {
      type: String,
      default: 'Ibu Lia Mutiara, S.Pd.'
    },
    fotoUrl: {
      type: String,
      default: 'https://via.placeholder.com/200x250.png?text=Kepala+Desa'
    },
    sambutan: {
      type: String,
      default: 'Assalamu’alaikum Warahmatullahi Wabarakatuh. Puji syukur kita panjatkan ke hadirat Allah SWT, karena dengan rahmat dan karunia-Nya kita masih diberikan kesehatan dan kesempatan untuk terus berkarya demi kemajuan desa yang kita cintai ini. Sebagai Kepala Desa, saya mengucapkan terima kasih atas kepercayaan dan dukungan seluruh masyarakat dalam setiap program pembangunan yang telah dan akan kita jalankan bersama. Melalui website desa ini, kami berkomitmen untuk menghadirkan informasi yang terbuka, akurat, dan bermanfaat bagi seluruh warga. Mari kita tingkatkan semangat gotong royong, transparansi, serta partisipasi aktif dalam pembangunan desa agar tercipta lingkungan yang aman, sejahtera, dan berdaya saing. Wassalamu’alaikum Warahmatullahi Wabarakatuh.'
    }
  }
}
</script>

<style scoped>
.sambutan-container {
  background-color: #f9f9f9;
  padding: 40px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 60px;
}

.sambutan-content {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 24px;
}

.foto-kades img {
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  border: 3px solid #2c3e50;
}

.teks-sambutan {
  flex: 1;
}

.teks-sambutan h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.nama-kades {
  font-weight: bold;
  color: #34495e;
  margin-bottom: 20px;
}

blockquote {
  font-style: italic;
  color: #555;
  border-left: 4px solid #2c3e50;
  padding-left: 16px;
}
</style>
