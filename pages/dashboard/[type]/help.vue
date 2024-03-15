<template>
  <div class="flex justify-center h-[calc(100%_-_200px)] mt-[100px]">
    <div class="max-w-[400px] w-full">
      <h1 class="font-bold text-center">Help & Support</h1>
      <p class="mb-3 text-center">Send us your request or complains</p>

      <div class="max-w-[400px] w-full">
        <div class="mb-3">
          <UiInputText
            v-model="form.subject"
            class="w-full"
            placeholder="Enter the subject"
          />
        </div>
        <div class="w-full mb-3">
          <UiInputTextArea
            placeholder="Enter the message"
            class="h-[200px]"
            v-model="form.body"
            row="5"
          />
        </div>
        <div>
          <UiButtonDefault
            variant="primary"
            @click="sendMessage"
            :loading="loading"
            :disabled="loading"
            class="w-full px-3 py-3"
          >
            Send
          </UiButtonDefault>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Help & Support",
});

const loading = ref(false);
const appConfig = useAppConfig();
const form = reactive({
  subject: "",
  body: "",
});

const fullMessage = computed(() => `mailto:${appConfig.supportEmail}`);

const sendMessage = () => {
  loading.value = true;
  if (form.body && form.subject) {
    tools.linkTo(fullMessage.value);
  }
  loading.value = false;
};
</script>

<style></style>
