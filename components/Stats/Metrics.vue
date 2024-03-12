<template>
  <div class="bg-white rounded dark:bg-slate-700 p-[1rem] pb-[1.875rem]">
    <h5 class="uppercase text-[1rem] !mb-0">{{ props.title }}</h5>
    <div
      v-if="socials.length"
      class="flex flex-row gap-[0.75rem] mb-[1.125rem]"
    >
      <template v-for="(social, idx) in props.socials" :key="idx">
        <div
          class="p-[0.3125rem] rounded aspect-square flex"
          :class="[idx === 1 && 'bg-[#FFE5AD]']"
        >
          <UtSvg :name="`socials/${social}-lg`" dim w="1rem" h="1rem" />
        </div>
      </template>
    </div>
    <div v-else class="mb-[2.1875rem]">&nbsp;</div>

    <template v-if="props.loading">
      <div class="text-center">
        <div class="inline-flex gap-3 items-center">
          <UtSvg name="sunshine" class="spinner" dim w="1.5rem" h="1.5rem" />
          <span> Fetching stats</span>
        </div>
      </div>
    </template>
    <div
      v-else
      :class="[
        'flex flex-wrap ',
        props.justified
          ? 'justify-between text-center'
          : 'gap-x-[8.125rem] gap-y-[1.125rem]',
      ]"
    >
      <template v-for="(entry, idx) in props.data" :key="idx">
        <div>
          <p class="md">{{ entry.value }}</p>
          <p class="text-[--clr-grey-400]">{{ entry.label }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  socials: string[];
  data: {
    label: string | number;
    value: string | number;
  }[];
  justified?: boolean;
  loading?: boolean;
}>();
</script>

<style></style>
