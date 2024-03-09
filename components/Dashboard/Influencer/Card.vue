<template>
  <transition mode="out-in">
    <article
      :key="key"
      v-show="key"
      class="border border-solid bg-white dark:bg-slate-900 border-[#E7E7E7] dark:border-slate-600"
    >
      <div class="max-h-[11.25rem] h-full relative overflow-hidden">
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
          @click.prevent.capture="() => deleteBookmark(props.name)"
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
          :src="props.cover"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <div class="px-[1.25rem] py-[2.125rem]">
        <div class="flex flex-row justify-between mb-[1.25rem]">
          <div class="flex gap-[0.75rem] items-center">
            <div
              class="inline-block w-[2rem] relative h-[2rem] overflow-hidden rounded-full"
            >
              <UiImg
                :src="props.profilePicture"
                class="w-full h-full object-cover"
                alt="profile picture"
              />
            </div>
            <p class="inline-block nl">
              {{ props.name }}
            </p>
          </div>
          <div class="flex gap-[0.75rem]">
            <template v-for="(social, idx) in socials" :key="idx">
              <UtSvg :name="social" w="1.3125rem" h="1.3125rem" dim />
            </template>
          </div>
        </div>

        <div
          class="grid grid-cols-3 md:gap-x-[1.3125rem] mb-[1rem] gap-y-[0.75rem]"
        >
          <div>
            <p class="sm">{{ props.earnedMedia }}</p>
            <p class="sm text-[color:--clr-grey-300]">Followers</p>
          </div>
          <div>
            <p class="sm">{{ props.engagements }}%</p>
            <p class="sm text-[color:--clr-grey-300]">Engagement</p>
          </div>
          <div>
            <p class="sm">{{ props.likes }}%</p>
            <p class="sm text-[color:--clr-grey-300]">Likes</p>
          </div>
          <div>
            <p class="sm">{{ props.comments }}%</p>
            <p class="sm text-[color:--clr-grey-300]">Comments</p>
          </div>
          <div>
            <p class="sm">{{ props.saved }}%</p>
            <p class="sm text-[color:--clr-grey-300]">Total Media</p>
          </div>
        </div>
        <div>
          <p class="sm text-[--clr-grey-300]">
            {{ tools.formatDate(props.date) }}
          </p>
        </div>
      </div>
    </article>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  socialMedia: string[];
  earnedMedia: number;
  engagements: number;
  likes: number;
  comments: number;
  saved: number;
  date: string;
  cover: string;
  profilePicture: string;
  isBookmark?: boolean;
  publicId: string;
}>();

const key = ref(0);
const avgColor = ref(0);
const authStore = useAuthStore();
const colorExtract = useImageColorExtract();
const socials = computed(() => props.socialMedia.map((s) => `socials/${s}-lg`));
onMounted(() => {
  try {
    colorExtract.getAverageColor(props.cover!).then((value) => {
      avgColor.value = value;
    });
  } catch (error) {}
});

const api = useAPI();
const $emit = defineEmits(["refresh"]);
const { notify } = useNotification();

const { state, execute } = useRequestState({
  action: () =>
    api.bookmarkInfluencer({
      title: "Bookmark",
      bookmarkPublicId: props.publicId,
    }),
  onSuccess: (response) => {
    notify({
      type: "success",
      title: "Bookmarked!!",
      text: response.message,
    });
  },
  onError: (error) => {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});

onMounted(() => {
  key.value = 1;
});

const { state: deleteState, execute: deleteBookmark } = useRequestState({
  action: (title: string) => api.deleteInfluencerBookmark(title),
  onSuccess() {
    notify({
      type: "success",
      title: "Deleted Bookmarked!!",
      text: `Bookmark ${props.name} deleted successfully`,
    });

    $emit("refresh");
  },
  onError: (error) => {
    notify({
      type: "error",
      title: error.title,
      text: error.description,
    });
  },
});
</script>

<style></style>
