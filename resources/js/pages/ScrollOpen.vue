<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">

    <!-- Pétalos de fondo -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 14" :key="i" class="absolute" :style="petalStyle(i)">🌸</div>
    </div>

    <!-- Partículas doradas -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 10" :key="'p'+i" class="absolute rounded-full" :style="particleStyle(i)"></div>
    </div>

    <!-- Pergamino -->
    <div class="relative z-10 w-full max-w-lg scroll-container">

      <!-- Rollo superior -->
      <div class="scroll-rod scroll-rod-top">
        <div class="scroll-rod-inner"></div>
      </div>

      <!-- Cuerpo del pergamino -->
      <div class="scroll-body" :class="{ 'body-open': animationStarted }">
        <div class="scroll-content" :class="{ 'content-visible': contentVisible }">

          <!-- Encabezado oficial -->
          <div class="text-center space-y-2 mb-5">
            <p class="text-xs tracking-[0.45em] uppercase" style="color: #b8986a;">Documento Oficial Nº 001</p>
            <div class="flex items-center justify-center gap-3">
              <div class="h-px w-10" style="background: linear-gradient(90deg, transparent, #d4a843);"></div>
              <span style="color: #d4a843; font-size: 16px;">✦</span>
              <div class="h-px w-10" style="background: linear-gradient(90deg, #d4a843, transparent);"></div>
            </div>
            <h1 class="text-2xl sm:text-3xl font-light mt-2" style="font-family: 'Playfair Display', serif; color: #3d2c1e;">
              Test de Compatibilidad
            </h1>
            <p class="text-xs tracking-[0.3em] uppercase" style="color: #b8986a;">Edición Especial · Versión 1.0</p>
          </div>

          <!-- Separador -->
          <div class="flex items-center gap-3 my-4">
            <div class="flex-1 h-px" style="background: linear-gradient(90deg, transparent, #e8d5b0);"></div>
            <span style="color: #d4a843; font-size: 12px;">❧</span>
            <div class="flex-1 h-px" style="background: linear-gradient(90deg, #e8d5b0, transparent);"></div>
          </div>

          <!-- Cuerpo del texto -->
          <div class="space-y-3 text-sm font-light leading-relaxed" style="color: #5c4030;">

            <p>
              Estimada <span class="italic" style="color: #c9803a; font-family: 'Playfair Display', serif;">{{ name }}</span>,
            </p>

            <p>
              Después de <span class="font-medium" style="color: #8a6520;">{{ months }} meses</span> de recopilación
              de datos, análisis estadístico y observación de campo, me complace presentarte el siguiente
              instrumento de medición afectiva, diseñado específicamente para cuantificar lo que la
              ciencia aún no ha podido explicar del todo:
            </p>

            <p class="text-center py-2 italic text-base" style="font-family: 'Playfair Display', serif; color: #3d2c1e;">
              "Lo nuestro."
            </p>

            <p>
              Este test consta de <span class="font-medium" style="color: #8a6520;">{{ questionCount }} preguntas</span> cuidadosamente
              formuladas. No tiene respuestas incorrectas. Solo tiene <em>tus</em> respuestas,
              y esas son exactamente las que necesito.
            </p>

            <p>
              Al finalizar, el sistema calculará un índice de compatibilidad basado en
              algoritmos propietarios desarrollados con mucho amor y algunas líneas de código.
            </p>

          </div>

          <!-- Separador -->
          <div class="flex items-center gap-3 my-4">
            <div class="flex-1 h-px" style="background: linear-gradient(90deg, transparent, #e8d5b0);"></div>
            <span style="color: #d4a843; font-size: 12px;">❧</span>
            <div class="flex-1 h-px" style="background: linear-gradient(90deg, #e8d5b0, transparent);"></div>
          </div>

          <!-- Firma -->
          <div class="text-right space-y-1">
            <p class="text-xs" style="color: #b8986a;">Firmado con cariño,</p>
            <p class="text-xl italic" style="font-family: 'Playfair Display', serif; color: #3d2c1e;">{{ myName }}</p>
            <p class="text-xs" style="color: #b8986a;">Tu Ingeniero Guapo</p>
          </div>

          <!-- Sello decorativo -->
          <div class="flex justify-center mt-5">
            <div class="w-14 h-14 rounded-full flex items-center justify-center text-xl border-2"
              style="border-color: #d4a843; background: rgba(212,168,67,0.08);">
              ✦
            </div>
          </div>

          <!-- Botón — siempre visible -->
          <div class="flex justify-center mt-6 pb-2">
            <button
              @click="goToQuiz"
              class="group flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all duration-500"
              style="border: 1.5px solid #d4a843; color: #8a6520; background: linear-gradient(135deg, #fdf8f0, #fdf3dc);"
              @mouseenter="e => e.currentTarget.style.background = 'linear-gradient(135deg, #fdf3dc, #fdeeb0)'"
              @mouseleave="e => e.currentTarget.style.background = 'linear-gradient(135deg, #fdf8f0, #fdf3dc)'"
            >
              <span>Aceptar y comenzar</span>
              <svg class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      <!-- Rollo inferior -->
      <div class="scroll-rod scroll-rod-bottom">
        <div class="scroll-rod-inner"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name         = 'Mi Princesa'
