<template>
  <div class="tm__box-598px">
    <div class="mb-[1.875rem]">
      <h1 class="text-[2.4375rem] mb-[1.5rem]">Check your email for a code</h1>
      <p>
        Check your email at yowa@gmail.com for the confirmation code. Enter it
        soon, before it expires. Welcome aboard!
      </p>
    </div>

    <div>
      <UiInputOtp :length="6" v-model="form.code" @finish="sendCode" />
      <p
        v-show="form.loading"
        class="flex gap-[0.625rem] justify-center mt-[1.5rem] items-center"
      >
        <UtSvg name="sunshine" class="spinner w-[1.5rem] h-[1.5rem]" />
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
          tab: constants.COMPLETE_PROFILE,
        },
      });
    } else {
      navigateTo({
        query: {
          tab: constants.BASIC_INFORMATION,
        },
      });
    }
  }, 5000);
}
</script>

<style></style>
