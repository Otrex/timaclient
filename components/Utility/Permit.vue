<template>
  <div>
    <template v-if="permitted">
      <slot />
    </template>
  </div>
</template>

<script setup lang="ts">
export interface IPermitProps {
  allow?: Array<string>;
  type?: string;
}

const props = withDefaults(defineProps<IPermitProps>(), {
  allow: () => [],
  type: "*",
});

const permitted = computed(() => props.allow.includes(props.type));
</script>

<style></style>
