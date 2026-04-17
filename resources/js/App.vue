<template>
  <div class="min-h-screen relative" style="background: linear-gradient(160deg, #fdf8f0 0%, #faf3e8 50%, #f5ece0 100%);">

    <!-- Fondo de recuerdos — visible en TODAS las pantallas -->
    <FloatingPolaroids />

    <!-- Contenido de cada página encima del fondo -->
    <div class="relative" style="z-index: 1;">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

  </div>
</template>

<script setup>
import FloatingPolaroids from '@/components/FloatingPolaroids.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');

* { font-family: 'Inter', sans-serif; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.7s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>