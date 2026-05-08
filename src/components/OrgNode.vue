<template>
  <div class="flex flex-col items-center">

    <!-- Node Card -->
    <div
      :class="[
        'relative bg-surface border rounded-lg px-4 py-3 text-center min-w-36 max-w-44 cursor-default',
        isRoot ? 'border-brand shadow-sm' : 'border-border',
      ]"
    >
      <!-- Position badge -->
      <span :class="['text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded mb-2 inline-block', positionTag(node.position)]">
        {{ node.position }}
      </span>
      <p class="font-heading font-600 text-xs text-ink leading-tight">{{ node.name }}</p>
      <p class="text-xs text-ink3 mt-0.5">{{ node.department }}</p>
    </div>

    <!-- Children -->
    <div v-if="children.length" class="flex flex-col items-center">
      <!-- Vertical line down from parent -->
      <div class="w-px h-6 bg-ink3"></div>

      <!-- Horizontal connector + children -->
      <div class="relative flex items-start gap-0">
        <!-- Horizontal line spanning all children -->
        <div
          v-if="children.length > 1"
          class="absolute top-0 left-0 right-0 h-px bg-ink3"
          :style="{ left: '50%', transform: 'translateX(-50%)', width: horizontalWidth }"
        ></div>

        <div
          v-for="child in children"
          :key="child.id"
          class="flex flex-col items-center px-4"
        >
          <!-- Vertical line down to child -->
          <div class="w-px h-6 bg-ink3"></div>
          <!-- Recurse -->
          <OrgNode :node="child" :all-nodes="allNodes" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  node: { type: Object, required: true },
  allNodes: { type: Array, required: true },
})

const isRoot = computed(() => props.node.reportsTo === null)

const children = computed(() =>
  props.allNodes.filter(n => n.reportsTo === props.node.id)
)

const horizontalWidth = computed(() => {
  const count = children.value.length
  if (count <= 1) return '0px'
  // Approximate: each child column is ~176px wide (min-w-36 + px-4*2)
  return `${(count - 1) * 176}px`
})

const positionTag = (pos) => ({
  'Director': 'bg-ink text-white',
  'General Manager': 'bg-ink2 text-white',
  'Executive Manager': 'bg-brand text-white',
  'Manager': 'bg-brand-pale text-brand',
  'Supervisor': 'bg-subtle text-ink3',
}[pos] || 'bg-subtle text-ink3')
</script>