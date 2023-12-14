<template>
  <div
    class="max-w-[23.5rem] rounded-[1.25rem] h-full p-[1.25rem] border border-solid border-[#E7E7E7]"
  >
    <div
      class="rounded-[1.25rem] mb-[1.25rem] overflow-hidden h-[12.9375rem] relative"
    >
      <button
        style="--tw-ring-opacity: 0.2"
        :class="[
          'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
          avgColor < 128 ? 'active:ring-slate-100' : 'active:ring-slate-700',
        ]"
      >
        <UtSvg
          name="bookmark"
          :class="[
            'w-[1.5rem] h-[1.5rem]',
            avgColor > 128 ? 'text-black' : 'text-white',
          ]"
        />
      </button>
      <img ref="image" :src="props.image" alt="campaign banner" />
    </div>
    <div>
      <h3 class="!text-[1.3493rem] leading-3">{{ props.brand }}</h3>
      <span class="text-[--clr-grey-300] text-[0.8125rem]">{{
        props.category
      }}</span>
      <p class="text-[--clr-grey-400] mt-[0.5625rem] nl mb-[1rem]">
        {{ props.description }}
      </p>
      <div>
        <p class="text-[--clr-grey-500] nl mb-[0.75rem]">
          Budget:
          <span class="text-black">{{
            tools.formatCurrency(props.budget, "&#8358;")
          }}</span>
        </p>
        <p class="text-[--clr-grey-500] nl mb-[0.75rem]">
          Deadline:
          <span class="text-black">{{ tools.formatDate(props.deadline) }}</span>
        </p>
      </div>
      <div v-if="props.completion === 100">
        <span class="text-green-500 text-[0.875rem]">Completed</span>
      </div>
      <div v-else class="flex items-center gap-[0.625rem]">
        <div class="bg-[#D9D9D9] w-full rounded-lg overflow-hidden">
          <div
            class="bg-[#333] h-[0.4375rem] w-[--percent]"
            :style="`--percent: ${props.completion}%`"
          ></div>
        </div>
        <div class="whitespace-nowrap">{{ props.completion }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string;
  category: string;
  brand: string;
  description: string;
  budget: number;
  deadline: string;
  completion: number;
}>();

const avgColor = ref(0);
const image = ref<HTMLImageElement>();
const colorExtract = useImageColorExtract();

onMounted(() => {
  colorExtract.getAverageColor(image.value?.src!).then((value) => {
    avgColor.value = value;
  });
});
</script>

<style></style>
