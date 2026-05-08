<template>
  <div class="node-wrapper">

    <!-- Card -->
    <div :class="['node-card', isRoot ? 'node-card--root' : '']">
      <span :class="['position-badge', positionClass(node.position)]">
        {{ node.position }}
      </span>
      <p class="node-name">{{ node.name }}</p>
      <p class="node-dept">{{ node.department }}</p>
    </div>

    <!-- Children -->
    <div v-if="children.length" class="children-section">
      <div class="connector-down"></div>
      <div class="children-row">
        <div v-for="child in children" :key="child.id" class="child-col">
          <div class="connector-down"></div>
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

const positionClass = (pos) => ({
  'Director': 'badge--director',
  'General Manager': 'badge--gm',
  'Executive Manager': 'badge--em',
  'Manager': 'badge--manager',
  'Supervisor': 'badge--supervisor',
}[pos] || 'badge--supervisor')
</script>

<style scoped>
.node-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Card */
.node-card {
  background: #fff;
  border: 1px solid #EBEBEB;
  border-radius: 8px;
  padding: 12px 16px;
  text-align: center;
  min-width: 140px;
  max-width: 160px;
}

.node-card--root {
  border-color: #E8630A;
}

/* Position badge */
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

.badge--director  { background: #1A1A1A; color: #fff; }
.badge--gm        { background: #4A4A4A; color: #fff; }
.badge--em        { background: #E8630A; color: #fff; }
.badge--manager   { background: #FFF5EF; color: #E8630A; }
.badge--supervisor{ background: #F8F8F8; color: #888; }

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

/* Connectors */
.connector-down {
  width: 1px;
  height: 24px;
  background: #888;
  flex-shrink: 0;
}

/* Children layout */
.children-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.children-row {
  display: flex;
  align-items: flex-start;
  position: relative;
}

/* Horizontal line across all siblings via border-top on child-col */
.child-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #888;
}

/* First child: line starts from center, goes right */
.child-col:first-child {
  border-left: none;
  padding-left: 0;
}

.child-col:first-child {
  border-top-left-radius: 0;
}

/* Last child: line starts from left, ends at center */
.child-col:last-child {
  border-right: none;
  padding-right: 0;
}

/* Single child: no horizontal line needed */
.child-col:first-child:last-child {
  border-top: none;
}
</style>