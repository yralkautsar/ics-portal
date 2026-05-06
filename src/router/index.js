import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import FileLibrary from '../pages/FileLibrary.vue'
import Announcements from '../pages/Announcements.vue'
import ITGuide from '../pages/ITGuide.vue'
import SOPs from '../pages/SOPs.vue'
import ProductCatalog from '../pages/ProductCatalog.vue'
import SalesMaterials from '../pages/SalesMaterials.vue'
import ImageGallery from '../pages/ImageGallery.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/files', component: FileLibrary },
  { path: '/announcements', component: Announcements },
  { path: '/it-guide', component: ITGuide },
  { path: '/sops', component: SOPs },
  { path: '/products', component: ProductCatalog },
  { path: '/sales', component: SalesMaterials },
  { path: '/gallery', component: ImageGallery },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