const myName       = 'Ing. Bryan Cotto'
const months       = 44
const questionCount = 6

const animationStarted = ref(false)
const contentVisible   = ref(false)

onMounted(() => {
  setTimeout(() => { animationStarted.value = true  }, 300)
  setTimeout(() => { contentVisible.value   = true  }, 1400)
})

function goToQuiz() {
  router.push('/quiz')
}

function petalStyle(i) {
  return {
    fontSize: (10 + (i % 4) * 4) + 'px',
    left: `${(i * 7) % 100}%`,
    top: '-30px',
    opacity: 0.4,
    animation: `petalFall ${5 + (i % 4)}s ease-in infinite`,
    animationDelay: `${i * 0.7}s`,
  }
}

function particleStyle(i) {
  const colors = ['#d4a843', '#f0cc6e', '#f9a8d4', '#e8d5b0']
  return {
    width: `${2 + (i % 3)}px`,
    height: `${2 + (i % 3)}px`,
    background: colors[i % colors.length],
    left: `${(i * 9) % 100}%`,
    top: `${(i * 13) % 100}%`,
    opacity: 0.45,
    animation: `floatParticle ${3 + (i % 3)}s ease-in-out infinite alternate`,
    animationDelay: `${i * 0.4}s`,
  }
}
</script>

<style scoped>
.scroll-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 20px 60px rgba(180,140,80,0.18));
}

.scroll-rod {
  width: 100%;
  height: 24px;
  border-radius: 14px;
  background: linear-gradient(180deg, #f0cc6e 0%, #c9a84c 40%, #a8843c 100%);
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(180,130,50,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroll-rod-inner {
  width: 92%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%);
}
.scroll-rod-top    { border-radius: 14px 14px 4px 4px; }
.scroll-rod-bottom { border-radius: 4px 4px 14px 14px; }

.scroll-body {
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 1.1s cubic-bezier(0.4, 0, 0.2, 1);
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(212,168,67,0.06) 28px,
      rgba(212,168,67,0.06) 29px
    ),
    linear-gradient(180deg, #fffdf7 0%, #fdf8ee 50%, #faf4e6 100%);
  border-left:  2.5px solid #e8d5b0;
  border-right: 2.5px solid #e8d5b0;
  position: relative;
}
.scroll-body::before,
.scroll-body::after {
  content: '';
  position: absolute;
  left: 10px; right: 10px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #d4a843, transparent);
  z-index: 3;
}
.scroll-body::before { top: 0; }
.scroll-body::after  { bottom: 0; }

/* ── CLAVE: max-height generoso para que quepa en móvil ── */
.body-open {
  max-height: 2000px;
}

.scroll-content {
  padding: 24px 24px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
}

/* Más padding en pantallas grandes */
@media (min-width: 640px) {
  .scroll-content {
    padding: 32px 36px;
  }
}

.content-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes petalFall {
  0%   { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0.6; }
  50%  { transform: translateY(50vh) rotate(180deg) translateX(25px); }
  100% { transform: translateY(110vh) rotate(360deg) translateX(-15px); opacity: 0; }
}
@keyframes floatParticle {
  0%   { transform: translateY(0) scale(1); }
  100% { transform: translateY(-18px) scale(1.4); }
}
</style>