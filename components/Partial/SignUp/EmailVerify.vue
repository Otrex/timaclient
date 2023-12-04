<template>
  <div>
    <div class="mb-[30px]">
      <h1 class="text-[39px] mb-[24px]">Check your email for a code</h1>
      <p>
        Check your email at yowa@gmail.com for the confirmation code. Enter it
        soon, before it expires. Welcome aboard!
      </p>
    </div>

    <div>
      <UiInputOtp :length="6" v-model="form.code" @finish="sendCode" />
      <p
        v-show="form.loading"
        class="flex gap-[10px] justify-center mt-[24px] items-center"
      >
        <UtSvg name="sunshine" class="spinner w-[24px] h-[24px]" />
        Checking the code
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const form = reactive({
  loading: false,
  code: "",
});
function sendCode(otp: string) {
  form.loading = true;
  setTimeout(() => {
    form.loading = false;
    if (route.params.type === "influencer") {
      navigateTo({
        query: {
          tab: "complete-profile",
        },
      });
    } else {
      navigateTo({
        query: {
          tab: "basic-information",
        },
      });
    }
  }, 5000);
}
</script>

<style></style>
