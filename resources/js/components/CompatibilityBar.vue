<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-3">
      <span class="text-xs tracking-[0.25em] uppercase" style="color: #b8986a;">Compatibilidad</span>
      <span class="text-sm font-light" style="color: #c9a84c;">{{ displayValue }}%</span>
    </div>
    <div class="w-full h-[3px] rounded-full overflow-hidden" style="background: #e8dcc8;">
      <div
        class="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
        :style="{ width: percentage + '%', background: 'linear-gradient(90deg, #d4a843, #f0cc6e, #c9a84c)' }"
      >
        <!-- Brillo deslizante -->
        <div class="absolute inset-0 shine-bar"></div>
      </div>
    </div>
    <!-- Pulso de luz al avanzar -->
    <div v-if="showPulse" class="pulse-ring" :style="{ left: percentage + '%' }"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  percentage: { type: Number, default: 0 },
  displayValue: { type: String, default: '0' }
})

const showPulse = ref(false)

watch(() => props.percentage, () => {
  showPulse.value = true
  setTimeout(() => showPulse.value = false, 800)
})
</script>

<style scoped>
.shine-bar {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
  animation: shine 2s ease-in-out infinite;
}
@keyframes shine {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

.pulse-ring {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  margin-top: -8px;
  border-radius: 50%;
  border: 2px solid #d4a843;
  animation: pulseRing 0.8s ease-out forwards;
}
@keyframes pulseRing {
  0%   { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}
</style>