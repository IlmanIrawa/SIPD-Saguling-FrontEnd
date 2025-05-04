<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Pengajuan"
              value="2"
              :description="`<span class='text-sm font-weight-bolder text-success'>Administrasi</span>`"
              :icon="{
                component: 'ni ni',
                background: 'bg-gradient-primary',
                shape: 'rounded-circle'
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Waiting List"
              value="2"
              :description="`<span class='text-sm font-weight-bolder text-success'>Menunggu</span>`"
              :icon="{
                component: 'ni ni',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle'
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Laporan"
              value="3"
              :description="`<span class='text-sm font-weight-bolder text-success'>Lapor</span>`"
              :icon="{
                component: 'ni ni',
                background: 'bg-gradient-success',
                shape: 'rounded-circle'
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Total Pengajuan"
              value="10"
              :description="`<span class='text-sm font-weight-bolder text-success'>Pengajuan</span>`"
              :icon="{
                component: 'ni ni',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle'
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart
                id="chart-line"
                title="Grafik Pengajuan"
                :description="`<i class='fa fa-arrow-up text-success'></i>
                <span class='font-weight-bold'>4% more</span> in 2024`"
                :chart="{
                  labels: [
                    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                  ],
                  datasets: [
                    {
                      label: 'Pengajuan',
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500]
                    }
                  ]
                }"
              />
            </div>
          </div>
          <div class="col-lg-5">
            <carousel />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

