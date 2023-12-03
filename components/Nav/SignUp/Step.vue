<template>
  <div :class="[!props.active && 'opacity-[.4]']">
    <NuxtLink>
      <div class="flex flex-row gap-[20px]">
        <div class="pt-[5px]">
          <UiSvgCheck :checked="props.active" />
        </div>
        <div>
          <h4 class="text-[23px]">{{ props.title }}</h4>
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
