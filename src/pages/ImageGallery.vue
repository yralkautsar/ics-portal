<template>
  <div class="max-w-6xl mx-auto px-8 py-8">
    <div class="mb-8">
      <h1 class="font-heading font-700 text-2xl text-ink">Image Gallery</h1>
      <p class="text-sm text-ink3 mt-1">Destination photos and marketing assets</p>
    </div>
    <div class="flex gap-2 mb-6">
      <button v-for="f in ['All', 'Indonesia', 'Vietnam']" :key="f" @click="filter = f"
        :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors', filter === f ? 'bg-brand text-white' : 'bg-surface text-ink2 border border-border hover:border-brand']">
        {{ f }}
      </button>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="img in filtered" :key="img.id" class="rounded-lg overflow-hidden border border-border hover:border-brand transition-all group cursor-pointer">
        <div :style="{ backgroundColor: img.color }" class="h-36 relative">
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <span class="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all">View</span>
          </div>
        </div>
        <div class="bg-surface p-3">
          <p class="text-xs font-heading font-600 text-ink">{{ img.name }}</p>
          <div class="flex gap-1 mt-1 flex-wrap">
            <span v-for="tag in img.tags" :key="tag" class="text-xs bg-subtle text-ink3 px-1.5 py-0.5 rounded">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
    <p class="text-xs text-ink3 text-center mt-8">Color blocks represent image placeholders. Actual images will be linked from Google Shared Drive.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import miscData from '../data/misc.json'
const filter = ref('All')
const gallery = miscData.gallery
const filtered = computed(() => filter.value === 'All' ? gallery : gallery.filter(i => i.country === filter.value))
</script>
