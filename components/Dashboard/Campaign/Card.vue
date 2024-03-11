<template>
  <transition mode="out-in">
    <div
      :class="[
        !noMaxWidth || ' max-w-[23.5rem]',
        '  h-full dark:border-slate-500 rounded dark:bg-slate-800 outline-solid outline-slate-300 hover:outline-4 outline',
      ]"
      v-show="key"
    >
      <div
        class="mb-[1.25rem] rounded rounded-b-none overflow-hidden h-[12.9375rem] relative"
      >
        <template v-if="authStore.authorization.userType !== 'BRAND'">
          <button
            v-if="!props.isBookmark"
            style="--tw-ring-opacity: 0.2"
            :disabled="state === constants.LOADING"
            :class="[
              'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
              avgColor < 128
                ? 'active:ring-slate-100'
                : 'active:ring-slate-700',
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
          @click.prevent.capture="() => deleteBookmark(c(props.bookmarkId))"
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
        class="flex flex-col h-[calc(100%_-_12.9375rem_-_1.25rem)] p-3 px-5 justify-between"
      >
        <div>
          <h3 class="!text-[1.3493rem] leading-3">{{ props.brand }}</h3>
          <span class="text-[--clr-grey-300] text-[0.8125rem]">{{
            props.category
          }}</span>
          <p
            class="text-[--clr-grey-400] dark:text-slate-50 mt-[0.5625rem] nl mb-[1rem]"
          >
            {{ tools.trunc(props.description, 30) }}
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
  </transition>
</template>

<script setup lang="ts">
import { ApiError } from "~/lib/core/Api";

const props = defineProps<{
  image: string;
  category: string[];
  brand: string;
  description: string;
  budget: number;
  deadline: string;
  completion: number;
  title: string;
  publicId: string;
  noMaxWidth?: boolean;
  isBookmark?: boolean;
  bookmarkId?: string;
}>();

const emit = defineEmits(["re-update"]);

const key = ref(0);
const api = useAPI();
const avgColor = ref(0);
const { notify } = useNotification();
const image = ref<HTMLImageElement>();
const colorExtract = useImageColorExtract();
const authStore = useAuthStore();

const c = <T>(e?: T) => e!;

onMounted(() => {
  try {
    colorExtract.getAverageColor(props.image!).then((value) => {
      avgColor.value = value;
    });

    key.value = 1;
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
      bookmarkPublicId: props.publicId,
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
