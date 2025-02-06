<template>
  <div class="flex min-h-screen items-center justify-center">
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
    >
      <div
        v-if="showMessage"
        class="text-center p-8 rounded-lg bg-gray-50 shadow-lg max-w-lg"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          Access Issue Detected
        </h2>
        <p class="text-gray-600 mb-6">
          We noticed you're having trouble accessing your dashboard. Please
          contact your administrator to resolve this access issue.
        </p>
        <div class="text-sm text-gray-500">
          Contact support: support@company.com
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const showMessage = ref(false);
definePageMeta({
  name: "SignUpRedirect",
  middleware: ["permission"],
});

onMounted(() => {
  setTimeout(() => {
    showMessage.value = true;
  }, 3000);
});
</script>
