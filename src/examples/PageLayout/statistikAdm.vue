<template>
  <section class="p-4 bg-white rounded shadow">
    <!-- Judul -->
    <div class="text-center mb-4">
      <h2 class="fw-bold text-success">Administrasi Penduduk</h2>
      <p class="text-muted">
        Sistem digital yang berfungsi mempermudah pengelolaan data dan informasi terkait dengan kependudukan
        dan pendayagunaannya untuk pelayanan publik yang efektif dan efisien
      </p>
    </div>

    <!-- Grid Data Penduduk -->
    <div class="row gy-3">
      <!-- Baris 1 -->
      <div class="col-md-6">
        <div class="d-flex align-items-center p-3 rounded shadow-sm bg-success text-white">
          <div class="me-auto fs-3 fw-bold">4.635</div>
          <div class="text-end">Penduduk</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex align-items-center p-3 rounded shadow-sm bg-success text-white">
          <div class="me-auto fs-3 fw-bold">2.300</div>
          <div class="text-end">Laki-Laki</div>
        </div>
      </div>

      <!-- Baris 2 -->
      <div class="col-md-6">
        <div class="d-flex align-items-center p-3 rounded shadow-sm bg-success text-white">
          <div class="me-auto fs-3 fw-bold">1.618</div>
          <div class="text-end">Kepala Keluarga</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex align-items-center p-3 rounded shadow-sm bg-success text-white">
          <div class="me-auto fs-3 fw-bold">2.335</div>
          <div class="text-end">Perempuan</div>
        </div>
      </div>

      <!-- Baris 3 -->
      <div class="col-md-6">
        <div class="d-flex align-items-center p-3 rounded shadow-sm bg-success text-white">
          <div class="me-auto fs-3 fw-bold">0</div>
          <div class="text-end">Penduduk Sementara</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex align-items-center p-3 rounded shadow-sm bg-success text-white">
          <div class="me-auto fs-3 fw-bold">0</div>
          <div class="text-end">Mutasi Penduduk</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Tidak perlu logic tambahan untuk versi statis ini
</script>

<style scoped>
section {
  max-width: 1200px;
  margin: auto;
  border-radius: 20px;
}
</style>
