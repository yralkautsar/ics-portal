<template>
  <div>

    <!-- Welcome -->
    <div class="bg-white border-b border-gray-100 px-8 py-10">
      <div class="max-w-7xl mx-auto">
        <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-3">
          ICS TravelGroup · Internal Portal · {{ today }}
        </p>
        <h1 class="font-heading font-800 text-3xl text-ink leading-tight mb-2">
          Welcome back, Yoga.
        </h1>
        <p class="text-sm text-ink3 max-w-lg leading-relaxed">
          Here's what's happening across the company.
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-8 py-8 grid grid-cols-3 gap-8">

      <!-- Main: Announcements Feed -->
      <div class="col-span-2">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xs font-semibold tracking-widest uppercase text-ink3">Announcements</p>
          <router-link
            to="/announcements"
            class="text-xs text-ink3 hover:text-ink font-medium hover:underline"
          >
            Add new
          </router-link>
        </div>

        <!-- Filter -->
        <div class="flex gap-2 mb-5">
          <button
            v-for="cat in ['All', 'Company', 'Operations', 'HR', 'IT']"
            :key="cat"
            @click="filter = cat"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              filter === cat
                ? 'bg-ink text-white'
                : 'bg-white text-ink2 border border-gray-100 hover:border-gray-300'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="ann in filtered"
            :key="ann.id"
            class="bg-white border border-gray-100 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
            @click="$router.push('/announcements')"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <span :class="['text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded mb-2 inline-block', categoryTag(ann.category)]">
                  {{ ann.category }}
                </span>
                <p class="font-heading font-600 text-sm text-ink">{{ ann.title }}</p>
                <p class="text-sm text-ink3 mt-1 leading-relaxed">{{ ann.summary }}</p>
                <p class="text-xs text-ink3 mt-2">{{ ann.postedBy }} · {{ formatDate(ann.date) }}</p>
              </div>
              <span class="text-xs text-ink3 whitespace-nowrap mt-1">{{ ann.country }}</span>
            </div>
          </div>

          <div v-if="filtered.length === 0" class="bg-white border border-gray-100 rounded-lg p-10 text-center">
            <p class="text-sm text-ink3">No announcements found.</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">

        <!-- Country Access -->
        <div class="bg-white border border-gray-100 rounded-lg p-5">
          <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-4">Country File Access</p>
          <div class="space-y-1">
            <div
              v-for="country in countries"
              :key="country.code"
              class="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 cursor-pointer group"
              @click="$router.push('/files')"
            >
              <div>
                <p class="text-sm font-semibold text-ink2 group-hover:text-ink transition-colors">{{ country.name }}</p>
                <p class="text-xs text-ink3">{{ country.sub }}</p>
              </div>
              <span class="text-xs bg-gray-50 text-ink3 px-2 py-0.5 rounded font-medium">{{ country.fileCount }} files</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white border border-gray-100 rounded-lg p-5">
          <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-4">Recent Activity</p>
          <div class="space-y-3">
            <div v-for="act in activity" :key="act.id" class="flex gap-3">
              <div class="w-1 h-1 rounded-full bg-ink3 mt-2 flex-shrink-0"></div>
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
import { ref, computed } from 'vue'
import announcementsData from '../data/announcements.json'

const announcements = ref(
  JSON.parse(localStorage.getItem('announcements') || JSON.stringify(announcementsData))
)

const filter = ref('All')

const filtered = computed(() =>
  filter.value === 'All'
    ? announcements.value
    : announcements.value.filter(a => a.category === filter.value)
)

/* Today's date — editorial format */
const today = new Date().toLocaleDateString('en-GB', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
})

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
  Company: 'bg-gray-100 text-ink2',
  Operations: 'bg-blue-50 text-blue-600',
  HR: 'bg-green-50 text-green-600',
  IT: 'bg-gray-100 text-ink3',
}[cat] || 'bg-gray-100 text-ink3')

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>