<template>
  <nav class="bg-white border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">

      <div class="flex items-center gap-8">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3">
          <img src="/ics-logo.jpg" alt="ICS TravelGroup" class="h-8 w-8 object-cover rounded" />
          <span class="font-heading font-700 text-xs text-ink tracking-widest uppercase">Internal Portal</span>
        </router-link>

        <div class="w-px h-5 bg-gray-100"></div>

        <!-- Nav groups -->
        <div class="flex items-center gap-1">

          <router-link
            to="/"
            class="text-xs font-medium px-3 py-1.5 rounded-md transition-colors text-ink3 hover:text-ink"
            :class="{ 'text-ink font-semibold border-b-2 border-ink rounded-none': $route.path === '/' }"
          >
            Home
          </router-link>

          <div
            v-for="group in groups"
            :key="group.label"
            class="relative"
            @mouseenter="openGroup = group.label"
            @mouseleave="openGroup = null"
          >
            <button
              :class="[
                'flex items-center gap-1 text-xs font-medium px-3 py-1.5 transition-colors rounded-md',
                isGroupActive(group)
                  ? 'text-ink font-semibold'
                  : 'text-ink3 hover:text-ink'
              ]"
            >
              {{ group.label }}
              <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown -->
            <div
              v-show="openGroup === group.label"
              class="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-md py-1 min-w-44 z-50"
            >
              <router-link
                v-for="item in group.items"
                :key="item.path"
                :to="item.path"
                class="block px-4 py-2 text-xs font-medium text-ink2 hover:bg-gray-50 hover:text-ink transition-colors"
                @click="openGroup = null"
              >
                {{ item.label }}
              </router-link>
            </div>
          </div>

        </div>
      </div>

      <!-- User chip -->
      <div class="flex items-center gap-2 border border-gray-100 rounded-full px-3 py-1">
        <div class="w-5 h-5 rounded-full bg-ink flex items-center justify-center">
          <span class="text-white text-xs font-heading font-semibold" style="font-size:9px">YR</span>
        </div>
        <span class="text-xs font-medium text-ink2">Yoga · ID</span>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const openGroup = ref(null)

const groups = [
  {
    label: 'Company',
    items: [
      { path: '/announcements', label: 'Announcements' },
      { path: '/org', label: 'Org Structure' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { path: '/files', label: 'File Library' },
      { path: '/sops', label: 'SOPs' },
      { path: '/it-guide', label: 'IT Guide' },
    ],
  },
  {
    label: 'Sales',
    items: [
      { path: '/products', label: 'Product Catalog' },
      { path: '/sales', label: 'Sales Materials' },
      { path: '/gallery', label: 'Image Gallery' },
    ],
  },
]

const isGroupActive = (group) =>
  group.items.some(item => route.path === item.path)
</script>