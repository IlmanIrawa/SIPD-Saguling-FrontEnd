<template>
  <div class="container">
    <div class="konten-wrapper">
      <div class="gambar">
        <img src="@/assets/img/saguling.jpg" alt="Logo" class="logo-img" />
      </div>
      <div class="isi">
        <h3>🏡 SEJARAH SINGKAT DESA SAGULING</h3>
        <hr>
        <strong>
          <i><p>
            Desa Saguling secara resmi berdiri pada tahun 1986 sebagai hasil dari pemekaran Desa Jati, yang saat itu wilayahnya masih sangat luas dan sulit dijangkau secara administratif. Pemekaran ini dilakukan dalam rangka meningkatkan efektivitas pelayanan kepada masyarakat serta mempercepat pembangunan di wilayah setempat.
            Terletak di Kecamatan Saguling, Kabupaten Bandung Barat, Desa Saguling memiliki peranan penting dalam mendukung pembangunan wilayah terutama karena letaknya yang strategis di sekitar kawasan PLTA Saguling. Seiring waktu, desa ini berkembang menjadi wilayah yang aktif dalam pembangunan sosial, ekonomi, dan budaya, serta memiliki potensi besar dalam sektor pertanian, perikanan, dan pariwisata alam.
          </p></i>
        </strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: #b7c6d4;
  padding: 20px 0;
  width: 100%;
}

.konten-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  flex-wrap: wrap;
}

.gambar {
  flex: 1;
  max-width: 500px;
  background-color: white;
  border-radius: 20px;
}

.logo-img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.isi {
  flex: 2;
  max-width: 600px;
}

@media (max-width: 768px) {
  .konten-wrapper {
    flex-direction: column;
    text-align: center;
  }

  .isi {
    margin-top: 5px;
  }
}

img{
    border-radius: 20px;
}
</style>
