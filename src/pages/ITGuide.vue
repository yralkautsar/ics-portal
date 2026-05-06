<template>
  <div class="max-w-4xl mx-auto px-8 py-8">
    <div class="mb-8">
      <h1 class="font-heading font-700 text-2xl text-ink">IT & System Guide</h1>
      <p class="text-sm text-ink3 mt-1">Technical guides and IT support documentation</p>
    </div>

    <div class="bg-brand-pale border border-brand/20 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div>
        <p class="font-heading font-600 text-sm text-ink">Need immediate IT support?</p>
        <p class="text-xs text-ink3 mt-0.5">Contact Yoga · yoga@icstravelgroup.com · Ext. 101</p>
      </div>
      <a href="mailto:yoga@icstravelgroup.com" class="text-xs text-brand font-semibold hover:underline whitespace-nowrap ml-4">Send Email</a>
    </div>

    <div class="space-y-2">
      <div
        v-for="guide in guides"
        :key="guide.id"
        class="bg-surface border border-border rounded-lg overflow-hidden hover:border-brand transition-all"
      >
        <div
          @click="expanded = expanded === guide.id ? null : guide.id"
          class="flex items-center justify-between px-5 py-4 cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span :class="['text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded', categoryTag(guide.category)]">{{ guide.category }}</span>
            <h3 class="font-heading font-600 text-sm text-ink">{{ guide.title }}</h3>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-xs text-ink3">{{ formatDate(guide.lastUpdated) }}</span>
            <span class="text-xs text-ink3">{{ expanded === guide.id ? '▲' : '▼' }}</span>
          </div>
        </div>
        <div v-if="expanded === guide.id" class="px-5 pb-5 border-t border-border">
          <p class="text-sm text-ink2 leading-relaxed mt-4">{{ guide.content }}</p>
          <button class="mt-4 text-xs font-semibold text-brand hover:underline">Download Full Guide</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import guidesData from '../data/itguide.json'

const guides = guidesData
const expanded = ref(null)

const categoryTag = (cat) => ({ Network: 'bg-blue-50 text-blue-600', Email: 'bg-brand-pale text-brand', Support: 'bg-green-50 text-green-600', Security: 'bg-red-50 text-red-500', Storage: 'bg-subtle text-ink3' }[cat] || 'bg-subtle text-ink3')
const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>
