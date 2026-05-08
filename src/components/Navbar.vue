<template>
  <nav class="bg-surface border-b border-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">

      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-3">
          <div class="w-7 h-7 bg-brand rounded flex items-center justify-center">
            <span class="text-white text-xs font-heading font-700">ICS</span>
          </div>
          <span class="font-heading font-700 text-sm text-ink tracking-tight">TravelGroup Portal</span>
        </router-link>

        <div class="w-px h-5 bg-border"></div>

        <div class="flex gap-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-xs font-medium px-3 py-1.5 rounded-md transition-colors text-ink3 hover:text-ink hover:bg-subtle"
            active-class="!text-brand !bg-brand-pale font-semibold"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full bg-brand flex items-center justify-center">
          <span class="text-white text-xs font-heading font-semibold">YR</span>
        </div>
        <span class="text-xs font-medium text-ink2">Yoga · ID</span>
      </div>

    </div>
    <!-- Orange accent line -->
    <div class="h-0.5 bg-brand"></div>
  </nav>
</template>

<script setup>
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/files', label: 'File Library' },
  { path: '/announcements', label: 'Announcements' },
  { path: '/sops', label: 'SOPs' },
  { path: '/it-guide', label: 'IT Guide' },
  { path: '/products', label: 'Product Catalog' },
  { path: '/sales', label: 'Sales Materials' },
  { path: '/org', label: 'Structure' },
  { path: '/gallery', label: 'Image Gallery' },
]
</script>
