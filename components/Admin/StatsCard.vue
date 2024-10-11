<template>
  <div
    class="bg-[#F7F7F7] hover:outline hover:outline-black drop-shadow-[0px_0px_4px_0px_#000000] rounded-2xl w-full p-5 hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,.25)] transition-all duration-300 ease-in-out"
  >
    <div class="flex items-center justify-between">
      <h1 class="text-[#898989] font-bold text-[20px]">{{ title }}</h1>
      <div><UtSvg name="love" dim w="21px" h="21px" /></div>
    </div>

    <div role="divider" class="mt-10"></div>

    <div class="flex justify-between items-end py-8">
      <h1 class="w-6/12 text-center font-medium text-[48px] text-[#434343]">
        {{ value }}
      </h1>

      <p class="w-6/12 text-center font-medium text-base text-[#818181]">
        {{ value }}
      </p>
    </div>

    <div role="divider" class="mt-10"></div>

    <div
      class="border-l-[10px] border-[#F2BF0D] rounded-xl px-3 py-0.5 w-full min-h-[88.4px]"
    >
      <div>
        <p class="text-[13px] text-[#898989]">Average Daily Sign Ups</p>
      </div>

      <div role="divider" class="mt-3"></div>

      <div class="flex items-center justify-between gap-3">
        <div class="w-6/12">
          <h1 class="text-[#FF0042]">7.3</h1>
        </div>

        <div class="w-6/12 flex gap-3 items-center justify-center">
          <p class="text-[#FF0000] text-[13px] font-medium">-2.6%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
}>();
</script>

<style></style>
