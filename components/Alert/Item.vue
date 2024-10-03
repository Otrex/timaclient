<template>
  <UtModal v-model:state="isAlerting" m-width="30rem">
    <div
      class="flex flex-col items-center text-center py-20 px-16 bg-white rounded-xl dark:bg-slate-900 gap-6"
    >
      <template v-if="alertType === 'success'">
        <svg
          width="101"
          height="100"
          viewBox="0 0 101 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.1673 50L47.1673 66.6666L73.834 33.3333M50.5006 96.6666C44.3723 96.6666 38.304 95.4596 32.6421 93.1144C26.9802 90.7691 21.8357 87.3317 17.5023 82.9983C13.1689 78.6649 9.73149 73.5204 7.38627 67.8585C5.04105 62.1967 3.83398 56.1283 3.83398 50C3.83398 43.8716 5.04105 37.8033 7.38627 32.1414C9.73149 26.4796 13.1689 21.3351 17.5023 17.0017C21.8357 12.6683 26.9802 9.23082 32.6421 6.8856C38.304 4.54038 44.3723 3.33331 50.5006 3.33331C62.8774 3.33331 74.7473 8.24997 83.499 17.0017C92.2507 25.7534 97.1673 37.6232 97.1673 50C97.1673 62.3767 92.2507 74.2466 83.499 82.9983C74.7473 91.75 62.8774 96.6666 50.5006 96.6666Z"
            stroke="#00FF75"
            stroke-width="3"
          />
        </svg>
      </template>
      <template v-else>
        <svg
          width="84"
          height="84"
          viewBox="0 0 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.9987 62.8333L41.9987 47.8333L56.9987 62.8333L62.832 57L47.832 42L62.832 27L56.9987 21.1666L41.9987 36.1666L26.9987 21.1666L21.1654 27L36.1654 42L21.1654 57L26.9987 62.8333ZM41.9987 83.6666C36.2348 83.6666 30.8181 82.5722 25.7487 80.3833C20.6793 78.1944 16.2695 75.2264 12.5195 71.4791C8.76954 67.7319 5.80148 63.3222 3.61537 58.25C1.42926 53.1778 0.334814 47.7611 0.332037 42C0.329259 36.2389 1.4237 30.8222 3.61537 25.75C5.80704 20.6778 8.77509 16.268 12.5195 12.5208C16.264 8.77359 20.6737 5.80554 25.7487 3.61665C30.8237 1.42776 36.2404 0.333313 41.9987 0.333313C47.757 0.333313 53.1737 1.42776 58.2487 3.61665C63.3237 5.80554 67.7334 8.77359 71.4779 12.5208C75.2223 16.268 78.1918 20.6778 80.3862 25.75C82.5806 30.8222 83.6737 36.2389 83.6654 42C83.657 47.7611 82.5626 53.1778 80.382 58.25C78.2015 63.3222 75.2334 67.7319 71.4779 71.4791C67.7223 75.2264 63.3126 78.1958 58.2487 80.3875C53.1848 82.5791 47.7681 83.6722 41.9987 83.6666Z"
            fill="#EC2B29"
          />
        </svg>
      </template>
      <h2 v-if="alertTitle" class="font-bold text-2xl">
        {{ alertTitle || "Something went wrong" }}
      </h2>
      <p v-if="alertMessage">
        {{ alertMessage || "Please contact the Admin if issue still persits" }}
      </p>
      <slot name="more" :type="alertType"></slot>
    </div>
  </UtModal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  isAlerting: {
    type: Boolean,
    default: false,
  },
  alertType: {
    type: String,
    default: "success",
  },
  alertTitle: {
    type: String,
    default: "",
  },
  alertMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:isAlerting"]);

const isAlerting = ref(props.isAlerting);

watch(
  () => props.isAlerting,
  (newValue) => {
    isAlerting.value = newValue;
  }
);

watch(isAlerting, (newValue) => {
  emit("update:isAlerting", newValue);
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
