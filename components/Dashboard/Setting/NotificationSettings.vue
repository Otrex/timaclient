<template>
  <div class="pt-[3.4375rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Campaign Updates</label>
        </div>
        <div class="flex items-center w-full">
          <div class="flex gap-[1.75rem]">
            <div>
              <UiInputSwitch v-model="notice" size="lg" />
            </div>
            <div class="flex flex-col">
              <span class="mb-[0.5625rem]"
                >I want to receive notifications on updates</span
              >
              <span class="text-[0.625rem]"
                >Get notified when there are important updates about the
                design</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Email Alerts</label>
        </div>
        <div class="flex items-center w-full">
          <div class="flex gap-[1.75rem]">
            <div>
              <UiInputSwitch v-model="notice" size="lg" />
            </div>
            <div class="flex flex-col">
              <span class="mb-[0.5625rem]">I want to receive email alerts</span>
              <span class="text-[0.625rem]"
                >Get notified when an influencer applies.</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">&nbsp;</div>
        <div class="flex items-center w-full">
          <div class="mb-[1.875rem] mt-[7.625rem] w-full">
            <UiButtonDefault
              label="Save Changes"
              variant="primary"
              class="w-full py-[0.875rem]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const notice = ref();
</script>

<style></style>
