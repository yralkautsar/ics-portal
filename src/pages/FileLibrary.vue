<template>
  <div class="max-w-7xl mx-auto px-8 py-8">
    <div class="mb-6">
      <h1 class="font-heading font-700 text-2xl text-ink">File Library</h1>
      <p class="text-sm text-ink3 mt-1">Centralized file access across all ICS countries</p>
    </div>

    <!-- Google Drive Banner -->
    <div class="bg-brand-pale border border-brand/20 rounded-lg p-6 mb-6 flex items-center justify-between">
      <div>
        <p class="font-heading font-600 text-sm text-ink">Google Shared Drive Integration</p>
        <p class="text-xs text-ink3 mt-1 max-w-xl leading-relaxed">
          This section will display and navigate files directly from the ICS Global Shared Drive.
          Access control will be managed through Google Workspace permissions set by the IT Admin.
        </p>
      </div>
      <button class="bg-brand text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap ml-8">
        Connect Drive
      </button>
    </div>

    <!-- Placeholder -->
    <div class="bg-surface border border-border rounded-lg p-16 flex flex-col items-center justify-center text-center">
      <div class="w-12 h-12 rounded-full bg-subtle flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-ink3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </div>
      <p class="font-heading font-600 text-sm text-ink mb-2">No Drive Connected</p>
      <p class="text-xs text-ink3 max-w-sm leading-relaxed">
        Folder structure and file access will be available once the Google Shared Drive integration is approved and configured by IT.
      </p>
    </div>
  </div>
</template>
