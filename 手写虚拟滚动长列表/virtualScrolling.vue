<template>
  <div class="page">
    <h3>定高虚拟滚动（无库实现）</h3>

    <div ref="containerRef" class="list-container" @scroll="onScroll">
      <div :style="{ height: totalHeight + 'px', position: 'relative' }">
        <div :style="{ transform: `translateY(${offsetY}px)` }">
          <div
            v-for="item in visibleItems"
            :key="item.id"
            class="row"
            :style="{ height: ITEM_HEIGHT + 'px' }"
          >
            <span class="id">#{{ item.id }}</span>
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <p class="meta">
      total: {{ items.length }} | render: {{ startIndex }} - {{ endIndex }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const ITEM_HEIGHT = 56
const BUFFER = 6

type RowItem = { id: number; text: string }
const items = ref<RowItem[]>(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    text: `这是第 ${i + 1} 行数据（定高虚拟滚动）`
  }))
)

const containerRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const containerHeight = ref(0)

const totalHeight = computed(() => items.value.length * ITEM_HEIGHT)
const visibleCount = computed(() => Math.ceil(containerHeight.value / ITEM_HEIGHT))
const startIndex = computed(() => Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER))
const endIndex = computed(() =>
  Math.min(items.value.length, startIndex.value + visibleCount.value + BUFFER * 2)
)
const visibleItems = computed(() => items.value.slice(startIndex.value, endIndex.value))
const offsetY = computed(() => startIndex.value * ITEM_HEIGHT)

const onScroll = (e: Event) => {
  const target = e.target as HTMLElement
  scrollTop.value = target.scrollTop
}

const updateContainerHeight = () => {
  if (!containerRef.value) return
  containerHeight.value = containerRef.value.clientHeight
}

onMounted(() => {
  updateContainerHeight()
  window.addEventListener('resize', updateContainerHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerHeight)
})
</script>

<style scoped>
.page {
  padding: 16px;
  font-family: 'Segoe UI', sans-serif;
}

.list-container {
  height: 420px;
  overflow: auto;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}

.row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  border-bottom: 1px solid #f1f1f1;
}

.id {
  color: #666;
  min-width: 56px;
}

.meta {
  margin-top: 10px;
  color: #666;
}
</style>