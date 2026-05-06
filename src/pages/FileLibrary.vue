<template>
  <div class="max-w-7xl mx-auto px-8 py-8">
    <div class="mb-6">
      <h1 class="font-heading font-700 text-2xl text-ink">File Library</h1>
      <p class="text-sm text-ink3 mt-1">Connected to ICS Global Shared Drive via Google Workspace</p>
    </div>

    <!-- Google Drive Connect Banner -->
    <div class="bg-brand-pale border border-brand/20 rounded-lg p-5 mb-8 flex items-center justify-between">
      <div>
        <p class="font-heading font-600 text-sm text-ink">Google Shared Drive Integration</p>
        <p class="text-xs text-ink3 mt-1">This section will display and navigate files directly from the ICS Global Shared Drive. Access is controlled by Google Workspace permissions set by the IT Admin.</p>
      </div>
      <button class="bg-brand text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap ml-6">
        Connect Drive
      </button>
    </div>

    <div class="grid grid-cols-4 gap-6">
      <!-- Folder Tree -->
      <div class="bg-surface border border-border rounded-lg p-4">
        <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-3">Structure</p>

        <div class="mb-4">
          <div
            @click="setActive('core', null)"
            :class="['px-3 py-2 rounded-md text-xs cursor-pointer transition-colors font-semibold', active.section === 'core' && !active.folder ? 'bg-brand-pale text-brand' : 'text-ink2 hover:bg-subtle']"
          >
            ICS Core Global
          </div>
          <div
            v-for="folder in files.core.folders"
            :key="folder.name"
            @click="setActive('core', folder.name)"
            :class="['pl-5 pr-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors', active.section === 'core' && active.folder === folder.name ? 'bg-brand-pale text-brand font-semibold' : 'text-ink3 hover:bg-subtle hover:text-ink2']"
          >
            {{ folder.name }}
          </div>
        </div>

        <div v-for="country in files.countries" :key="country.code" class="mb-4">
          <p class="text-xs font-semibold text-ink3 px-3 mb-1 tracking-wide">{{ country.name }}</p>
          <div
            v-for="folder in country.folders"
            :key="folder.name"
            @click="setActive(country.code, folder.name)"
            :class="['px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors', active.section === country.code && active.folder === folder.name ? 'bg-brand-pale text-brand font-semibold' : 'text-ink3 hover:bg-subtle hover:text-ink2']"
          >
            {{ folder.name }}
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="col-span-3 bg-surface border border-border rounded-lg p-6">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs text-ink3 mb-6">
          <span>Global Drive</span>
          <span>›</span>
          <span v-if="activeSection">{{ activeSection.label }}</span>
          <span v-if="active.folder">›</span>
          <span v-if="active.folder" class="text-ink font-semibold">{{ active.folder }}</span>
        </div>

        <!-- Folder Grid -->
        <div v-if="!active.folder">
          <p class="text-xs font-semibold tracking-widest uppercase text-ink3 mb-4">Folders</p>
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div
              v-for="folder in currentFolders"
              :key="folder.name"
              @click="setActive(active.section, folder.name)"
              class="border border-border rounded-lg p-4 cursor-pointer hover:border-brand hover:bg-brand-pale transition-all"
            >
              <p class="text-xs font-heading font-600 text-ink mb-1">{{ folder.name }}</p>
              <p class="text-xs text-ink3">{{ folder.fileCount }} files</p>
              <span v-if="folder.access && folder.access !== 'All Staff'" class="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded mt-2 inline-block font-semibold">{{ folder.access }}</span>
            </div>
          </div>
        </div>

        <!-- File Table -->
        <div v-else>
          <div class="flex items-center justify-between mb-4">
            <p class="text-xs font-semibold tracking-widest uppercase text-ink3">Files in {{ active.folder }}</p>
            <span class="text-xs text-ink3 bg-subtle px-2 py-0.5 rounded">Synced from Google Drive</span>
          </div>
          <table class="w-full">
            <thead>
              <tr class="border-b border-border">
                <th class="text-left text-xs font-semibold tracking-widest uppercase text-ink3 pb-3">Name</th>
                <th class="text-left text-xs font-semibold tracking-widest uppercase text-ink3 pb-3">Type</th>
                <th class="text-left text-xs font-semibold tracking-widest uppercase text-ink3 pb-3">Access</th>
                <th class="text-left text-xs font-semibold tracking-widest uppercase text-ink3 pb-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in dummyFiles" :key="file.name" class="border-b border-border/50 hover:bg-subtle transition-colors">
                <td class="py-3 text-sm font-medium text-ink">{{ file.name }}</td>
                <td class="py-3"><span :class="['text-xs font-bold px-2 py-0.5 rounded uppercase', typeBadge(file.type)]">{{ file.type }}</span></td>
                <td class="py-3"><span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', accessBadge(file.access)]">{{ file.access }}</span></td>
                <td class="py-3 text-xs text-ink3">{{ file.updated }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import filesData from '../data/files.json'

const files = filesData
const active = ref({ section: 'core', folder: null })
const setActive = (section, folder) => { active.value = { section, folder } }

const activeSection = computed(() => {
  if (active.value.section === 'core') return { label: 'ICS Core Global' }
  const c = files.countries.find(c => c.code === active.value.section)
  return c ? { label: c.name } : null
})

const currentFolders = computed(() => {
  if (active.value.section === 'core') return files.core.folders
  const c = files.countries.find(c => c.code === active.value.section)
  return c ? c.folders : []
})

const dummyFiles = computed(() => [
  { name: `${active.value.folder} Guidelines 2026`, type: 'PDF', access: 'All Staff', updated: 'May 5, 2026' },
  { name: `${active.value.folder} Report Q1 2026`, type: 'XLSX', access: 'All Staff', updated: 'Apr 12, 2026' },
  { name: `${active.value.folder} Template`, type: 'DOCX', access: 'All Staff', updated: 'Mar 22, 2026' },
])

const typeBadge = (t) => ({ PDF: 'bg-red-50 text-red-500', XLSX: 'bg-green-50 text-green-600', DOCX: 'bg-blue-50 text-blue-600', PPTX: 'bg-brand-pale text-brand' }[t] || 'bg-subtle text-ink3')
const accessBadge = (a) => a === 'All Staff' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
</script>
