<template>
  <div class="max-w-4xl mx-auto px-8 py-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-heading font-700 text-2xl text-ink">Announcements</h1>
        <p class="text-sm text-ink3 mt-1">Company-wide and country-specific updates</p>
      </div>
      <button @click="showForm = true" class="bg-brand text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-brand-dark transition-colors">
        New Announcement
      </button>
    </div>

    <div class="flex gap-2 mb-6">
      <button
        v-for="cat in ['All', 'Company', 'Operations', 'HR', 'IT']"
        :key="cat"
        @click="filter = cat"
        :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors', filter === cat ? 'bg-brand text-white' : 'bg-surface text-ink2 border border-border hover:border-brand']"
      >
        {{ cat }}
      </button>
    </div>

    <div class="space-y-3">
      <div
        v-for="ann in filtered"
        :key="ann.id"
        class="bg-surface border border-border rounded-lg p-5 hover:border-brand transition-all"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <span :class="['text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded mb-2 inline-block', categoryTag(ann.category)]">
              {{ ann.category }}
            </span>
            <h3 class="font-heading font-600 text-sm text-ink">{{ ann.title }}</h3>
            <p class="text-sm text-ink2 mt-1 leading-relaxed">{{ ann.summary }}</p>
            <p class="text-xs text-ink3 mt-2">{{ ann.postedBy }} · {{ formatDate(ann.date) }}</p>
          </div>
          <span class="text-xs text-ink3 whitespace-nowrap">{{ ann.country }}</span>
        </div>
      </div>
      <p v-if="filtered.length === 0" class="text-center text-ink3 text-sm py-10">No announcements found.</p>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
      <div class="bg-surface rounded-xl p-8 w-full max-w-lg shadow-2xl border border-border">
        <h2 class="font-heading font-700 text-lg text-ink mb-6">New Announcement</h2>
        <div class="space-y-4">
          <div>
            <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Title</label>
            <input v-model="form.title" type="text" placeholder="Announcement title" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Category</label>
              <select v-model="form.category" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand">
                <option>Company</option><option>Operations</option><option>HR</option><option>IT</option>
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
            <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Summary</label>
            <textarea v-model="form.summary" rows="3" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand resize-none"></textarea>
          </div>
          <div>
            <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Posted By</label>
            <input v-model="form.postedBy" type="text" placeholder="Your name or department" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showForm = false" class="flex-1 border border-border text-ink2 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-subtle">Cancel</button>
          <button @click="submit" class="flex-1 bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import announcementsData from '../data/announcements.json'

const announcements = ref(JSON.parse(localStorage.getItem('announcements') || JSON.stringify(announcementsData)))
const filter = ref('All')
const showForm = ref(false)
const form = ref({ title: '', category: 'Company', country: 'All Countries', summary: '', postedBy: '' })

const filtered = computed(() => filter.value === 'All' ? announcements.value : announcements.value.filter(a => a.category === filter.value))

const submit = () => {
  if (!form.value.title || !form.value.summary) return
  announcements.value.unshift({ id: Date.now(), ...form.value, date: new Date().toISOString().split('T')[0] })
  localStorage.setItem('announcements', JSON.stringify(announcements.value))
  showForm.value = false
  form.value = { title: '', category: 'Company', country: 'All Countries', summary: '', postedBy: '' }
}

const categoryTag = (cat) => ({ Company: 'bg-brand-pale text-brand', Operations: 'bg-blue-50 text-blue-600', HR: 'bg-green-50 text-green-600', IT: 'bg-subtle text-ink3' }[cat] || 'bg-subtle text-ink3')
const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>
