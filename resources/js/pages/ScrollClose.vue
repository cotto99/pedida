<template>
    <div
      class="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden"
      style="background: linear-gradient(160deg, #fdf8f0 0%, #faf3e8 50%, #f5ece0 100%);"
    >
  
      <!-- Pétalos -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div v-for="i in 14" :key="i" class="absolute" :style="petalStyle(i)">🌸</div>
      </div>
  
      <!-- Partículas -->
      <div class="absolute inset-0 pointer-events-none">
        <div v-for="i in 10" :key="'p'+i" class="absolute rounded-full" :style="particleStyle(i)"></div>
      </div>
  
      <!-- Pergamino -->
      <div
        class="relative z-10 w-full max-w-lg scroll-container"
        :class="{ 'scroll-open': animationStarted }"
      >
        <div class="scroll-rod scroll-rod-top">
          <div class="scroll-rod-inner"></div>
        </div>
  
        <div class="scroll-body" :class="{ 'body-open': animationStarted }">
          <div class="scroll-content" :class="{ 'content-visible': contentVisible }">
  
            <!-- Encabezado -->
            <div class="text-center space-y-2 mb-6">
              <p class="text-xs tracking-[0.45em] uppercase" style="color: #b8986a;">Documento Oficial Nº 002</p>
              <div class="flex items-center justify-center gap-3">
                <div class="h-px w-10" style="background: linear-gradient(90deg, transparent, #d4a843);"></div>
                <span style="color: #d4a843; font-size: 16px;">✦</span>
                <div class="h-px w-10" style="background: linear-gradient(90deg, #d4a843, transparent);"></div>
              </div>
              <h1 class="text-3xl font-light mt-2" style="font-family: 'Playfair Display', serif; color: #3d2c1e;">
                Informe de Resultados
              </h1>
              <p class="text-xs tracking-[0.3em] uppercase" style="color: #b8986a;">Análisis Completado · Clasificado: Especial</p>
            </div>
  
            <!-- Separador -->
            <div class="flex items-center gap-3 my-5">
              <div class="flex-1 h-px" style="background: linear-gradient(90deg, transparent, #e8d5b0);"></div>
              <span style="color: #d4a843; font-size: 12px;">❧</span>
              <div class="flex-1 h-px" style="background: linear-gradient(90deg, #e8d5b0, transparent);"></div>
            </div>
  
            <!-- Cuerpo -->
            <div class="space-y-4 text-sm font-light leading-relaxed" style="color: #5c4030;">
  
              <p>
                Estimada <span class="italic" style="color: #c9803a; font-family: 'Playfair Display', serif;">{{ name }}</span>,
              </p>
  
              <p>
                El sistema ha procesado todas tus respuestas con la mayor
                precisión computacional posible. Los algoritmos han trabajado
                sin descanso — algo que, curiosamente, también hago yo
                cuando pienso en ti.
              </p>
  
              <p>
                Tras analizar cada palabra, cada elección y cada momento
                que compartiste en este test, el resultado ha sido
                <span class="font-medium" style="color: #8a6520;">inequívoco, consistente y estadísticamente significativo</span>
                con un nivel de confianza del 99.99%.
              </p>
  
              <p class="text-center py-3 italic text-base" style="font-family: 'Playfair Display', serif; color: #3d2c1e;">
                "Los datos no mienten. Y yo tampoco."
              </p>
  
              <p>
                A continuación podrás ver tu índice oficial de compatibilidad.
                Solo resta una última variable por ingresar al sistema —
                la más importante de todas.
              </p>
  
            </div>
  
            <!-- Separador -->
            <div class="flex items-center gap-3 my-5">
              <div class="flex-1 h-px" style="background: linear-gradient(90deg, transparent, #e8d5b0);"></div>
              <span style="color: #d4a843; font-size: 12px;">❧</span>
              <div class="flex-1 h-px" style="background: linear-gradient(90deg, #e8d5b0, transparent);"></div>
            </div>
  
            <!-- Firma -->
            <div class="text-right space-y-1">
              <p class="text-xs" style="color: #b8986a;">Con todo mi amor,</p>
              <p class="text-xl italic" style="font-family: 'Playfair Display', serif; color: #3d2c1e;">{{ myName }}</p>
              <p class="text-xs" style="color: #b8986a;">Autor del test · Tu futuro esposo</p>
            </div>
  
            <!-- Sello -->
            <div class="flex justify-center mt-6">
              <div class="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2"
                style="border-color: #d4a843; background: rgba(212,168,67,0.08);">
                ✦
              </div>
            </div>
  
            <!-- Botón -->
            <div class="flex justify-center mt-8">
              <button
                @click="goToProposal"
                class="group flex items-center gap-3 px-10 py-4 rounded-full text-sm tracking-[0.25em] uppercase transition-all duration-500"
                style="border: 1.5px solid #d4a843; color: #8a6520; background: linear-gradient(135deg, #fdf8f0, #fdf3dc);"
                @mouseenter="e => e.currentTarget.style.background = 'linear-gradient(135deg, #fdf3dc, #fdeeb0)'"
                @mouseleave="e => e.currentTarget.style.background = 'linear-gradient(135deg, #fdf8f0, #fdf3dc)'"
              >
                <span>Ver mi compatibilidad</span>
                <svg class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
  
          </div>
        </div>
  
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
  
  // ← Personalizá estos valores
  const name   = 'Mi Amor'   // Nombre de tu novia
  const myName = 'Bryan'     // Tu nombre
  
  const animationStarted = ref(false)
  const contentVisible   = ref(false)
  
  onMounted(() => {
    setTimeout(() => { animationStarted.value = true }, 300)
    setTimeout(() => { contentVisible.value   = true }, 1400)
  })
  
  function goToProposal() {
    router.push('/proposal')
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
    height: 28px;
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
  .body-open { max-height: 1200px; }
  
  .scroll-content {
    padding: 32px 36px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
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