<template>
  <div
    class="flex flex-col items-center justify-center w-full h-screen bg-white text-black"
  >
    <h1 class="text-9xl font-bold mb-4">404</h1>
    <p class="text-2xl mb-8">Oops! Page Not Found</p>
    <div class="w-64 h-64 mb-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#058ef8"
      >
        <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z" />
      </svg>
    </div>
    <p class="text-xl mb-8">
      Looks like you've ventured into uncharted territory!
    </p>

    <a
      href="/"
      class="bg-[#058ef8] text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300"
    >
      Take Me Home
    </a>
  </div>
</template>
<script setup lang="ts"></script>
<style></style>
