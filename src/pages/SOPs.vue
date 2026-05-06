<template>
  <div class="max-w-4xl mx-auto px-8 py-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-heading font-700 text-2xl text-ink">Standard Operating Procedures</h1>
        <p class="text-sm text-ink3 mt-1">Company procedures and operational guidelines</p>
      </div>
      <button @click="showForm = true" class="bg-brand text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-brand-dark transition-colors">
        Add SOP
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div v-for="sop in sops" :key="sop.id" class="bg-surface border border-border rounded-lg p-5 hover:border-brand transition-all">
        <div class="flex items-start justify-between mb-3">
          <span :class="['text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded', categoryTag(sop.category)]">{{ sop.category }}</span>
          <span class="text-xs text-ink3 bg-subtle px-2 py-0.5 rounded font-medium">{{ sop.version }}</span>
        </div>
        <h3 class="font-heading font-600 text-sm text-ink mb-2">{{ sop.title }}</h3>
        <p class="text-xs text-ink2 leading-relaxed mb-3">{{ sop.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs text-ink3">Updated {{ formatDate(sop.lastUpdated) }}</span>
          <span class="text-xs text-ink3">{{ sop.country }}</span>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
      <div class="bg-surface rounded-xl p-8 w-full max-w-lg shadow-2xl border border-border">
        <h2 class="font-heading font-700 text-lg text-ink mb-6">Add New SOP</h2>
        <div class="space-y-4">
          <div>
            <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Title</label>
            <input v-model="form.title" type="text" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Category</label>
              <select v-model="form.category" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand">
                <option>HR</option><option>Operations</option><option>IT</option><option>Finance</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Country</label>
              <select v-model="form.country" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand">
                <option>All Countries</option><option>Indonesia</option><option>Vietnam</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand resize-none"></textarea>
          </div>
          <div>
            <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Version</label>
            <input v-model="form.version" type="text" placeholder="e.g. v1.0" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showForm = false" class="flex-1 border border-border text-ink2 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-subtle">Cancel</button>
          <button @click="submit" class="flex-1 bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark">Add SOP</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import sopsData from '../data/sops.json'

const sops = ref(JSON.parse(localStorage.getItem('sops') || JSON.stringify(sopsData)))
const showForm = ref(false)
const form = ref({ title: '', category: 'Operations', country: 'All Countries', description: '', version: 'v1.0' })

const submit = () => {
  if (!form.value.title) return
  sops.value.unshift({ id: Date.now(), ...form.value, lastUpdated: new Date().toISOString().split('T')[0] })
  localStorage.setItem('sops', JSON.stringify(sops.value))
  showForm.value = false
  form.value = { title: '', category: 'Operations', country: 'All Countries', description: '', version: 'v1.0' }
}

const categoryTag = (cat) => ({ HR: 'bg-green-50 text-green-600', Operations: 'bg-blue-50 text-blue-600', IT: 'bg-subtle text-ink3', Finance: 'bg-brand-pale text-brand' }[cat] || 'bg-subtle text-ink3')
const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>
