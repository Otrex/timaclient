<template>
  <div>
    <div ref="target" class="flex flex-row items-center gap-6">
      <button
        @click="show.detail = !show.detail"
        class="border border-[#BBBBBB] hover:bg-gray-100 active:bg-gray-200 text-base rounded-lg px-9 py-2 text-[#545454]"
      >
        Details
      </button>
      <button class="relative" @click="show.option = !show.option">
        <svg
          width="4"
          height="19"
          viewBox="0 0 4 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2" cy="2.5" r="2" fill="#545454" />
          <circle cx="2" cy="9.5" r="2" fill="#545454" />
          <circle cx="2" cy="16.5" r="2" fill="#545454" />
        </svg>
      </button>
      <div
        class="absolute shadow-lg bg-white p-4 rounded-lg"
        v-show="show.option"
      >
        <button
          @click="show.deleteConfirmation = true"
          class="flex hover:bg-gray-100 w-full px-3 pr-6 py-2 rounded-md active:bg-gray-200 flex-row items-center gap-3"
        >
          <UtSvg name="trash" class="w-[1.5rem] h-[1.5rem]" />
          Delete
        </button>
        <button
          class="flex hover:bg-gray-100 px-3 pr-6 py-2 rounded-md active:bg-gray-200 flex-row items-center gap-3"
        >
          <UtSvg name="download" class="w-[1.5rem] h-[1.5rem]" />
          Download
        </button>
      </div>
    </div>
    <UtModal
      v-model:state="show.detail"
      m-width="45.625rem"
      backdrop-color="rgba(0,0,0,.1)"
    >
      <div class="bg-white pb-10 rounded-[1.25rem]">
        <div class="p-8">
          <div class="flex justify-between mb-[10px] items-center">
            <h2 class="font-bold text-[1.25rem]">Transaction Details</h2>
            <button @click="show.detail = false">
              <UtSvg name="close" class="w-[1.5rem] h-[1.5rem]" />
            </button>
          </div>
          <div class="flex items-center flex-row gap-2">
            <div class="w-8 h-8 overflow-hidden rounded-full">
              <UiImg src="" alt="" class="w-full h-full object-cover" />
            </div>
            <span>Efe Money</span>
          </div>
        </div>
        <UtDataTable
          :thead="thead"
          :tclass="{
            thead: 'bg-[#F7F7F7] px-6 !font-medium',
            tbody: 'px-6 py-2',
          }"
          :tbody="tbody"
        />
      </div>
    </UtModal>
    <UiModalConfirmAction
      ref="confirm"
      @onapprove="approve"
      @oncancel="show.deleteConfirmation = false"
    >
      <template #title> Confirm Delete </template>
      <template #body>
        Are you you want to proceed to delete this transaction?.
      </template>
    </UiModalConfirmAction>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";

const target = ref(null);
const confirm = ref<{
  open: () => void;
  close: () => void;
  modelState: Ref<boolean>;
}>();

onClickOutside(target, (_) => (show.option = false));

function approve() {}

const props = defineProps({
  transaction: {
    type: Object,
  },
});

const show = reactive({
  deleteConfirmation: false,
  detail: false,
  option: false,
});

watch(
  () => show.deleteConfirmation,
  () => {
    if (show.deleteConfirmation) {
      confirm.value!.open();
    }
  }
);

const thead = [
  "Campaign Name",
  "Campaign Details",
  "Start Date",
  "End Date",
].map((i) => ({ label: i, key: i.toLowerCase().replace(" ", "_") }));

const tbody = [
  {
    campaign_name: "Unity Drive",
    campaign_details: `Raise awareness about
sustainable living and
encourage individuals to
adopt eco-friendly habits.`,
    start_date: "21/07/2024",
    end_date: "21/07/2024",
  },
];
</script>

<style></style>
