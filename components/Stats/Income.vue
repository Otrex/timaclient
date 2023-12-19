<template>
  <section class="bg-[#FFFDF9] p-[1.3125rem] rounded-md">
    <h4 class="pl-3 mb-[1.875rem]">Income</h4>
    <div class="flex flex-col gap-[0.625rem]">
      <template v-for="(set, idx) in data.datasets" :key="idx">
        <div class="flex flex-row gap-[1.875rem]">
          <div class="whitespace-nowrap">
            <p class="nl">{{ set.label }}</p>
          </div>
          <div class="w-full flex flex-row items-center gap-[0.625rem]">
            <p class="nl text-[color:var(--clr-grey-300)]">{{ set.stats }}%</p>
            <div class="w-full rounded overflow-hidden h-[0.3125rem]">
              <div
                :style="restorer(set.stats)"
                class="bg-[#2BA2FD] h-full w-[--w]"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
const data = ref({
  datasets: [
    {
      label: "20,000 - 100,000",
      stats: 50,
    },
    {
      label: "30,000 - 200,000",
      stats: 30,
    },
    {
      label: "40,000 - 300,000",
      stats: 20,
    },
    {
      label: "50,000 - 400,000",
      stats: 60,
    },
  ],
});

function restorer(data: number): string {
  return `--w: ${(data / (highestDataset.value?.stats || 1)) * 100}%`;
}

function findHighestStats(data: Array<{ stats: number; [key: string]: any }>) {
  if (data.length === 0) {
    return null;
  }

  return data.reduce(
    (max, current) => (current.stats > max.stats ? current : max),
    data[0]
  );
}
const highestDataset = computed(() => findHighestStats(data.value.datasets));
</script>

<style></style>
