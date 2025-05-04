<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h3 class="fw-bold text-primary">Struktur Organisasi Pemerintah Desa Saguling</h3>
      <div class="text-secondary">
        <div>Kecamatan Saguling, Kabupaten Bandung Barat</div>
        <div>Periode 2019 - 2027</div>
      </div>
    </div>

    <hr class="mb-5"/>

    <!-- Kepala Desa -->
    <div class="row justify-content-center mb-5">
      <div class="col-md-4 text-center p-4 bg-gradient rounded-4 shadow-lg bg-primary text-white">
        <div class="mb-3 rounded-circle bg-light text-primary d-flex align-items-center justify-content-center" style="width: 100px; height: 100px;">
          <i class="bi bi-person-fill fs-1"></i>
        </div>
        <h5 class="fw-bold mb-0">Lia Mutiara, S.Pd.</h5>
        <div class="fst-italic">KEPALA DESA</div>
      </div>
    </div>

    <!-- Sekdes & Kaur -->
    <div class="row justify-content-center mb-5">
      <template v-for="(item, index) in [
        { name: 'Hamumih Anwar', role: 'KAUR KEUANGAN' },
        { name: 'Ade Satria Ependi, S.Pd.I', role: 'SEKRETARIS DESA' },
        { name: 'Dedi Suherman, S.Pd.I', role: 'KAUR PERENCANAAN' }
      ]" :key="index">
        <div class="col-md-3 text-center p-3 m-2 bg-light rounded-3 shadow-sm border">
          <div class="mb-3 rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
            <i class="bi bi-person fs-3"></i>
          </div>
          <div class="fw-semibold">{{ item.name }}</div>
          <div class="text-muted">{{ item.role }}</div>
        </div>
      </template>
    </div>

    <!-- Kasi -->
    <div class="row justify-content-center mb-5">
      <template v-for="(item, index) in [
        { name: 'Elan Soni Priatna', role: 'KASI PEMERINTAHAN' },
        { name: 'Asep Suhendra, S.Pd.', role: 'KASI KESEJAHTERAAN' },
        { name: 'Fitri Lutfiani Susan', role: 'KASI PELAYANAN' }
      ]" :key="index">
        <div class="col-md-3 text-center p-3 m-2 bg-white rounded-3 shadow-sm border">
          <div class="mb-3 rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
            <i class="bi bi-person fs-3"></i>
          </div>
          <div class="fw-semibold">{{ item.name }}</div>
          <div class="text-muted">{{ item.role }}</div>
        </div>
      </template>
    </div>

    <!-- KAUR TU -->
    <div class="row justify-content-center mb-5">
      <div class="col-md-4 text-center p-4 bg-info-subtle rounded-3 shadow-sm border">
        <div class="mb-3 rounded-circle bg-info text-white d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
          <i class="bi bi-person fs-3"></i>
        </div>
        <div class="fw-semibold">Astyar Supendi, S.Pd.</div>
        <div class="text-muted">KAUR TU DAN UMUM</div>
      </div>
    </div>

    <!-- Kepala Dusun -->
    <h4 class="text-center text-success mb-4">Kepala Dusun</h4>
    <div class="row justify-content-center">
      <template v-for="(item, index) in [
        { name: 'Ecep Izar Nugraha', role: 'KEPALA DUSUN I' },
        { name: 'Deni Herman', role: 'KEPALA DUSUN II' },
        { name: 'Yoga Syafriz Hidayat', role: 'KEPALA DUSUN III' },
        { name: 'Muli Rahmat', role: 'KEPALA DUSUN IV' }
      ]" :key="index">
        <div class="col-md-3 text-center p-3 m-2 bg-success-subtle rounded-3 shadow-sm border">
          <div class="mb-3 rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
            <i class="bi bi-person fs-3"></i>
          </div>
          <div class="fw-semibold">{{ item.name }}</div>
          <div class="text-muted">{{ item.role }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
// Kosong karena tidak diperlukan logic JS
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #007bff, #6610f2);
}
</style>
