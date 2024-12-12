import { createRouter, createWebHistory } from 'vue-router';

// Import komponen halaman
import student from '../components/student.vue';
import pelajaran from '../components/pelajaran.vue';

const routes = [
  { path: '/student', component: student, name: 'Student' },
  { path: '/pelajaran', component: pelajaran, name: 'Pelajaran'}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;