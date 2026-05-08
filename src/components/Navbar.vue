<template>
  <nav class="bg-surface border-b border-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">

      <div class="flex items-center gap-8">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3">
          <div class="w-7 h-7 bg-brand rounded flex items-center justify-center">
            <span class="text-white text-xs font-heading font-700">ICS</span>
          </div>
          <span class="font-heading font-700 text-sm text-ink tracking-tight">TravelGroup Portal</span>
        </router-link>

        <div class="w-px h-5 bg-border"></div>

        <!-- Nav groups -->
        <div class="flex items-center gap-1">

          <!-- Single: Home -->
          <router-link
            to="/"
            class="text-xs font-medium px-3 py-1.5 rounded-md transition-colors text-ink3 hover:text-ink hover:bg-subtle"
            active-class="!text-brand !bg-brand-pale font-semibold"
          >
            Home
          </router-link>

          <!-- Dropdown groups -->
          <div
            v-for="group in groups"
            :key="group.label"
            class="relative"
            @mouseenter="openGroup = group.label"
            @mouseleave="openGroup = null"
          >
            <!-- Group trigger -->
            <button
              :class="[
                'flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md transition-colors',
                isGroupActive(group)
                  ? 'text-brand bg-brand-pale font-semibold'
                  : 'text-ink3 hover:text-ink hover:bg-subtle'
              ]"
            >
              {{ group.label }}
              <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown -->
            <div
              v-show="openGroup === group.label"
              class="absolute top-full left-0 mt-1 bg-surface border border-border rounded-lg shadow-lg py-1 min-w-44 z-50"
            >
              <router-link
                v-for="item in group.items"
                :key="item.path"
                :to="item.path"
                class="block px-4 py-2 text-xs font-medium text-ink2 hover:bg-subtle hover:text-ink transition-colors"
                active-class="!text-brand !bg-brand-pale font-semibold"
                @click="openGroup = null"
              >
                {{ item.label }}
              </router-link>
            </div>
          </div>

        </div>
      </div>

      <!-- User chip -->
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full bg-brand flex items-center justify-center">
          <span class="text-white text-xs font-heading font-semibold">YR</span>
        </div>
        <span class="text-xs font-medium text-ink2">Yoga · ID</span>
      </div>

    </div>
    <div class="h-0.5 bg-brand"></div>
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
      { path: '/org', label: 'Structure' },
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

/* Highlight group trigger if any child route is active */
const isGroupActive = (group) =>
  group.items.some(item => route.path === item.path)
</script>