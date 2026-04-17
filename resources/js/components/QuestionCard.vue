<template>
  <div class="w-full relative">

    <!-- Chispas doradas al seleccionar -->
    <teleport to="body">
      <div v-if="sparks.length" class="fixed inset-0 pointer-events-none z-50">
        <div
          v-for="s in sparks" :key="s.id"
          class="absolute rounded-full"
          :style="s.style"
        ></div>
      </div>
    </teleport>

    <!-- Pregunta de texto -->
    <div v-if="question.type === 'text'" class="space-y-6">
      <p class="text-2xl font-light leading-relaxed" style="color: #3d2c1e; font-family: 'Playfair Display', serif;">
        {{ question.text }}
      </p>
      <p v-if="question.subtitle" class="text-sm font-light" style="color: #a08060;">
        {{ question.subtitle }}
      </p>
      <div class="relative">
        <textarea
          v-model="localAnswer"
          @input="onTextInput"
          rows="3"
          placeholder="Escribe aquí con amor..."
          class="w-full rounded-2xl px-5 py-4 text-sm font-light resize-none focus:outline-none transition-all duration-400"
          style="background: #fff8f0; border: 1.5px solid #e8d5b0; color: #3d2c1e;"
          @focus="e => e.target.style.borderColor = '#d4a843'"
          @blur="e => e.target.style.borderColor = '#e8d5b0'"
        ></textarea>
        <!-- Onda de luz al escribir -->
        <div v-if="showTextPulse" class="text-pulse"></div>
      </div>
    </div>

    <!-- Pregunta de imagen -->
    <div v-else-if="question.type === 'image'" class="space-y-6">
      <p class="text-2xl font-light leading-relaxed" style="color: #3d2c1e; font-family: 'Playfair Display', serif;">
        {{ question.text }}
      </p>
      <p v-if="question.subtitle" class="text-sm font-light" style="color: #a08060;">
        {{ question.subtitle }}
      </p>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="option in question.options"
          :key="option.id"
          @click="selectImage(option.id, $event)"
          class="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 aspect-square"
          :class="localAnswer === option.id ? 'scale-[0.97]' : 'hover:scale-[0.98]'"
          :style="localAnswer === option.id
            ? 'box-shadow: 0 0 0 2.5px #d4a843, 0 8px 30px rgba(212,168,67,0.25);'
            : 'box-shadow: 0 2px 12px rgba(0,0,0,0.08);'"
        >
          <img :src="option.image" :alt="option.label" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
            <span class="text-xs text-white font-light tracking-wide">{{ option.label }}</span>
          </div>
          <transition name="check-pop">
            <div
              v-if="localAnswer === option.id"
              class="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style="background: linear-gradient(135deg, #d4a843, #f0cc6e);"
            >
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Pregunta de opción múltiple -->
    <div v-else-if="question.type === 'choice'" class="space-y-6">
      <p class="text-2xl font-light leading-relaxed" style="color: #3d2c1e; font-family: 'Playfair Display', serif;">
        {{ question.text }}
      </p>
      <p v-if="question.subtitle" class="text-sm font-light" style="color: #a08060;">
        {{ question.subtitle }}
      </p>
      <div class="space-y-3">
        <button
          v-for="option in question.options"
          :key="option.id"
          @click="selectChoice(option.id, $event)"
          class="w-full text-left px-5 py-4 rounded-2xl text-sm font-light tracking-wide transition-all duration-300 relative overflow-hidden"
          :style="localAnswer === option.id
            ? 'background: linear-gradient(135deg, #fdf3dc, #fff8f0); border: 1.5px solid #d4a843; color: #8a6520;'
            : 'background: #fff8f0; border: 1.5px solid #e8d5b0; color: #6b5040;'"
        >
          <span class="relative z-10">{{ option.label }}</span>
          <!-- Onda de selección -->
          <div v-if="localAnswer === option.id" class="choice-shimmer absolute inset-0"></div>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  question: { type: Object, required: true }
})
const emit = defineEmits(['answer'])

const localAnswer = ref('')
const sparks = ref([])
const showTextPulse = ref(false)
let sparkId = 0
let textTimer = null

watch(() => props.question, () => { localAnswer.value = '' })

function fireSparks(x, y) {
  const colors = ['#d4a843', '#f0cc6e', '#f9a8d4', '#fbbf24', '#ffffff']
  const newSparks = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * 360
    const dist = 40 + Math.random() * 50
    const rad = (angle * Math.PI) / 180
    const tx = Math.cos(rad) * dist
    const ty = Math.sin(rad) * dist
    return {
      id: sparkId++,
      style: {
        left: x + 'px',
        top: y + 'px',
        width: '5px',
        height: '5px',
        background: colors[i % colors.length],
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        animation: `sparkFly 0.7s ease-out forwards`,
        '--tx': tx + 'px',
        '--ty': ty + 'px',
        opacity: 1,
      }
    }
  })
  sparks.value = newSparks
  setTimeout(() => sparks.value = [], 800)
}

function onTextInput() {
  emit('answer', localAnswer.value)
  showTextPulse.value = true
  clearTimeout(textTimer)
  textTimer = setTimeout(() => showTextPulse.value = false, 600)
}

function selectImage(id, event) {
  localAnswer.value = id
  emit('answer', id)
  const rect = event.currentTarget.getBoundingClientRect()
  fireSparks(rect.left + rect.width / 2, rect.top + rect.height / 2)
}

function selectChoice(id, event) {
  localAnswer.value = id
  emit('answer', id)
  const rect = event.currentTarget.getBoundingClientRect()
  fireSparks(rect.left + rect.width / 2, rect.top + rect.height / 2)
}
</script>

<style scoped>
.check-pop-enter-active { animation: popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes popIn {
  0%   { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.choice-shimmer {
  background: linear-gradient(90deg, transparent, rgba(212,168,67,0.15), transparent);
  animation: shimmer 1.2s ease-in-out;
}
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.text-pulse {
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  border: 1.5px solid #d4a843;
  animation: textPulseAnim 0.6s ease-out forwards;
  pointer-events: none;
}
@keyframes textPulseAnim {
  0%   { opacity: 0.8; transform: scale(1); }
  100% { opacity: 0;   transform: scale(1.02); }
}
</style>

<style>
@keyframes sparkFly {
  0%   { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}
</style>