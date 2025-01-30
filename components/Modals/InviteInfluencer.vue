<template>
  <div class="bg-white dark:bg-slate-700 max-w-[43.75rem] w-full rounded-2xl">
    <header
      v-if="!influencer_id"
      class="py-4 text-center dark:border-slate-500 border-b relative"
    >
      <span class="text-lg font-semibold">
        Invite Influencers to this campaign
      </span>
      <UtSvg
        name="close"
        dim
        w="1.2rem"
        h="1.2rem"
        class="absolute top-1/2 -translate-y-1/2 right-5"
        @click="$emit('close')"
      />
    </header>
    <section v-if="!influencer_id" class="">
      <div class="py-3 px-5">
        <UiInputText
          search
          v-model="q"
          class="!py-2"
          placeholder="Search Influencers"
        />
      </div>
      <div class="pb-4 max-h-[65vh] px-5 pr-8 overflow-y-auto">
        <p class="mb-2">Suggested</p>
        <template
          v-if="
            fetchInfluencers === RequestState.LOADING ||
            state === RequestState.LOADING
          "
        >
          <div class="flex items-center justify-center py-8">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
            ></div>
            <span class="ml-3 text-gray-500 dark:text-gray-400"
              >Loading influencers...</span
            >
          </div>
        </template>
        <template v-else-if="influencers.length === 0">
          <div class="flex flex-col items-center justify-center py-8">
            <UtSvg name="bell" class="text-gray-400 mb-4" w="2rem" h="2rem" />
            <p class="text-gray-500 dark:text-gray-400 text-center">
              No influencers found. Try adjusting your search criteria.
            </p>
          </div>
        </template>
        <template v-else>
          <button
            v-for="(influencer, idx) in influencers"
            :key="idx"
            @click="() => showPostCountModal(influencer)"
            class="flex flex-row py-2 justify-between items-center hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-600 dark:active:bg-slate-500 cursor-pointer w-full rounded-lg transition-all duration-200"
          >
            <div class="flex flex-row items-center gap-2">
              <div
                class="w-[3.375rem] h-[3.375rem] rounded-full overflow-hidden transition-transform duration-200 hover:scale-105"
              >
                <img
                  :src="influencer?.profile?.profileImage"
                  alt="Placeholder avatar"
                  class="object-cover w-full h-full transition-opacity duration-200"
                />
              </div>
              <div>
                {{
                  [influencer.profile.firstName, influencer.profile.lastName]
                    .filter((e) => e)
                    .join(" ")
                }}
              </div>
            </div>
          </button>
        </template>
      </div>
    </section>
    <UtModal
      m-width="32.25rem"
      v-model:state="setPostModal"
      content-class="mx-auto mt-[10%]"
    >
      <div
        class="bg-white dark:bg-slate-700 shadow-md max-w-[43.75rem] w-full rounded-2xl"
      >
        <header class="text-center py-3 border-b px-3">
          <h3 class="font-bold !text-xl">Select post required</h3>
          <p class="text-sm">Enter the number of post required per platform</p>
        </header>
        <main class="p-6 pt-3">
          <div class="flex mb-3 flex-row justify-end items-center gap-2">
            <div class="text-sm">
              {{
                [
                  setPostModal?.profile?.firstName,
                  setPostModal?.profile?.lastName,
                ]
                  .filter((e) => e)
                  .join(" ")
              }}
            </div>
            <div
              class="w-[1.5rem] h-[1.5rem] border rounded-full overflow-hidden"
            >
              <img
                :src="setPostModal?.profile?.profileImage"
                alt="Placeholder avatar"
                class="object-cover w-full h-full"
              />
            </div>
          </div>
          <p class="text-sm mb-3">
            Input number of post required per platform:
          </p>
          <div v-if="loading" class="flex justify-center items-center py-8">
            <div
              class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"
            ></div>
          </div>

          <template v-if="setPostModal?.profile?.socialMediaAccounts?.length">
            <div class="grid grid-cols-5 items-center gap-2">
              <template
                v-for="(platform, idx) in setPostModal?.profile
                  ?.socialMediaAccounts"
                :key="idx"
              >
                <div
                  class="mb-2 col-span-2 flex flex-row gap-1 items-center text-base whitespace-nowrap"
                >
                  <UtSvg
                    dim
                    w="1.5rem"
                    h="1.5rem"
                    :name="`so/${platform.platformName.toLowerCase()}`"
                  />
                  {{ platform.platformName }} Posts:
                </div>
                <div class="col-span-3">
                  <UiInputText
                    type="number"
                    size="sm"
                    class="!py-2 text-base"
                    v-model="costForm[platform.platformName]"
                  />
                </div>
              </template>
            </div>
          </template>
          <template v-else>
            <div
              class="flex flex-col items-center justify-center py-12 animate-fade-in"
            >
              <p class="text-gray-500 dark:text-gray-400 text-center text-lg">
                No social media accounts connected
              </p>
              <p
                class="text-gray-400 dark:text-gray-500 text-center text-sm mt-2"
              >
                This influencer hasn't connected any social media platforms yet
              </p>
            </div>
          </template>
          <div class="text-right my-1 font-semibold text-base">
            Total Amount: {{ tools.formatCurrency(totalCost) }}
          </div>
        </main>
        <footer class="flex border-t flex-row p-4 gap-2">
          <UiButtonDefault
            variant="outline-primary"
            class="w-full"
            label="Cancel"
            @click="setPostModal = false"
          />
          <UiButtonDefault
            variant="primary"
            class="w-full !py-2"
            label="Confirm"
            :disabled="invitationState === RequestState.LOADING"
            :loading="invitationState === RequestState.LOADING"
            @click="() => invite()"
          />
        </footer>
      </div>
    </UtModal>
    <!-- <footer
        class="flex border-t dark:border-slate-500 justify-end items-center gap-2 py-6 px-5"
      >
        <UiButtonDefault
          variant="outline-primary"
          class="!border-0 !py-2 px-5"
          label="Cancel"
          @click="$emit('close')"
        />
        <UiButtonDefault
          variant="primary"
          @click="() => inviteAll()"
          class="!py-2 !px-6"
          :loading="invitationState === RequestState.LOADING"
          :disabled="invitationState === RequestState.LOADING"
          label="Invite"
        />
      </footer> -->
  </div>
