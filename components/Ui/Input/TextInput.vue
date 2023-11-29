<template>
  <input v-bind="$attrs" :class="[$attrs.class]" />
</template>

<script setup lang="ts">
interface IProps {}

const props = defineProps<IProps>();
</script>

<style scoped></style>
