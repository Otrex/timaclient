<template>
  <div class="bg-white dark:bg-slate-700 max-w-[43.75rem] w-full rounded-2xl">
    <template v-if="fetchInfluencers === constants.LOADING">
      <div>LOADING...</div>
    </template>
    <template v-else>
      <header class="py-4 text-center dark:border-slate-500 border-b relative">
        <span class="text-lg font-semibold">
          Invite Influencers to this campaign
        </span>
        <UtSvg
          name="close"
          dim
          w="1.2rem"
          h="1.2rem"
          class="absolute top-1/2 -translate-y-1/2 right-5"
          @click="$emit('close')"
        />
      </header>
      <section class="px-5">
        <div class="py-3">
          <UiInputText search class="!py-2" placeholder="Search Influencers" />
        </div>
        <div class="pb-4">
          <p class="mb-2">Suggested</p>
          <label
            v-for="(influencer, idx) in influencers"
            :key="idx"
            class="flex flex-row py-2 justify-between items-center"
          >
            <div class="flex flex-row items-center gap-2">
              <div
                class="w-[3.375rem] h-[3.375rem] rounded-full overflow-hidden"
              >
                <img
                  :src="influencer?.profile?.profileImage"
                  alt="Placeholder avatar"
                  class="object-cover w-full h-full"
                />
              </div>
              <div>
                {{
                  [influencer.profile.firstName, influencer.profile.lastName]
                    .filter((e) => e)
                    .join(" ")
                }}
              </div>
            </div>
            <div>
              <input type="checkbox" />
            </div>
          </label>
        </div>
      </section>
      <footer
        class="flex border-t dark:border-slate-500 justify-end items-center gap-2 py-6 px-5"
      >
        <UiButtonDefault
          variant="outline-primary"
          class="!border-0 !py-2 px-5"
          label="Cancel"
          @click="$emit('close')"
        />
        <UiButtonDefault variant="primary" class="!py-2 !px-6" label="Invite" />
      </footer>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { GetBrandInfluencer } from "~/lib/interfaces/response";

const api = useAPI();
const influencers = ref<GetBrandInfluencer["data"]>([]);

const { state: fetchInfluencers } = useRequestState({
  immediately: true,
  action() {
    return api.getBrandInfluencers({});
  },
  onSuccess(data) {
    influencers.value = data.data;
  },
  onError(error) {
    console.log(error);
  },
});
</script>
