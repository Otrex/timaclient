<template>
  <transition mode="out-in" name="fade-in">
    <template v-if="state === constants.LOADING">
      <slot name="loading">
        <UtLoaderIndicator
          :class="textClass"
          :message="loadingMessage || 'Loading...'"
        />
      </slot>
    </template>
    <template v-else-if="data || empty">
      <slot name="empty">
        <UtNoResource
          :class="textClass"
          :message="notFoundMessage || 'Resource not found'"
        />
      </slot>
    </template>
    <template v-else>
      <div><slot> </slot></div>
    </template>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  loadingMessage?: string;
  notFoundMessage?: string;
  state: string;
  data?: boolean;
  empty?: boolean;
  textClass?: string;
}>();
</script>

<style></style>
