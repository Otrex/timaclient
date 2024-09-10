<template>
  <div class="bg-white w-full p-6 shadow-md rounded-lg max-w-[43.75rem]">
    <div class="flex justify-end">
      <button>
        <UtSvg name="close" dim w="1rem" h="1rem" />
      </button>
    </div>
    <div class="mb-3">
      <input
        class="border-b-2 w-full text-2xl py-2 focus:outline-none focus:border-blue-600"
        placeholder="Add title"
      />
    </div>
    <div>
      <div class="flex gap-3 text-lg text-[#545454] flex-row">
        <button
          class="px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
          :class="activeTab === 0 && 'bg-[#99D3FF]/30 text-[#058EF8]'"
        >
          Task
        </button>
        <button
          class="px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
          :class="activeTab === 1 && 'bg-[#99D3FF]/30 text-[#058EF8]'"
        >
          Set Reminder
        </button>
        <button
          class="px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
          :class="activeTab === 2 && 'bg-[#99D3FF]/30 text-[#058EF8]'"
        >
          Schedule campaign post
        </button>
      </div>
      <div>
        <template v-if="activeTab === 0"></template>
        <template v-if="activeTab === 1"></template>
        <template v-if="activeTab === 2"></template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const activeTab = ref(0);
</script>

<style></style>
