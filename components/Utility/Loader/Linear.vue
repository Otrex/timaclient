<template>
  <div class="fixed z-[100000] top-0 left-0 right-0">
    <div class="vars container">
      <div class="bar"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.vars {
  --clr-1: #f1c40f;
  /* --clr-2: #2c3e50; */
  --clr-2: red;
  --speed: 3s;
}

@keyframes slide {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: 113px;
  }
}
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container .bar {
  min-height: 5px;
  border-radius: 10px;
  width: 130%;
  transform: scaleX(2);
  background-color: var(--clr-2);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 40px,
    var(--clr-1) 40px,
    var(--clr-1) 80px
  );
  animation: slide var(--speed) linear infinite;
  will-change: background-position;
}
@media only screen and (max-width: 450px) {
  .container .bar {
    width: calc(113px * 3);
  }
}
@media only screen and (max-width: 350px) {
  .container .bar {
    width: calc(113px * 2);
  }
}
</style>
