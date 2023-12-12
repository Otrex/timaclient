<template>
  <textarea
    v-bind="$attrs"
    :class="[
      $attrs.class,
      'px-[1.5rem] w-full py-[0.75rem] dark:text-black rounded-[1.25rem] text-[1.1875rem] placeholder:text-[#999999]',
    ]"
  ></textarea>
</template>

<script setup lang="ts"></script>

<style></style>
