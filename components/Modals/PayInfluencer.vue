<template>
  <div class="bg-white dark:bg-slate-700 max-w-[43.75rem] w-full rounded-2xl">
    <header
      v-if="!influencer_id"
      class="py-4 text-center dark:border-slate-500 border-b relative"
    >
      <span class="text-lg font-semibold"> Influencers for this campaign </span>
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
      <div class="py-4 max-h-[65vh] px-5 pr-8 overflow-y-auto">
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
            @click="pay($event, influencer.userProfile?.paymentInformation)"
            :data-id="influencer.influencer_id"
            :data-payment="jsons(influencer.userProfile?.paymentInformation)"
            class="flex flex-row py-2 px-4 justify-between items-center hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-slate-600 dark:active:bg-slate-500 cursor-pointer w-full rounded-lg transition-all duration-200"
          >
            <div class="flex flex-row items-center gap-2">
              <div
                class="w-[3.375rem] h-[3.375rem] rounded-full overflow-hidden transition-transform duration-200 hover:scale-105"
              >
                <img
                  :src="influencer?.userProfile?.profilePicture"
                  alt="Placeholder avatar"
                  class="object-cover w-full h-full transition-opacity duration-200"
                />
              </div>
              <div>
                {{
                  [
                    influencer?.userProfile?.firstName,
                    influencer?.userProfile?.lastName,
                  ]
                    .filter((e) => e)
                    .join(" ")
                }}
              </div>
            </div>
          </button>
        </template>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { RequestState } from "~/lib/enums";
import type {
  GetBrandInfluencer,
  GetInfluencerApplicationsResponse,
} from "~/lib/interfaces/response";

const api = useAPI();
const { notify } = useNotification();
const setPostModal = ref<GetBrandInfluencer["data"][0] | false | null>(false);

const influencers = ref<GetInfluencerApplicationsResponse["data"]>([]);
const { state: fetchInfluencers } = useRequestState({
  immediately: true,
  action: () =>
    api.getCampaignApplicants({
      campaign_id: props.campaign_id,
      applicationStatus: "APPROVED",
    }),
  onSuccess: (response) => {
    influencers.value = response.data;
  },
  onError: (err) => {
    notify({
      type: "error",
      title: err.title,
      text: err.description,
    });
  },
});

const selectedInfluencers = ref<GetBrandInfluencer["data"]>([]);

const props = defineProps<{
  campaign_id: string;
  influencer_id?: string;
  controller?: boolean;
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

watch(
  () => props.controller,
  () => {
    if (props.controller == undefined) return;
    if (props.controller) {
      setPostModal.value = temp.value;
    } else {
      setPostModal.value = false;
    }
  }
);

const payment = ref({
  pin: "",
  userId: "",
  amount: 0,
  description: "",
  campaignId: "",
});

const jsons = (data: any) => JSON.stringify(data);
const pay = async ($evnt: any, paymentInformation: any) => {
  const payload = JSON.parse(
    $evnt.target.dataset.payment || JSON.stringify(paymentInformation)
  );
  const amount =
    payload?.platformPrices?.reduce((acc: any, cur: any) => {
      return acc + cur.price;
    }, 0) || 0;

  payment.value.amount = amount;
  payment.value.userId = $evnt.target.dataset.id;
  payment.value.campaignId = props.campaign_id;
  payment.value.description = "Influencer Payment";
  payment.value.pin = prompt("Enter your Transaction pin") || "";

  if (confirm("Are you sure you want to pay this influencer?")) {
    try {
      await api.transferFunds({
        amount: amount,
        transactionPin: payment.value.pin,
        toUser_id: payment.value.userId,
        description: payment.value.description,
        campaignID: payment.value.campaignId,
      });
      notify({
        type: "success",
        title: "Success",
        text: "Payment successful",
      });
    } catch (error: any) {
      notify({
        type: "error",
        title: "Error",
        text: error.message,
      });
    }
  }
};
const q = ref("");
const costForm = reactive<any>({});

const loading = ref(false);
const temp = ref<any>();

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

        temp.value = setPostModal.value;
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
