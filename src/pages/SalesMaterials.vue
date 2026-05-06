<template>
  <div class="max-w-4xl mx-auto px-8 py-8">
    <div class="mb-8">
      <h1 class="font-heading font-700 text-2xl text-ink">Sales Materials</h1>
      <p class="text-sm text-ink3 mt-1">Decks, templates, and rate sheets for sales use</p>
    </div>
    <div class="bg-surface border border-border rounded-lg overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border bg-subtle">
            <th class="text-left text-xs font-semibold tracking-widest uppercase text-ink3 px-6 py-3">Name</th>
            <th class="text-left text-xs font-semibold tracking-widest uppercase text-ink3 px-6 py-3">Type</th>
            <th class="text-left text-xs font-semibold tracking-widest uppercase text-ink3 px-6 py-3">Size</th>
            <th class="text-left text-xs font-semibold tracking-widest uppercase text-ink3 px-6 py-3">Updated</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in sales" :key="file.id" class="border-b border-border/50 hover:bg-subtle transition-colors">
            <td class="px-6 py-4 text-sm font-medium text-ink">{{ file.name }}</td>
            <td class="px-6 py-4"><span :class="['text-xs font-bold px-2 py-0.5 rounded uppercase', typeBadge(file.type)]">{{ file.type }}</span></td>
            <td class="px-6 py-4 text-xs text-ink3">{{ file.size }}</td>
            <td class="px-6 py-4 text-xs text-ink3">{{ file.updated }}</td>
            <td class="px-6 py-4"><button class="text-xs text-brand font-semibold hover:underline">Download</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import miscData from '../data/misc.json'
const sales = miscData.sales
const typeBadge = (t) => ({ PDF: 'bg-red-50 text-red-500', PPTX: 'bg-brand-pale text-brand', DOCX: 'bg-blue-50 text-blue-600', XLSX: 'bg-green-50 text-green-600' }[t] || 'bg-subtle text-ink3')
</script>
