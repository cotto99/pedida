<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
    style="background: linear-gradient(160deg, #fdf8f0 0%, #faf3e8 50%, #f5ece0 100%);">

    <!-- Pétalos siempre presentes -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 20" :key="i" class="petal absolute" :style="petalStyle(i)">🌸</div>
    </div>

    <!-- Confetti dorado al decir Sí -->
    <div v-if="showConfetti" class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 40" :key="'c'+i" class="absolute rounded-sm" :style="confettiStyle(i)"></div>
    </div>

    <!-- Partículas flotantes -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 12" :key="'p'+i" class="particle absolute rounded-full" :style="particleStyle(i)"></div>
    </div>

    <div class="relative z-10 w-full max-w-sm text-center space-y-12">

      <!-- Fase 1: Resultado -->
      <transition name="fade-up" appear>
        <div v-if="phase === 1" class="space-y-8">
          <div class="rounded-3xl p-10 shadow-sm space-y-5"
            style="background: rgba(255,252,247,0.9); border: 1px solid #ecddc0;">
            <p class="text-xs tracking-[0.4em] uppercase" style="color: #b8986a;">Resultado del análisis</p>
            <div class="text-7xl font-light" style="color: #3d2c1e; font-family: 'Playfair Display', serif;">
              99.99<span class="text-3xl" style="color: #d4a843;">%</span>
            </div>
            <div class="flex items-center justify-center gap-3">
              <div class="h-px w-10" style="background: linear-gradient(90deg, transparent, #d4a843);"></div>
              <span style="color: #d4a843;">✦</span>
              <div class="h-px w-10" style="background: linear-gradient(90deg, #d4a843, transparent);"></div>
            </div>
            <p class="text-sm font-light" style="color: #8a7060;">de compatibilidad</p>
          </div>

          <p class="text-sm font-light leading-relaxed" style="color: #8a7060;">
            Los datos no mienten.<br/>
            Pero falta un último parámetro<br/>para completar el análisis...
          </p>

          <button @click="phase = 2"
            class="px-10 py-4 rounded-full text-sm tracking-[0.25em] uppercase transition-all duration-500"
            style="border: 1.5px solid #d4a843; color: #8a6520; background: linear-gradient(135deg, #fdf8f0, #fdf3dc);"
            @mouseenter="e => e.currentTarget.style.background = 'linear-gradient(135deg, #fdf3dc, #fdeeb0)'"
            @mouseleave="e => e.currentTarget.style.background = 'linear-gradient(135deg, #fdf8f0, #fdf3dc)'"
          >
            Ver resultado final ✦
          </button>
        </div>
      </transition>

      <!-- Fase 2: La pregunta -->
      <transition name="fade-up">
        <div v-if="phase === 2" class="space-y-10">
          <div class="rounded-3xl p-10 shadow-sm space-y-6"
            style="background: rgba(255,252,247,0.9); border: 1px solid #ecddc0;">

            <div class="space-y-3">
              <p class="text-xs tracking-[0.4em] uppercase" style="color: #b8986a;">Parámetro final</p>
              <div class="flex items-center justify-center gap-3">
                <div class="h-px w-10" style="background: linear-gradient(90deg, transparent, #d4a843);"></div>
                <span style="color: #d4a843;">💍</span>
                <div class="h-px w-10" style="background: linear-gradient(90deg, #d4a843, transparent);"></div>
              </div>
            </div>

            <h2 class="text-4xl font-light leading-snug" style="color: #3d2c1e; font-family: 'Playfair Display', serif;">
              ¿Quieres ser<br/>
              <em style="color: #c9803a;">mi esposa?</em>
            </h2>
          </div>

          <!-- Botones -->
          <div class="flex gap-4 justify-center">
            <button @click="answer('yes')"
              class="px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 text-white"
              style="background: linear-gradient(135deg, #d4a843, #f0cc6e); box-shadow: 0 4px 20px rgba(212,168,67,0.35);"
            >
              Sí 💍
            </button>
            <button @click="answer('no')"
              :style="noButtonStyle"
              class="px-8 py-4 rounded-full text-sm tracking-[0.2em] uppercase transition-all duration-200"
              style="border: 1.5px solid #e8d5b0; color: #b8986a; background: #fdf8f0;"
            >
              No
            </button>
          </div>
        </div>
      </transition>

      <!-- Fase 3: Celebración -->
      <transition name="fade-up">
        <div v-if="phase === 3" class="space-y-8">
          <div class="rounded-3xl p-10 shadow-sm space-y-6"
            style="background: rgba(255,252,247,0.92); border: 1px solid #d4a843;">
            <div class="text-5xl">💍</div>
            <div class="space-y-3">
              <p class="text-xs tracking-[0.4em] uppercase" style="color: #d4a843;">100% de compatibilidad</p>
              <h2 class="text-4xl font-light" style="color: #3d2c1e; font-family: 'Playfair Display', serif;">
                ¡Sí, para siempre!
              </h2>
            </div>
            <div class="flex items-center justify-center gap-3">
              <div class="h-px w-10" style="background: linear-gradient(90deg, transparent, #d4a843);"></div>
              <span style="color: #d4a843;">✦</span>
              <div class="h-px w-10" style="background: linear-gradient(90deg, #d4a843, transparent);"></div>
            </div>
            <p class="text-sm font-light leading-relaxed" style="color: #8a7060;">
              {{ personalMessage }}
            </p>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const phase = ref(1)
