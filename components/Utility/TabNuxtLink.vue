<template>
  <NuxtLink
    :to="{
      name: name,
    }"
    class="relative pb-[0.4rem]"
    :class="{
      'opacity-50': $route.name !== name,
    }"
  >
    <slot></slot>
    <div
      v-if="$route.name === name"
      :class="{
        'w-4 absolute h-[0.4rem] mt-0.5 bottom-0 translate-x-[-50%] rounded-3xl left-1/2 inline-block bg-blue-600':
          $route.name === name,
      }"
    >
      &nbsp;
    </div>
  </NuxtLink>
</template>
<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
