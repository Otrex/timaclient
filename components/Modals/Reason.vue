<template>
  <div class="bg-white p-5 rounded-lg">
    <h3 class="font-semibold mb-5">Reason</h3>

    <textarea
      class="border border-[#BBBBBB] rounded-lg w-full"
      :rows="6"
    ></textarea>

    <div class="text-right my-5">
      <UiButtonDefault
        @click="$emit('submit')"
        variant="primary"
        class="px-10 py-2"
        label="Submit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
