<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
    style="background: linear-gradient(160deg, #fdf8f0 0%, #faf3e8 50%, #f5ece0 100%);">

    <!-- Pétalos cayendo -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 18" :key="i" class="petal absolute" :style="petalStyle(i)">🌸</div>
    </div>

    <!-- Partículas doradas flotantes -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 15" :key="'p'+i" class="particle absolute rounded-full" :style="particleStyle(i)"></div>
    </div>

    <!-- Contenido -->
    <div class="relative z-10 text-center space-y-10 max-w-sm w-full">

      <div class="space-y-4">
        <p class="text-xs tracking-[0.45em] uppercase" style="color: #b8986a;">Un momento especial</p>
        <h1 class="text-5xl font-light mt-3" style="color: #3d2c1e; font-family: 'Playfair Display', serif;">
          {{ name }}
        </h1>
        <div class="flex items-center justify-center gap-3 mt-3">
          <div class="h-px w-12" style="background: linear-gradient(90deg, transparent, #d4a843);"></div>
          <span style="color: #d4a843; font-size: 14px;">✦</span>
          <div class="h-px w-12" style="background: linear-gradient(90deg, #d4a843, transparent);"></div>
        </div>
      </div>

      <p class="text-sm font-light leading-relaxed" style="color: #8a7060;">
        Tengo algo especial preparado para ti.<br/>
        Tómate todo el tiempo que necesites.
      </p>

      <button
        @click="start"
        class="group relative px-12 py-4 rounded-full text-sm tracking-[0.25em] uppercase transition-all duration-500 overflow-hidden"
        style="border: 1.5px solid #d4a843; color: #8a6520; background: linear-gradient(135deg, #fdf8f0, #fff9f0);"
        @mouseenter="e => e.currentTarget.style.background = 'linear-gradient(135deg, #fdf3dc, #fdf0cc)'"
        @mouseleave="e => e.currentTarget.style.background = 'linear-gradient(135deg, #fdf8f0, #fff9f0)'"
      >
        <span class="relative z-10">Comenzar ✦</span>
      </button>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const name = 'Mi Amor' // ← Cambia por el nombre de tu novia

function start() { router.push('/quiz') }

function petalStyle(i) {
  const size = 10 + (i % 4) * 4
  return {
    fontSize: size + 'px',
    left: `${(i * 6) % 100}%`,
    top: '-30px',
    opacity: 0.5 + (i % 3) * 0.15,
    animation: `petalFall ${5 + (i % 4)}s ease-in infinite`,
    animationDelay: `${i * 0.6}s`,
  }
}

function particleStyle(i) {
  const colors = ['#d4a843', '#f0cc6e', '#f9a8d4', '#e8d5b0']
  return {
    width: `${2 + (i % 3)}px`,
    height: `${2 + (i % 3)}px`,
    background: colors[i % colors.length],
    left: `${(i * 7) % 100}%`,
    top: `${(i * 13) % 100}%`,
    opacity: 0.4,
    animation: `floatParticle ${3 + (i % 3)}s ease-in-out infinite alternate`,
    animationDelay: `${i * 0.4}s`,
  }
}
</script>

<style scoped>
@keyframes petalFall {
  0%   { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0.7; }
  50%  { transform: translateY(50vh) rotate(180deg) translateX(30px); }
  100% { transform: translateY(110vh) rotate(360deg) translateX(-20px); opacity: 0; }
}
@keyframes floatParticle {
  0%   { transform: translateY(0) scale(1); }
  100% { transform: translateY(-20px) scale(1.3); }
}
</style>