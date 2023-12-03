<template>
  <div>
    <div class="mb-[30px]">
      <h1 class="text-[39px] mb-[24px]">Sign Up</h1>
      <p>
        Discover top influencers, track metrics, and activate campaigns. Sign up
        now to simplify your influencer marketing journey.
      </p>
    </div>

    <div class="flex flex-col gap-[16px]">
      <UiInputText
        type="text"
        class="w-full"
        v-model="form.username"
        placeholder="Username"
      />
      <UiInputText
        type="email"
        class="w-full"
        v-model="form.email"
        placeholder="Email address"
      />
      <UiInputText
        type="password"
        class="w-full"
        v-model="form.password"
        placeholder="Password"
      />
      <div class="flex items-center gap-[10px] mb-[37px]">
        <input
          type="checkbox"
          v-model="form.agreed"
          class="rounded-full w-[20px] h-[20px]"
        />
        <span class="text-[14px]">
          I have read and understood the terms and conditions
        </span>
      </div>
      <UiButtonDefault
        :disabled="!isReady"
        label="Continue"
        variant="primary"
        @click="proceed"
        class="w-full py-[14px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  agreed: false,
  password: "",
  username: "",
  email: "",
});

const isReady = computed(() => {
  return form.password && form.email && form.agreed;
});

function proceed() {
  navigateTo({
    query: {
      tab: "email-verify",
    },
  });
}
</script>

<style></style>
