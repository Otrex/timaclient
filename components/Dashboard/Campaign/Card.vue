<template>
  <transition mode="out-in">
    <div
      :class="[
        !noMaxWidth || ' max-w-[23.5rem]',
        'h-full dark:border-slate-500 rounded dark:bg-slate-800 outline-solid outline-slate-200 hover:outline-4 hover:outline-red-600 outline',
      ]"
    >
      <div
        class="mb-[1.25rem] rounded rounded-b-none overflow-hidden h-[12.9375rem] relative"
      >
        <template v-if="authStore.userType !== 'BRAND'">
          <button
            v-if="!props.isBookmark"
            :disabled="state === constants.LOADING"
            :class="[
              'absolute active:ring-4 transition-all hover:ring-2 tag rounded-md z-[999]  right-[0.75rem] top-[0.75rem]',
            ]"
            @click.prevent.capture="() => execute()"
          >
            <UtSvg
              v-if="state === constants.LOADING"
              name="sunshine"
              :class="['spinner w-[1.5rem] tag h-[1.5rem]']"
            />
            <UtSvg
              v-else
              name="bookmark"
              :class="['w-[1.5rem] tag h-[1.5rem]']"
            />
          </button>
        </template>
        <button
          v-if="props.isBookmark"
          style="--tw-ring-opacity: 0.2"
          :disabled="state === constants.LOADING"
          :class="[
            'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
          ]"
          @click.prevent.capture="() => deleteBookmark(c(props.bookmarkId))"
        >
          <UtSvg
            v-if="deleteState === constants.LOADING"
            name="sunshine"
            :class="['spinner w-[1.5rem] tag h-[1.5rem]']"
          />
          <UtSvg v-else name="trash" :class="['w-[1.5rem] tag h-[1.5rem]']" />
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
          <h3 class="!text-[1.3493rem] leading-3">{{ props.title }}</h3>
          <span
            v-if="props.category && props.category.length"
            class="text-[--clr-grey-300] text-[0.8125rem]"
          >
            <TextTrunc :text="props.category.join(', ')" :max="15" show-btn />
          </span>
          <p
            class="text-[--clr-grey-400] dark:text-slate-50 mt-[0.5625rem] nl mb-[1rem]"
          >
            {{ tools.trunc(props.description, 30) }}
          </p>
        </div>
        <div>
          <!-- <p class="text-[--clr-grey-500] dark:text-slate-300 nl mb-[0.75rem]">
            Budget:
            <span class="text-black dark:text-slate-50">{{
              tools.formatCurrency(props.budget, "&#8358;")
            }}</span>
          </p> -->
          <p
            v-if="props.deadline"
            class="text-[--clr-grey-500] dark:text-slate-300 nl mb-[0.75rem]"
          >
            Deadline:
            <span class="text-black dark:text-slate-50">{{
              tools.formatDate(props.deadline)
            }}</span>
          </p>

          <div class="flex flex-row gap-3 justify-between items-center">
            <div class="flex w-full items-center">
              <div class="w-full" v-if="props.completion === 100">
                <span class="text-green-500 text-[0.875rem]">Completed</span>
              </div>
              <div v-else class="flex items-center w-full gap-[0.625rem]">
                <div class="bg-[#D9D9D9] w-full rounded-lg overflow-hidden">
                  <div
                    class="bg-[#333] h-[0.4375rem] w-[--percent]"
                    :style="`--percent: ${props.completion}%`"
                  ></div>
                </div>
                <div class="whitespace-nowrap">{{ props.completion }}%</div>
              </div>
            </div>
            <div v-if="props.status" class="ml-auto">
              <div
                class="text-sm"
                :class="[
                  props.status === 'APPROVED' && '!text-green-500',
                  'text-gray-500',
                ]"
              >
                {{ props.status }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string;
  category: string[];
  brand: string;
  description: string;
  budget: number;
  deadline: string;
  completion: number;
  status?: string;
  title: string;
  publicId: string;
  noMaxWidth?: boolean;
  isBookmark?: boolean;
  bookmarkId?: string;
}>();

const emit = defineEmits(["re-update"]);

const api = useAPI();
const { notify } = useNotification();
const image = ref<HTMLImageElement>();
const authStore = useAuthStore();

const c = <T>(e?: T) => e!;

const { state, execute } = useRequestState({
  action: () => api.bookmarkCampaign(props.publicId),
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
<style>
.tag {
  color: rgba(0, 0, 0, 0.6);
  mix-blend-mode: difference;
  filter: invert(1);
}
</style>
