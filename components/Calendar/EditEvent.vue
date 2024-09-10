<template>
  <div class="bg-white w-full p-6 shadow-md rounded-lg max-w-[43.75rem]">
    <div class="flex justify-end">
      <button>
        <UtSvg name="close" dim w="1rem" h="1rem" />
      </button>
    </div>
    <div class="mb-3">
      <input
        class="border-b-2 w-full text-2xl py-2 focus:outline-none focus:border-blue-600"
        placeholder="Add title"
      />
    </div>
    <div>
      <div class="flex gap-3 text-lg text-[#545454] flex-row">
        <button
          class="px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
          :class="activeTab === 0 && 'bg-[#99D3FF]/30 text-[#058EF8]'"
          @click="activeTab = 0"
        >
          Task
        </button>
        <button
          class="px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
          :class="activeTab === 1 && 'bg-[#99D3FF]/30 text-[#058EF8]'"
          @click="activeTab = 1"
        >
          Set Reminder
        </button>
        <button
          class="px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
          :class="activeTab === 2 && 'bg-[#99D3FF]/30 text-[#058EF8]'"
          @click="activeTab = 2"
        >
          Schedule campaign post
        </button>
      </div>
      <div>
        <template v-if="activeTab === 0">
          <div class="mt-4">
            <h1 class="text-[#333333] text-lg">Description</h1>
            <input
              class="border-b-2 w-full text-base py-2 focus:outline-none focus:border-blue-600"
              placeholder="Add description (optional)"
            />
          </div>

          <div class="flex items-center gap-3 py-4">
            <h1 class="text-[#333333] text-lg">Start date</h1>

            <div class="flex gap-3">
              <div class="bg-[#D9D9D9] text-[#545454] p-3 rounded-md">
                Aug 23, 2024
              </div>
              <div class="bg-[#D9D9D9] text-[#545454] p-3 rounded-md">
                1:30 PM
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 py-4">
            <h1 class="text-[#333333] text-lg">
              End date <span class="text-base">(optional)</span>
            </h1>

            <div class="flex gap-3">
              <div class="bg-[#D9D9D9] text-[#545454] p-3 rounded-md">
                Aug 23, 2024
              </div>
            </div>
          </div>

          <div>
            <h1 class="text-[#333333] text-lg">Notes</h1>
            <input
              class="border-b-2 w-full text-base py-2 focus:outline-none focus:border-blue-600"
              placeholder="Add additional notes (optional)"
            />
          </div>
        </template>

        <template v-if="activeTab === 1">
          <div class="flex items-center gap-3 py-4">
            <h1 class="text-[#333333] text-lg">
              Type of Reminder <span class="text-base">(optional)</span>
            </h1>

            <div class="flex gap-3">
              <button
                class="text-base px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
                :class="
                  reminderTab === 'EMAIL' && 'bg-[#99D3FF]/30 text-[#058EF8]'
                "
              >
                Email
              </button>
              <button
                class="text-base px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
                :class="
                  reminderTab === 'SMS' && 'bg-[#99D3FF]/30 text-[#058EF8]'
                "
              >
                SMS
              </button>
              <button
                class="text-base px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
                :class="
                  reminderTab === 'PUSH_NOTIFICATION' &&
                  'bg-[#99D3FF]/30 text-[#058EF8]'
                "
              >
                Push notification
              </button>
            </div>
          </div>

          <div class="flex items-center gap-3 py-4">
            <h1 class="text-[#333333] text-lg">Time</h1>

            <div class="flex gap-3">
              <button
                class="text-base px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
                :class="
                  reminderTab === 'EMAIL' && 'bg-[#99D3FF]/30 text-[#058EF8]'
                "
              >
                1 day before
              </button>
              <button
                class="text-base px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
                :class="
                  reminderTab === 'SMS' && 'bg-[#99D3FF]/30 text-[#058EF8]'
                "
              >
                1 hour before
              </button>
              <button
                class="text-base px-6 py-1 rounded-[0.25rem] hover:bg-[#99D3FF]/70"
                :class="
                  reminderTab === 'PUSH_NOTIFICATION' &&
                  'bg-[#99D3FF]/30 text-[#058EF8]'
                "
              >
                30 minutes before
              </button>
            </div>
          </div>
        </template>

        <template v-if="activeTab === 2">
          <div class="mt-4">
            <h1 class="text-[#333333] text-lg">Description/Caption</h1>
            <input
              class="border-b-2 w-full text-base py-2 focus:outline-none focus:border-blue-600"
              placeholder="Add description"
            />
          </div>

          <div class="flex items-center gap-3 py-4">
            <h1 class="text-[#333333] text-lg">Select social media platform</h1>

            <div
              v-for="(media, idx) in [
                'instagram',
                'youtube',
                'tiktok',
                'facebook',
                'x',
                'linkedIn',
              ]"
              :key="idx"
              class="border inline-flex rounded-md mr-2 items-center justify-center max-w-[3.125rem] p-[0.625rem] border-[--input-border-color]"
            >
              <UtSvg
                :name="tools.resolveSocialsIcon(media)"
                class="h-[1.3125rem] max-w-[1.9375rem]"
              />
            </div>
          </div>

          <div class="flex items-center gap-3 py-4">
            <h1 class="text-[#333333] text-lg">Attach a media file</h1>

            <div class="flex gap-3">
              <div class="border border-[#D9D9D9] p-3 rounded-md">
                <UtSvg name="media" class="h-[1.3125rem] max-w-[1.9375rem]" />
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 py-4">
            <h1 class="text-[#333333] text-lg">Schedule date & time</h1>
            <div class="flex gap-3">
              <div class="bg-[#D9D9D9] text-[#545454] p-3 rounded-md">
                Aug 23, 2024
              </div>
              <div class="bg-[#D9D9D9] text-[#545454] p-3 rounded-md">
                1:30 PM
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 py-4">
            <UiButtonDefault
              variant="primary"
              label="Save"
              class="min-w-[7.5rem] bg-[#058EF8] text-white px-3 py-3 rounded-md"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type ReminderType = "EMAIL" | "SMS" | "PUSH_NOTIFICATION";
const activeTab = ref(0);
const reminderTab = ref<ReminderType>("EMAIL");
</script>

<style></style>
