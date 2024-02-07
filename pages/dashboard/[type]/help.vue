<template>
  <div class="flex justify-center h-full mt-[100px]">
    <div class="max-w-[400px] w-full">
      <h1 class="font-bold text-center">Help & Support</h1>
      <p class="mb-3 text-center">Send us your request or complains</p>

      <div class="max-w-[400px] w-full">
        <div class="mb-3">
          <UiInputText class="w-full" placeholder="Enter the subject" />
        </div>
        <div class="w-full mb-3">
          <UiInputTextArea
            placeholder="Enter the message"
            class="h-[200px]"
            row="5"
          />
        </div>
        <div>
          <UiButtonDefault variant="primary" class="w-full px-3 py-3">
            Send
          </UiButtonDefault>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Help & Support",
});
</script>

<style></style>
