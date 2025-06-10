import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ArgonDashboard from "./argon-dashboard";
import { createPinia } from 'pinia';

// Hanya diimpor, tidak perlu appInstance.use()
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const appInstance = createApp(App);

appInstance.use(createPinia());
appInstance.use(router);
appInstance.use(ArgonDashboard);

//Jangan gunakan .use() untuk jsPDF, autoTable, atau XLSX

appInstance.mount("#app");

export { jsPDF, autoTable, XLSX }; // Jika ingin diakses di seluruh aplikasi
