<template>
  <div>
    <!-- Hero -->
    <div class="bg-surface border-b border-border px-8 py-10">
      <div class="max-w-7xl mx-auto flex items-end justify-between">
        <div>
          <p class="text-xs font-semibold tracking-widest uppercase text-brand mb-3">Internal Portal</p>
          <h1 class="font-heading font-800 text-3xl text-ink leading-tight mb-2">ICS TravelGroup Portal</h1>
          <p class="text-sm text-ink3 max-w-md leading-relaxed">
            Central hub for company files, announcements, SOPs, and internal resources across all countries.
          </p>
        </div>
        <div class="flex gap-6 text-right">
          <div>
            <p class="text-2xl font-heading font-700 text-ink">3</p>
            <p class="text-xs text-ink3 mt-0.5">Countries</p>
          </div>
          <div class="w-px bg-border"></div>
          <div>
            <p class="text-2xl font-heading font-700 text-ink">{{ announcements.length }}</p>
            <p class="text-xs text-ink3 mt-0.5">Announcements</p>
          </div>
          <div class="w-px bg-border"></div>
          <div>
            <p class="text-2xl font-heading font-700 text-ink">91</p>
            <p class="text-xs text-ink3 mt-0.5">Total Files</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-8 py-8 grid grid-cols-3 gap-8">
      <div class="col-span-2 space-y-8">

        <!-- Quick Access -->
        <div>
          <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-4">Quick Access</p>
          <div class="grid grid-cols-4 gap-3">
            <router-link
              v-for="item in quickLinks"
              :key="item.path"
              :to="item.path"
              class="bg-surface border border-border rounded-lg p-4 text-center hover:border-brand hover:bg-brand-pale transition-all group"
            >
              <p class="text-xs font-semibold text-ink2 group-hover:text-brand transition-colors">{{ item.label }}</p>
            </router-link>
          </div>
        </div>

        <!-- Latest Announcements -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <p class="text-xs font-semibold tracking-widest uppercase text-ink3">Latest Announcements</p>
            <router-link to="/announcements" class="text-xs text-brand font-semibold hover:underline">View all</router-link>
          </div>
          <div class="space-y-3">
            <div
              v-for="ann in announcements.slice(0, 3)"
              :key="ann.id"
              class="bg-surface border border-border rounded-lg p-4 hover:border-brand transition-all cursor-pointer"
              @click="$router.push('/announcements')"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <span :class="['text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded mb-2 inline-block', categoryTag(ann.category)]">
                    {{ ann.category }}
                  </span>
                  <p class="font-heading font-600 text-sm text-ink">{{ ann.title }}</p>
                  <p class="text-xs text-ink3 mt-1">{{ ann.postedBy }} · {{ formatDate(ann.date) }}</p>
                </div>
                <span class="text-xs text-ink3 whitespace-nowrap mt-1">{{ ann.country }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Sidebar -->
      <div class="space-y-6">

        <!-- Country Access -->
        <div class="bg-surface border border-border rounded-lg p-5">
          <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-4">Country File Access</p>
          <div class="space-y-1">
            <div
              v-for="country in countries"
              :key="country.code"
              class="flex items-center justify-between py-2.5 border-b border-border last:border-0 cursor-pointer hover:text-brand transition-colors group"
              @click="$router.push('/files')"
            >
              <div>
                <p class="text-sm font-semibold text-ink group-hover:text-brand transition-colors">{{ country.name }}</p>
                <p class="text-xs text-ink3">{{ country.sub }}</p>
              </div>
              <span class="text-xs bg-subtle text-ink3 px-2 py-0.5 rounded font-medium">{{ country.fileCount }} files</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-surface border border-border rounded-lg p-5">
          <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-4">Recent Activity</p>
          <div class="space-y-3">
            <div v-for="act in activity" :key="act.id" class="flex gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 flex-shrink-0"></div>
              <div>
                <p class="text-xs text-ink2 leading-relaxed">{{ act.text }}</p>
                <p class="text-xs text-ink3 mt-0.5">{{ act.time }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import announcementsData from '../data/announcements.json'

const announcements = ref(
  JSON.parse(localStorage.getItem('announcements') || JSON.stringify(announcementsData))
)

const quickLinks = [
  { path: '/files', label: 'File Library' },
  { path: '/sops', label: 'SOPs' },
  { path: '/gallery', label: 'Brand Assets' },
  { path: '/it-guide', label: 'IT Guide' },
  { path: '/sales', label: 'Sales Materials' },
  { path: '/products', label: 'Product Catalog' },
  { path: '/gallery', label: 'Image Gallery' },
  { path: '/announcements', label: 'Announcements' },
]

const countries = [
  { code: 'ID', name: 'Indonesia', sub: 'ICS HQ · Bali', fileCount: 42 },
  { code: 'VN', name: 'Vietnam', sub: 'JD Tours Vietnam', fileCount: 31 },
  { code: 'CORE', name: 'ICS Core', sub: 'Global · All Countries', fileCount: 18 },
]

const activity = [
  { id: 1, text: 'Brand Guidelines 2026 uploaded to ICS Core', time: '2 hours ago · Susu' },
  { id: 2, text: 'Vietnam / Contracts folder updated', time: 'Yesterday · Julien' },
  { id: 3, text: 'IT System Guide v2 published', time: 'May 3 · Yoga' },
]

const categoryTag = (cat) => ({
  Company: 'bg-brand-pale text-brand',
  Operations: 'bg-blue-50 text-blue-600',
  HR: 'bg-green-50 text-green-600',
  IT: 'bg-subtle text-ink3',
}[cat] || 'bg-subtle text-ink3')

const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>
