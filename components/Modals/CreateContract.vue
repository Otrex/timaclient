<template>
  <div class="bg-white p-5 rounded-4xl">
    <h2 class="text-center mb-5 bg-slate-200 rounded-4xl p-3">
      Contract to <b>{{ props.influencerName }}</b> for
      <b>{{ props.campaignName }}</b>
    </h2>

    <div class="mb-5">
      <label class="pl-3">Contract Amount:</label>
      <UiInputText type="number" v-model="contractAmount" class="w-full" />
    </div>
    <!--
      <div class="mb-3">
        <label class="pl-3">Contract Terms:</label>
        <UiInputTextArea v-model="form.terms" class="w-full h-[200px]" />
      </div>
    -->

    <div>
      <UiButtonDefault
        :disabled="state === constants.LOADING"
        :loading="state === constants.LOADING"
        class="py-[0.875rem] w-full"
        @click="() => execute()"
        label="Continue"
        variant="primary"
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

const form = reactive({
  terms: "",
});

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