const showConfetti = ref(false)
const noPos = ref({ x: 0, y: 0 })

// ← Cambia esto por tu mensaje personal
const personalMessage = 'Desde el primer día supe que eras especial. Gracias por cada momento, cada risa y cada abrazo. Quiero construir toda una vida contigo.'

const noButtonStyle = computed(() => ({
  transform: `translate(${noPos.value.x}px, ${noPos.value.y}px)`,
}))

function answer(response) {
  if (response === 'yes') {
    phase.value = 3
    showConfetti.value = true
  } else {
    noPos.value = {
      x: Math.random() * 220 - 110,
      y: Math.random() * 120 - 60,
    }
  }
}

function petalStyle(i) {
  return {
    fontSize: (10 + (i % 4) * 4) + 'px',
    left: `${(i * 5.5) % 100}%`,
    top: '-30px',
    opacity: 0.45,
    animation: `petalFall ${5 + (i % 5)}s ease-in infinite`,
    animationDelay: `${i * 0.5}s`,
  }
}

function particleStyle(i) {
  const colors = ['#d4a843', '#f0cc6e', '#f9a8d4', '#e8d5b0']
  return {
    width: `${2 + (i % 3)}px`,
    height: `${2 + (i % 3)}px`,
    background: colors[i % colors.length],
    left: `${(i * 8) % 100}%`,
    top: `${(i * 11) % 100}%`,
    opacity: 0.5,
    animation: `floatParticle ${3 + (i % 3)}s ease-in-out infinite alternate`,
    animationDelay: `${i * 0.3}s`,
  }
}

function confettiStyle(i) {
  const colors = ['#d4a843', '#f0cc6e', '#f9a8d4', '#fbbf24', '#e8d5b0', '#ffffff']
  return {
    left: `${Math.random() * 100}%`,
    top: '-10px',
    width: `${3 + (i % 4)}px`,
    height: `${8 + (i % 5) * 4}px`,
    background: colors[i % colors.length],
    animation: `confettiFall ${2.5 + (i % 3)}s ease-in forwards`,
    animationDelay: `${(i * 0.08).toFixed(2)}s`,
    opacity: 0.9,
    borderRadius: '2px',
  }
}
</script>

<style scoped>
.fade-up-enter-active { transition: all 0.9s ease; }
.fade-up-enter-from   { opacity: 0; transform: translateY(25px); }

@keyframes petalFall {
  0%   { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0.6; }
  50%  { transform: translateY(50vh) rotate(180deg) translateX(25px); }
  100% { transform: translateY(110vh) rotate(360deg) translateX(-15px); opacity: 0; }
}
@keyframes floatParticle {
  0%   { transform: translateY(0) scale(1); }
  100% { transform: translateY(-18px) scale(1.4); }
}
@keyframes confettiFall {
  0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
</style>