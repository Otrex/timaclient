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

const formMailer = (
  options: Partial<{ subject: string; body: string; cc: string }>
) => {
  let main = `mailto:${appConfig.supportEmail}?`;

  main += Object.entries(options)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return main;
};

const openTabAndDetectClose = (url) => {
  const newWindow = window.open(url, "_blank");

  if (newWindow) {
    const interval = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(interval);
        form.body = "";
        form.subject = "";
        alert("Message sent successfully");
      }
    }, 1000);
  } else {
    form.body = "";
    form.subject = "";
    console.log("Failed to open the tab.");
  }
};

const openTab = (mailtoLink: string) => {
  console.log(mailtoLink);

  const a = document.createElement("a");
  a.href = mailtoLink;
  a.target = "_blank";
  a.click();
};

const sendMessage = () => {
  if (!form.subject || !form.body) {
    return alert("Please fill all the fields");
  }

  openTabAndDetectClose(
    formMailer({
      subject: form.subject,
      body: form.body,
    })
  );
};
</script>

<style></style>
