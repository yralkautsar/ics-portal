<template>
  <div class="max-w-6xl mx-auto px-8 py-8">
    <div class="mb-8">
      <h1 class="font-heading font-700 text-2xl text-ink">Product Catalog</h1>
      <p class="text-sm text-ink3 mt-1">Tour packages and travel products by country</p>
    </div>
    <div class="flex gap-2 mb-6">
      <button v-for="f in ['All', 'Indonesia', 'Vietnam']" :key="f" @click="filter = f"
        :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors', filter === f ? 'bg-brand text-white' : 'bg-surface text-ink2 border border-border hover:border-brand']">
        {{ f }}
      </button>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="p in filtered" :key="p.id" class="bg-surface border border-border rounded-lg p-5 hover:border-brand transition-all">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold tracking-wider uppercase bg-brand-pale text-brand px-2 py-0.5 rounded">{{ p.type }}</span>
          <span class="text-xs text-ink3">{{ p.country }}</span>
        </div>
        <h3 class="font-heading font-600 text-sm text-ink mb-3">{{ p.name }}</h3>
        <div class="flex gap-4 text-xs text-ink3">
          <span>{{ p.duration }}</span>
          <span>{{ p.pax }} pax</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import miscData from '../data/misc.json'
const filter = ref('All')
const products = miscData.products
const filtered = computed(() => filter.value === 'All' ? products : products.filter(p => p.country === filter.value))
</script>
