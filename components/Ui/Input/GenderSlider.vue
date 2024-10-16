<template>
  <div class="flex flex-row gap-4 justify-around items-center">
    100%
    <div class="gender-slider">
      <input
        type="range"
        v-model="genderValue"
        min="0"
        max="100"
        class="slider"
        @input="updateGender"
      />
      <div class="labels dark:text-white">
        <span class="dark:text-white">Male</span>
        <span class="dark:text-white">Female</span>
      </div>
    </div>
    100%
  </div>
</template>

<script setup>
import { ref } from "vue";

// Reactive value for the slider
const genderValue = ref(50);

// Function to handle slider input
const updateGender = () => {
  console.log(`Gender value: ${genderValue.value}%`);
};
</script>

<style scoped>
.gender-slider {
  width: 100%;
  margin: 20px auto;
  position: relative;
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: linear-gradient(to right, #3a89e9, #f06fa9);
  border-radius: 10px;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.15s ease-in-out;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #ccc;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #ccc;
  cursor: pointer;
}

.labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.labels span {
  font-size: 14px;
  color: #555;
}
</style>
