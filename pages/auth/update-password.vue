<template>
  <div>
    <NuxtLayout name="auth">
      <div>
        <div class="mb-[3.75rem]">
          <h1 class="text-[2.4375rem] mb-[1.5rem]">Update Password</h1>
          <p>Enter your desired password</p>
        </div>
        <div class="tm__box-598px">
          <div class="flex flex-col gap-[1rem] mb-[9.9375rem]">
            <UiInputText
              class="w-full"
              placeholder="Password"
              v-model="form.password"
              password-toggle
            />
          </div>

          <div>
            <UiButtonDefault
              @click="() => execute()"
              :disabled="state == constants.LOADING"
              :loading="state == constants.LOADING"
              label="Continue"
              variant="primary"
              class="w-full py-[0.875rem]"
            />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { sha512 } from "js-sha512";

definePageMeta({
  name: "Update Password",
  pageTransition: false,
});

const { notify } = useNotification();
const route = useRoute();
const api = useAPI();
const authStore = useAuthStore();

const form = reactive({
  password: "",
});

function createHash(otp: string, publicId: string) {
  const salt = tools.generateSalt(5, "alphanumeric");
  const hash = sha512(`${otp}${publicId}${salt}`);

  return { salt, hash };
}

const { execute, state } = useRequestState({
  action: async () => {
    const otp = route.query.otp as string;
    const publicId = route.query.publicId as string;

    if (!otp || !publicId) {
      notify({
        type: "error",
        title: "Not Found",
        text: "No OTP or publicId found",
      });

      throw new Error();
    }

    const { salt, hash } = createHash(otp, publicId);

    return api.completePasswordReset(
      { ...form, publicId: route.query.publicId as string },
      {
        salt,
        hash,
      }
    );
  },
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess(response) {
    notify({
      type: "success",
      title: "Request Successful!",
      text: response.data.message,
    });
  },
});
</script>

<style></style>
