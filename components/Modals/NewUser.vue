<template>
  <div class="bg-white rounded-2xl py-6">
    <div class="border-b border-[#D8D8D8] pb-6 px-10">
      <h1 class="font-semibold text-xl">New User</h1>
    </div>

    <div class="mt-4 px-10">
      <h1 class="font-semibold text-base text-[#545454] mb-4">Hello Admin,</h1>
      <p class="text-[#545454] text-base mb-4">
        We are excited to inform you that a new user has just joined our
        platform. Please find the details below:
      </p>
    </div>

    <div class="bg-[#F1F9FF] px-14 py-7">
      <div class="flex justify-between items-center w-6/12">
        <ul>
          <li class="py-3 list-disc text-base text-[#545454]">Username:</li>
          <li class="py-3 list-disc text-base text-[#545454]">Email:</li>
          <li class="py-3 list-disc text-base text-[#545454]">Phone Number:</li>
          <li class="py-3 list-disc text-base text-[#545454]">User Role:</li>
          <li class="py-3 list-disc text-base text-[#545454]">
            Registration Date:
          </li>
        </ul>

        <ul>
          <li class="py-3 text-base text-[#545454]">{{ username }}</li>
          <li class="py-3 text-base text-[#545454]">{{ email }}</li>
          <li class="py-3 text-base text-[#545454]">{{ phone }}</li>
          <li class="py-3 text-base text-[#545454]">{{ role }}</li>
          <li class="py-3 text-base text-[#545454]">{{ date }}</li>
        </ul>
      </div>
    </div>

    <div class="flex justify-end py-14 px-10">
      <div class="w-6/12 flex gap-x-8">
        <UiButtonDefault
          class="w-full py-[0.875rem]"
          label="Accept"
          @click="() => review('APPROVE').then(() => $emit('close'))"
          :loading="state === constants.LOADING && reviewType === 'APPROVE'"
          :disabled="state === constants.LOADING && reviewType === 'APPROVE'"
          variant="primary"
        />
        <UiButtonDefault
          class="w-full py-[0.875rem]"
          @click="() => review('DECLINE').then(() => $emit('close'))"
          :loading="state === constants.LOADING && reviewType === 'DECLINE'"
          :disabled="state === constants.LOADING && reviewType === 'DECLINE'"
          label="Decline"
          variant="secondary"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Payload } from "~/lib/interfaces";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const reviewType = ref<string | null>();
const api = useAPI();
const { notify } = useNotification();
const { execute: review, state } = useRequestState({
  action: (status: Payload.ReviewUser["review"]) => {
    reviewType.value = status;
    return api.reviewUser({
      review: status,
      user_id: props.id,
    });
  },

  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },

  onSuccess(data) {
    notify({
      type: "success",
      title: "User Reviewed",
      text: "User has been reviewed",
    });
  },
});
</script>

<style></style>
