<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-8 py-16 relative overflow-hidden"
    style="background: linear-gradient(160deg, #fdf8f0 0%, #faf3e8 50%, #f5ece0 100%);">

    <!-- Pétalos suaves de fondo -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 8" :key="i" class="petal absolute" :style="petalStyle(i)">🌸</div>
    </div>

    <div class="relative z-10 w-full max-w-md space-y-10">

      <!-- Header -->
      <div class="space-y-5">
        <div class="flex justify-between items-center">
          <span class="text-xs tracking-[0.3em] uppercase" style="color: #b8986a;">
            {{ currentIndex + 1 }} / {{ questions.length }}
          </span>
          <span class="text-xs tracking-[0.3em] uppercase" style="color: #b8986a;">
            Análisis de compatibilidad
          </span>
        </div>
        <CompatibilityBar :percentage="barPercentage" :display-value="displayValue" />
      </div>

      <!-- Tarjeta de pregunta -->
      <transition name="slide" mode="out-in">
        <div :key="currentIndex"
          class="rounded-3xl p-7 shadow-sm"
          style="background: rgba(255,252,247,0.85); border: 1px solid #ecddc0; backdrop-filter: blur(8px);">
          <QuestionCard :question="currentQuestion" @answer="handleAnswer" />
        </div>
      </transition>

      <!-- Botón siguiente -->
      <div class="flex justify-end">
        <button
          @click="next"
          :disabled="!currentAnswer"
          class="group flex items-center gap-3 px-8 py-3 rounded-full text-sm tracking-[0.2em] uppercase transition-all duration-400"
          :style="currentAnswer
            ? 'border: 1.5px solid #d4a843; color: #8a6520; background: linear-gradient(135deg, #fdf8f0, #fdf3dc); cursor: pointer;'
            : 'border: 1.5px solid #e8d5b0; color: #c8b090; cursor: not-allowed;'"
        >
          <span>{{ currentIndex === questions.length - 1 ? 'Ver resultado' : 'Siguiente' }}</span>
          <svg class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CompatibilityBar from '@/components/CompatibilityBar.vue'
import QuestionCard from '@/components/QuestionCard.vue'

const router = useRouter()
const currentIndex = ref(0)
const currentAnswer = ref('')
const answeredCount = ref(0)

const questions = [
  {
    id: 1,
    type: 'choice',
    text: '¿Cuál es tu recuerdo favorito de nosotros?',
    subtitle: 'El primero que venga a tu mente',
    options: [
      { id: 'a', label: 'Nuestra primera cita' },
      { id: 'b', label: 'Un viaje juntos' },
      { id: 'c', label: 'Una noche en casa viendo películas' },
      { id: 'd', label: 'Cuando me cuidaste cuando estaba enfermo/a' },
    ]
  },
  {
    id: 2,
    type: 'text',
    text: '¿Qué es lo que más te gusta de nuestra relación?',
    subtitle: 'Sé honesta, no hay respuesta incorrecta',
  },
  {
    id: 3,
    type: 'choice',
    text: '¿Cómo describirías nuestra conexión?',
    subtitle: 'Elige la que más resuene contigo',
    options: [
      { id: 'a', label: 'Somos mejores amigos que se aman' },
      { id: 'b', label: 'Nos complementamos perfectamente' },
      { id: 'c', label: 'Tenemos una conexión única e inexplicable' },
      { id: 'd', label: 'Crecemos juntos cada día' },
    ]
  },
  {
    id: 4,
    type: 'image',
    text: '¿Cuál de estos momentos fue más especial para ti?',
    subtitle: 'Toca la imagen para seleccionar',
    options: [
      { id: 'a', label: 'Momento 1', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80' },
      { id: 'b', label: 'Momento 2', image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80' },
      { id: 'c', label: 'Momento 3', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80' },
      { id: 'd', label: 'Momento 4', image: 'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=400&q=80' },
    ]
  },
  {
    id: 5,
    type: 'text',
    text: '¿Cómo te imaginas nuestro futuro juntos?',
    subtitle: 'Cuéntame lo que sientes',
  },
  {
    id: 6,
    type: 'choice',
    text: '¿Qué palabra nos define mejor como pareja?',
    options: [
      { id: 'a', label: 'Aventura' },
      { id: 'b', label: 'Hogar' },
      { id: 'c', label: 'Crecimiento' },
      { id: 'd', label: 'Complicidad' },
    ]
  },
]

const currentQuestion = computed(() => questions[currentIndex.value])

const barPercentage = computed(() => Math.round((answeredCount.value / questions.length) * 99.99))

const displayValue = computed(() => {
  const val = barPercentage.value
  return val >= 99 ? '99.99' : val.toString()
})

function handleAnswer(answer) { currentAnswer.value = answer }

function next() {
  if (!currentAnswer.value) return
  answeredCount.value++
  if (currentIndex.value === questions.length - 1) {
    router.push('/scroll-close')
    return
  }
  currentIndex.value++
  currentAnswer.value = ''
}

function petalStyle(i) {
  return {
    fontSize: (10 + (i % 3) * 5) + 'px',
    left: `${(i * 13) % 100}%`,
    top: '-30px',
    opacity: 0.25,
    animation: `petalFall ${6 + (i % 4)}s ease-in infinite`,
    animationDelay: `${i * 1.2}s`,
  }
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.45s ease; }
.slide-enter-from { opacity: 0; transform: translateX(30px); }
.slide-leave-to   { opacity: 0; transform: translateX(-30px); }

@keyframes petalFall {
  0%   { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0.4; }
  50%  { transform: translateY(50vh) rotate(180deg) translateX(20px); }
  100% { transform: translateY(110vh) rotate(360deg) translateX(-10px); opacity: 0; }
}
</style>