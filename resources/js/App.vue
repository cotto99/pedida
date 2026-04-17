<template>
  <div class="min-h-screen" style="background: #faf7f2;">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');

* { font-family: 'Inter', sans-serif; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.7s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>