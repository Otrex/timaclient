<template>
  <transition mode="out-in" name="fade-in">
    <template v-if="state === constants.LOADING">
      <UtLoaderIndicator :message="loadingMessage" />
    </template>
    <template v-else-if="data">
      <UtNoResource :message="notFoundMessage" />
    </template>
    <template v-else>
      <div><slot> </slot></div>
    </template>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  loadingMessage: string;
  notFoundMessage: string;
  state: string;
  data: boolean;
}>();
</script>

<style></style>
