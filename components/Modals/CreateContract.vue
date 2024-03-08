<template>
  <div class="bg-white p-3">
    <h2 class="text-center">
      Create Contract for <b>{{ props.influencerName }}</b>
    </h2>

    <div>
      <UiButtonDefault
        :disabled="state === constants.LOADING"
        :loading="state === constants.LOADING"
        @click="() => execute()"
        label="Continue"
        variant="primary"
        class="py-[0.875rem] w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  influencerName: string;
  applicationId?: string;
  influencerPublicId: string;
  campaignName: string;
  campaignPublicId: string;
  brandName: string;
}>();

const api = useAPI();
const emits = defineEmits(["submitted"]);
const contractAmount = ref(0);
const { notify } = useNotification();

const { execute, state } = useRequestState({
  action: () =>
    api.createContract({
      campaignName: props.campaignName,
      campaignPublicId: props.campaignPublicId,
      influencerPublicId: props.influencerPublicId,
      influencerName: props.influencerName,
      brandName: props.brandName,
      contractAmount: contractAmount.value,
    }),
  onSuccess: () => {
    notify({
      type: "success",
      title: "Contract Created!!",
      text: "Contract has been created successfully",
    });

    emits("submitted");
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
