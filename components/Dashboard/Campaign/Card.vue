<template>
  <div
    :class="[
      !noMaxWidth || 'max-w-[23.5rem]',
      ' rounded-[1.25rem] h-full p-[1.25rem] border border-solid border-[#E7E7E7] dark:border-slate-500',
    ]"
  >
    <div
      class="rounded-[1.25rem] mb-[1.25rem] overflow-hidden h-[12.9375rem] relative"
    >
      <template v-if="authStore.authorization.userType !== 'BRAND'">
        <button
          v-if="!props.isBookmark"
          style="--tw-ring-opacity: 0.2"
          :disabled="state === constants.LOADING"
          :class="[
            'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
            avgColor < 128 ? 'active:ring-slate-100' : 'active:ring-slate-700',
          ]"
          @click.prevent.capture="() => execute()"
        >
          <UtSvg
            v-if="state === constants.LOADING"
            name="sunshine"
            :class="[
              'spinner w-[1.5rem] h-[1.5rem]',
              avgColor > 128 ? 'text-black' : 'text-white',
            ]"
          />
          <UtSvg
            v-else
            name="bookmark"
            :class="[
              'w-[1.5rem] h-[1.5rem]',
              avgColor > 128 ? 'text-black' : 'text-white',
            ]"
          />
        </button>
      </template>
      <button
        v-if="props.isBookmark"
        style="--tw-ring-opacity: 0.2"
        :disabled="state === constants.LOADING"
        :class="[
          'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
          avgColor < 128 ? 'active:ring-slate-100' : 'active:ring-slate-700',
        ]"
        @click.prevent.capture="() => deleteBookmark(props.title)"
      >
        <UtSvg
          v-if="deleteState === constants.LOADING"
          name="sunshine"
          :class="[
            'spinner w-[1.5rem] h-[1.5rem]',
            avgColor > 128 ? 'text-black' : 'text-white',
          ]"
        />
        <UtSvg
          v-else
          name="trash"
          :class="[
            'w-[1.5rem] h-[1.5rem]',
            avgColor > 128 ? 'text-black' : 'text-white',
          ]"
        />
      </button>
      <UiImg
        ref="image"
        class="w-full h-full object-cover"
        :src="props.image"
        alt="campaign banner"
        lazy
      />
    </div>
    <div
      class="flex flex-col h-[calc(100%_-_12.9375rem_-_1.25rem)] justify-between"
    >
      <div>
        <h3 class="!text-[1.3493rem] leading-3">{{ props.brand }}</h3>
        <span class="text-[--clr-grey-300] text-[0.8125rem]">{{
          props.category
        }}</span>
        <p
          class="text-[--clr-grey-400] dark:text-slate-50 mt-[0.5625rem] nl mb-[1rem]"
        >
          {{ props.description }}
        </p>
      </div>
      <div>
        <p class="text-[--clr-grey-500] dark:text-slate-300 nl mb-[0.75rem]">
          Budget:
          <span class="text-black dark:text-slate-50">{{
            tools.formatCurrency(props.budget, "&#8358;")
          }}</span>
        </p>
        <p class="text-[--clr-grey-500] dark:text-slate-300 nl mb-[0.75rem]">
          Deadline:
          <span class="text-black dark:text-slate-50">{{
            tools.formatDate(props.deadline)
          }}</span>
        </p>
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
  </div>
</template>

<script setup lang="ts">
import { ApiError } from "~/lib/core/Api";

const props = defineProps<{
  image: string;
  category: string;
  brand: string;
  description: string;
  budget: number;
  deadline: string;
  completion: number;
  title: string;
  publicId: string;
  noMaxWidth?: boolean;
  isBookmark?: boolean;
}>();

const emit = defineEmits(["re-update"]);

const api = useAPI();
const avgColor = ref(0);
const { notify } = useNotification();
const image = ref<HTMLImageElement>();
const colorExtract = useImageColorExtract();
const authStore = useAuthStore();

onMounted(() => {
  try {
    colorExtract.getAverageColor(props.image!).then((value) => {
      avgColor.value = value;
    });
  } catch (error) {}
});

const { state, execute } = useRequestState({
  action: () => {
    if (!props.publicId || !props.title) {
      throw new ApiError({
        message: "Invalid Campaign",
      });
    }
    return api.addBookmark({
      title: props.title,
      campaignPublicId: props.publicId,
    });
  },
  onSuccess() {
    notify({
      type: "success",
      title: `${props.title} bookmarked`,
      text: "This campaign has been bookmarked successfully",
    });
  },
  onError(error) {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});

const { state: deleteState, execute: deleteBookmark } = useRequestState({
  action: (name: string) => api.deleteBookmark(name),
  onSuccess() {
    notify({
      type: "success",
      title: `${props.title} deleted`,
      text: "This campaign has been removed form the bookmark",
    });

    emit("re-update");
  },
  onError(error) {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});
</script>

<style></style>
