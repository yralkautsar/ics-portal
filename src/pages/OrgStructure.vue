<template>
  <div class="max-w-7xl mx-auto px-8 py-8">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-heading font-700 text-2xl text-ink">Organization Structure</h1>
        <p class="text-sm text-ink3 mt-1">Company hierarchy and staff directory by country</p>
      </div>
      <button @click="showForm = true" class="bg-brand text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-brand-dark transition-colors">
        Add Staff
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-border mb-8">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 -mb-px',
          activeTab === tab.key
            ? 'border-brand text-brand'
            : 'border-transparent text-ink3 hover:text-ink'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- GLOBAL TAB — Tree View -->
    <div v-if="activeTab === 'global'">
      <p class="text-xs text-ink3 mb-8">
        Showing senior leadership only: Director, General Manager, Executive Manager, Manager, Supervisor.
      </p>
      <div class="overflow-x-auto pb-8">
        <OrgTree :nodes="globalStaff" />
      </div>
    </div>

    <!-- PER-COUNTRY TABS -->
    <div v-else>
      <!-- Country filter -->
      <div class="flex gap-2 mb-6">
        <button
          v-for="country in countries"
          :key="country"
          @click="selectedCountry = country"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
            selectedCountry === country
              ? 'bg-brand text-white'
              : 'bg-surface text-ink2 border border-border hover:border-brand'
          ]"
        >
          {{ country }}
        </button>
      </div>

      <!-- Cards grouped by department -->
      <div v-for="dept in departmentsInCountry" :key="dept" class="mb-8">
        <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-4">{{ dept }}</p>
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="person in staffByDept(dept)"
            :key="person.id"
            class="bg-surface border border-border rounded-lg p-4 hover:border-brand transition-all"
          >
            <div class="w-10 h-10 rounded-full bg-subtle flex items-center justify-center mb-3">
              <span class="font-heading font-700 text-sm text-ink2">{{ initials(person.name) }}</span>
            </div>
            <p class="font-heading font-600 text-sm text-ink leading-tight">{{ person.name }}</p>
            <p class="text-xs text-ink3 mt-0.5">{{ person.position }}</p>
            <a :href="`mailto:${person.email}`" class="text-xs text-brand hover:underline mt-2 block truncate">
              {{ person.email }}
            </a>
          </div>
        </div>
      </div>

      <div v-if="departmentsInCountry.length === 0" class="text-center py-16">
        <p class="text-sm text-ink3">No staff found for this country.</p>
      </div>
    </div>

    <!-- Add Staff Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
      <div class="bg-surface rounded-xl p-8 w-full max-w-lg shadow-2xl border border-border">
        <h2 class="font-heading font-700 text-lg text-ink mb-6">Add Staff</h2>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Full Name</label>
              <input v-model="form.name" type="text" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
            </div>
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Email</label>
              <input v-model="form.email" type="email" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Position</label>
              <select v-model="form.position" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand">
                <option>Director</option>
                <option>General Manager</option>
                <option>Executive Manager</option>
                <option>Manager</option>
                <option>Supervisor</option>
                <option>Staff</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Department</label>
              <input v-model="form.department" type="text" placeholder="e.g. Operations, HR, IT" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Country</label>
              <select v-model="form.country" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand">
                <option>Global</option>
                <option>Indonesia</option>
                <option>Vietnam</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-semibold text-ink3 uppercase tracking-wider block mb-1">Reports To</label>
              <select v-model="form.reportsTo" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand">
                <option :value="null">— None (Root) —</option>
                <option v-for="p in seniorStaff" :key="p.id" :value="p.id">
                  {{ p.name }} ({{ p.position }})
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button @click="showForm = false" class="flex-1 border border-border text-ink2 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-subtle">Cancel</button>
          <button @click="submit" class="flex-1 bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark">Add Staff</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import OrgTree from '../components/OrgTree.vue'
import orgData from '../data/org.json'

/* State */
const staff = ref(JSON.parse(localStorage.getItem('org') || JSON.stringify(orgData)))
const activeTab = ref('global')
const selectedCountry = ref('Indonesia')
const showForm = ref(false)
const form = ref({ name: '', position: 'Supervisor', department: '', email: '', country: 'Indonesia', reportsTo: null })

/* Tabs */
const tabs = [
  { key: 'global', label: 'Global' },
  { key: 'country', label: 'Per Country' },
]

/* Global tree — senior roles only */
const seniorRoles = ['Director', 'General Manager', 'Executive Manager', 'Manager', 'Supervisor']
const globalStaff = computed(() => staff.value.filter(p => seniorRoles.includes(p.position)))
const rootNode = computed(() => globalStaff.value.find(p => p.reportsTo === null))

/* Per-country */
const countries = computed(() => {
  const all = staff.value.map(p => p.country).filter(c => c !== 'Global')
  return [...new Set(all)].sort()
})

const countryStaff = computed(() =>
  staff.value.filter(p => p.country === selectedCountry.value)
)

const departmentsInCountry = computed(() => {
  const depts = countryStaff.value.map(p => p.department)
  return [...new Set(depts)].sort()
})

const staffByDept = (dept) =>
  countryStaff.value.filter(p => p.department === dept)

/* Reports To dropdown — only senior staff */
const seniorStaff = computed(() =>
  staff.value.filter(p => seniorRoles.includes(p.position))
)

/* Submit */
const submit = () => {
  if (!form.value.name || !form.value.department) return
  const newEntry = {
    id: Date.now(),
    ...form.value,
    reportsTo: form.value.reportsTo || null,
  }
  staff.value.push(newEntry)
  localStorage.setItem('org', JSON.stringify(staff.value))
  showForm.value = false
  form.value = { name: '', position: 'Supervisor', department: '', email: '', country: 'Indonesia', reportsTo: null }
}

/* Helpers */
const initials = (name) =>
  name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
</script>