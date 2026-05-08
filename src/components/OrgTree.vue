<template>
  <div class="org-container" ref="containerRef">

    <!-- SVG connector lines -->
    <svg
      class="org-svg"
      :width="svgSize.width"
      :height="svgSize.height"
    >
      <line
        v-for="(line, i) in lines"
        :key="i"
        :x1="line.x1" :y1="line.y1"
        :x2="line.x2" :y2="line.y2"
        stroke="#888888"
        stroke-width="1"
      />
    </svg>

    <!-- Rows by role level -->
    <div
      v-for="(row, rowIndex) in leveledRows"
      :key="rowIndex"
      class="org-row"
    >
      <div
        v-for="node in row"
        :key="node.id"
        class="org-node"
        :ref="el => setRef(node.id, el)"
      >
        <span :class="['position-badge', badgeClass(node.position)]">
          {{ node.position }}
        </span>
        <p class="node-name">{{ node.name }}</p>
        <p class="node-dept">{{ node.department }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  nodes: { type: Array, required: true },
})

/* Level order by position title */
const LEVEL = {
  'Director': 0,
  'General Manager': 1,
  'Executive Manager': 2,
  'Manager': 3,
  'Supervisor': 4,
  'Staff': 5,
}

/* Group nodes into rows by role level, sorted within row by parent order */
const leveledRows = computed(() => {
  const groups = {}
  props.nodes.forEach(node => {
    const lvl = LEVEL[node.position] ?? 5
    if (!groups[lvl]) groups[lvl] = []
    groups[lvl].push(node)
  })
  return Object.entries(groups)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, nodes]) =>
      nodes.slice().sort((a, b) => (a.reportsTo ?? 0) - (b.reportsTo ?? 0))
    )
})

/* DOM refs per node id */
const containerRef = ref(null)
const nodeRefs = {}
const lines = ref([])
const svgSize = ref({ width: 0, height: 0 })

const setRef = (id, el) => {
  if (el) nodeRefs[id] = el
}

/* Calculate SVG lines from actual DOM positions */
const calculateLines = () => {
  nextTick(() => {
    const container = containerRef.value
    if (!container) return

    const rect = container.getBoundingClientRect()
    svgSize.value = { width: rect.width, height: rect.height }

    lines.value = props.nodes
      .filter(n => n.reportsTo !== null)
      .map(n => {
        const childEl = nodeRefs[n.id]
        const parentEl = nodeRefs[n.reportsTo]
        if (!childEl || !parentEl) return null

        const c = childEl.getBoundingClientRect()
        const p = parentEl.getBoundingClientRect()

        return {
          x1: p.left + p.width / 2 - rect.left,
          y1: p.bottom - rect.top,
          x2: c.left + c.width / 2 - rect.left,
          y2: c.top - rect.top,
        }
      })
      .filter(Boolean)
  })
}

onMounted(calculateLines)
watch(() => props.nodes, calculateLines, { deep: true })

/* Badge styles */
const badgeClass = (pos) => ({
  'Director':          'badge--director',
  'General Manager':   'badge--gm',
  'Executive Manager': 'badge--em',
  'Manager':           'badge--manager',
  'Supervisor':        'badge--supervisor',
}[pos] || 'badge--supervisor')
</script>

<style scoped>
.org-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 24px 40px 40px;
  min-width: max-content;
}

/* SVG overlay — sits behind cards */
.org-svg {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: visible;
}

/* Each level row */
.org-row {
  display: flex;
  gap: 24px;
  justify-content: center;
  position: relative;
  z-index: 1;
}

/* Node card */
.org-node {
  background: #fff;
  border: 1px solid #EBEBEB;
  border-radius: 8px;
  padding: 12px 16px;
  text-align: center;
  min-width: 140px;
  max-width: 160px;
}

/* Badges */
.position-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.badge--director   { background: #1A1A1A; color: #fff; }
.badge--gm         { background: #4A4A4A; color: #fff; }
.badge--em         { background: #E8630A; color: #fff; }
.badge--manager    { background: #FFF5EF; color: #E8630A; }
.badge--supervisor { background: #F8F8F8; color: #888; }

.node-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #1A1A1A;
  line-height: 1.3;
}

.node-dept {
  font-size: 11px;
  color: #888;
  margin-top: 2px;
}
</style>