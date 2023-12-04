<template>
  <div :class="[!props.active && 'opacity-[.4]']">
    <NuxtLink>
      <div class="flex flex-row gap-[1.25rem]">
        <div class="pt-[0.3125rem]">
          <UiSvgCheck :checked="props.active" />
        </div>
        <div>
          <h4 class="text-[1.4375rem]">{{ props.title }}</h4>
          <span>{{ props.desc }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  desc: string;
  active?: boolean;
}>();
</script>