</template>
<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { RequestState } from "~/lib/enums";
import type { GetBrandInfluencer } from "~/lib/interfaces/response";

const api = useAPI();
const setPostModal = ref<GetBrandInfluencer["data"][0] | false | null>(false);
const influencers = ref<GetBrandInfluencer["data"]>([]);
const selectedInfluencers = ref<GetBrandInfluencer["data"]>([]);

const props = defineProps<{
  campaign_id: string;
  influencer_id?: string;
}>();

const $emit = defineEmits(["close"]);

watch(
  () => setPostModal.value,
  () => {
    if (setPostModal.value === false && props.influencer_id) {
      $emit("close");
    }
  },
  { immediate: true }
);

const q = ref("");
const costForm = reactive<any>({});
const totalCost = computed(() => {
  return Object.entries(costForm).reduce((acc, [key, value]) => {
    const prices = setPostModal.value?.paymentInformation?.platformPrices || [];
    const platformPrice = prices.find((e: any) => e.platform === key);

    if (value && platformPrice) {
      return acc + +value * +platformPrice.price;
    }
    return acc;
  }, 0);
});

const { state: fetchInfluencers } = useRequestState({
  immediately: true,
  action() {
    return api.getBrandInfluencers({});
  },
  onSuccess(data) {
    influencers.value = data.data;
  },
  onError(error) {
    console.log(error);
  },
});

const { state, execute: getInfluencer } = useRequestState({
  action: async () =>
    api.searchInfluencers({
      name: q.value,
    }),
  onSuccess(data) {
    influencers.value = data.data.map((e) => ({
      ...e,
      profile: e,
      isSelected: false,
    }));
  },
  onError(error) {
    console.log(error);
  },
});

const debouncedCall = useDebounceFn(() => {
  getInfluencer();
}, 500);
watch(q, () => {
  if (q.value.length > 2) {
    debouncedCall();
  }
});

const { execute: invite, state: invitationState } = useRequestState({
  action: async () => {
    return api.inviteInfluencer({
      campaign_id: props.campaign_id,
      influencer_id: (setPostModal.value as any)?.id,
      platformPrices: Object.entries(costForm).map(([key, value]) => ({
        platform: key,
        price: value as any,
      })),
    });
  },
  onSuccess(data) {
    alert("Invited");
    setPostModal.value = false;
  },
  onError(error) {
    console.log(error);
  },
});

const loading = ref(false);

function showPostCountModal(value: any) {
  if (value) {
    loading.value = true;
    api
      .getInfluencerById(value.id || value.user_id)
      .then(({ data }) => {
        setPostModal.value = {
          ...value,
          ...data,
          profile: {
            ...value.profile,
            ...data,
          },
        };
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    setPostModal.value = false;
  }
}

onMounted(() => {
  if (props.influencer_id) {
    showPostCountModal({ id: props.influencer_id });
  }
});
</script>
