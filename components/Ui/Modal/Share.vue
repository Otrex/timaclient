<template>
  <div class="bg-white p-[2rem]">
    <div class="mb-3">
      <h2 class="font-bold">
        Share {{ props.type === constants.CAMPAIGN ? "Campaign" : "Resource" }}
      </h2>
    </div>
    <UiInputTextArea
      type="text"
      ref="input"
      class="w-full"
      @click="selectUrl"
      disabled
      :model-value="url"
    />
    <UiButtonDefault
      @click="startCopy"
      variant="primary"
      class="w-full py-2"
      label="Copy"
    />
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  publicId: string;
  type: typeof constants.CAMPAIGN | "none";
}>();

const input = ref<HTMLInputElement>();

const url = computed(() => {
  if (props.type === constants.CAMPAIGN) {
    return `${window.location.protocol}//${window.location.host}/share/c/${props.publicId}`;
  }

  return "";
});

const selectUrl = () => {
  if (!input.value) return;
  var startPos = 0;
  var endPos = input.value.value.length;

  if (
    typeof input.value.selectionStart != "undefined" &&
    typeof input.value.selectionEnd != "undefined"
  ) {
    input.value.selectionStart = startPos;
    input.value.selectionEnd = endPos;
  } else {
    input.value.setSelectionRange(startPos, endPos);
  }

  // For mobile devices, try to open the virtual keyboard
  input.value.focus();
};
const { copy } = useClipboard();
const { notify } = useNotification();
const startCopy = () => {
  notify({
    type: "success",
    title: "Copied!!",
    text: "Campaign link has been copied",
  });
  copy(url.value);
};
</script>

<style scoped>
[type="text"] {
  padding: 0;
  border: 0px;
}
</style>
