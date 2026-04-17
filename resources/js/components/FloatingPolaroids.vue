<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden" style="z-index: 0;">

    <!-- Cinta superior — se mueve de derecha a izquierda -->
    <div class="photo-track track-top">
      <div
        v-for="(photo, i) in [...photos, ...photos]"
        :key="'top-' + i"
        class="photo-card"
        :style="cardStyle(i, 'top')"
      >
        <img :src="photo.src" :alt="photo.alt" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Cinta inferior — se mueve de izquierda a derecha -->
    <div class="photo-track track-bottom">
      <div
        v-for="(photo, i) in [...photos, ...photos]"
        :key="'bot-' + i"
        class="photo-card"
        :style="cardStyle(i, 'bottom')"
      >
        <img :src="photo.src" :alt="photo.alt" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Cinta central — se mueve de derecha a izquierda, más lento -->
    <div class="photo-track track-middle">
      <div
        v-for="(photo, i) in [...photos, ...photos]"
        :key="'mid-' + i"
        class="photo-card"
        :style="cardStyle(i, 'middle')"
      >
        <img :src="photo.src" :alt="photo.alt" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Overlay general para fundir con el fondo -->
    <div class="absolute inset-0" style="background: rgba(253, 248, 240, 0.72);"></div>

  </div>
</template>

<script setup>
// ── Agregá todas tus fotos aquí ──
const photos = [
  { src: '/images/foto1.jpeg', alt: 'recuerdo 1' },
  { src: '/images/foto2.jpeg', alt: 'recuerdo 2' },
  { src: '/images/foto3.jpeg', alt: 'recuerdo 3' },
  { src: '/images/foto4.jpeg', alt: 'recuerdo 4' },
  { src: '/images/foto5.jpeg', alt: 'recuerdo 5' },
  { src: '/images/foto6.jpeg', alt: 'recuerdo 6' },
  { src: '/images/foto7.jpeg', alt: 'recuerdo 7' },
  { src: '/images/foto8.jpeg', alt: 'recuerdo 8' },
]

const rotations = {
  top:    [-6, -2,  4, -4,  2, -5,  3, -3],
  bottom: [ 5, -3,  2, -6,  4, -2,  6, -4],
  middle: [-3,  5, -2,  4, -5,  2, -4,  3],
}

function cardStyle(i, track) {
  const rot = rotations[track][i % rotations[track].length]
  return {
    transform: `rotate(${rot}deg)`,
    filter: 'sepia(50%) brightness(0.97) saturate(0.75)',
    opacity: 0.55,
  }
}
</script>

<style scoped>
/* ── Contenedor de cada cinta ── */
.photo-track {
  position: absolute;
  display: flex;
  gap: 20px;
  align-items: center;
  width: max-content;
}

/* ── Posición vertical de cada cinta ── */
.track-top {
  top: 4%;
  animation: scrollLeft 35s linear infinite;
}
.track-middle {
  top: 44%;
  transform: translateY(-50%);
  animation: scrollRight 45s linear infinite;
}
.track-bottom {
  bottom: 4%;
  animation: scrollLeft 38s linear infinite;
  animation-delay: -10s;
}

/* ── Cada foto ── */
.photo-card {
  width: 160px;
  height: 160px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(160, 120, 60, 0.12);
  background: #f5ece0;
}

/* ── Movimiento continuo ── */
@keyframes scrollLeft {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes scrollRight {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>