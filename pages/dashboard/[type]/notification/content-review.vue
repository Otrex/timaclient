<template>
  <div class="bg-white rounded-lg px-8 overflow-hidden">
    <div
      class="relative w-full rounded-xl overflow-clip max-h-[28.125rem] h-full"
    >
      <img
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        alt="Media Thumbnail"
        class="w-full h-full object-cover"
      />
      <button
        class="absolute inset-0 flex items-center justify-center"
        aria-label="Play Video"
      >
        <div
          class="w-12 h-12 bg-gray-900 bg-opacity-50 rounded-full flex items-center justify-center"
        >
          <UtSvg name="playx" />
        </div>
      </button>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-center mt-8 space-x-4 p-4">
      <UiButtonDefault
        @click="open = true"
        variant="outline-primary"
        class="px-12 !py-2"
        label="Deny"
      />
      <UiButtonDefault variant="primary" label="Accept" class="px-12 !py-2" />
    </div>

    <UtModal
      v-model:state="open"
      m-width="43.75rem"
      content-class="mx-auto mt-[10%]"
      backdrop-color="rgba(0,0,0,.3)"
    >
      <ModalsReason @close="open = false" @submit="open = false" />
    </UtModal>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "Content",
});

const open = ref(false);
</script>
