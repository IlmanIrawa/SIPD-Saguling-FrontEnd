<template>
  <h1 class="fw-bold text-success">DEMOGRAFI PENDUDUK</h1>
  <hr>
  <section class="container">
    <!-- Menambahkan row sebagai pembungkus untuk grid -->
    <div class="row">
      <div class="col-md-6">
        <i><p>
          Memberikan informasi lengkap mengenai karakteristik demografi
          penduduk suatu wilayah. Mulai dari jumlah penduduk, usia, jenis
          kelamin, tingkat pendidikan, pekerjaan, agama, dan aspek penting
          lainnya yang menggambarkan komposisi populasi secara rinci.
        </p></i>
      </div>
      <div class="col-md-6 text-center">
        <img
          src="@/assets/img/penduduk.png"
          alt="Ilustrasi APB Desa"
          class="img-fluid"
          style="max-width: 400px; height: auto;"
        />
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
/* Menambahkan sedikit margin atau padding jika diperlukan */
.container {
  margin-top: 30px;
}

.row {
  margin-left: 0;
  margin-right: 0;
}

.col-md-6 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-center img {
  max-width: 100%;
  height: auto;
}
h1{
    text-align: center;
}
</style>
