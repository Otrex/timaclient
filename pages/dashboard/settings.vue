<template>
  <section>
    <div
      class="h-[13.75rem] flex items-end px-[2.5rem] bg-cover bg-center rounded-[0.625rem] bg-no-repeat bg-[url(~/assets/img/setting-backdrop.jpg)]"
    >
      <div
        class="w-[11.625rem] transform translate-y-[41%] h-[11.625rem] rounded-full border-[0.3125rem] border-solid border-white"
      >
        <img
          src="~/assets/img/user-profile.jpg"
          class="object-cover w-full h-full rounded-full"
          alt="profile image"
        />
      </div>
    </div>
    <div class="px-[2.5rem] py-[1.9375rem]">
      <div class="text-right">
        <UiButtonIconed
          left-icon="edit"
          label="Edit"
          variant="primary"
          class="max-w-[10.125rem] w-full py-[0.75rem]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Settings",
});
</script>

<style></style>
