<template>
  <div>
    <table class="w-full">
      <thead class="bg-gray-200 dark:bg-gray-600 py-2">
        <tr>
          <th class="py-2 text-left px-5">Influencer</th>
          <th>Content Link</th>
          <th>Status</th>
          <th>Applied At</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(content, idx) in contents" :key="idx">
          <tr
            @click="content.opened = !content.opened"
            class="border-b transition-all"
          >
            <td class="py-3">
              <div class="flex gap-2 flex-row items-center">
                <div>
                  <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      :src="content.userProfile.profilePicture"
                      alt=""
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div class="font-medium">
                    {{ content.userProfile.firstName }} ({{
                      content.user.username
                    }})
                  </div>
                  <div>
                    <span
                      v-for="(industry, idx) in content.userProfile.industries"
                      :key="idx"
                      class="bg-gray-200 dark:bg-gray-600 mr-2 rounded-md px-2 py-1 text-xs"
                    >
                      {{ industry }}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-center">
              <a
                :href="content.content_link"
                target="_blank"
                class="text-blue-500 underline"
              >
                Link
              </a>
            </td>
            <td class="text-center">
              <span
                :class="[
                  content.applicationStatus === 'PENDING' && '!text-yellow-500',
                  'text-sm dark:text-gray-400 text-gray-500',
                ]"
                >{{ content.applicationStatus }}</span
              >
            </td>
            <td class="text-center">
              {{
                tools
                  .timeAgo(new Date(content.appliedAt))
                  .value.replace('"', "")
              }}
            </td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                :class="{ 'transform rotate-180': content.opened }"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </td>
          </tr>
          <tr v-show="content.opened">
            <td colspan="100%">
              <div class="bg-gray-50 p-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 class="text-sm font-semibold mb-2">
                      Application Details
                    </h3>
                    <div class="space-y-2">
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Application ID:</span>
                        <span>{{ content.application_id }}</span>
                      </div>
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Applied Date:</span>
                        <span>{{
                          new Date(content.appliedAt).toLocaleDateString()
                        }}</span>
                      </div>
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Status:</span>
                        <span
                          :class="{
                            'text-yellow-500':
                              content.applicationStatus === 'PENDING',
                          }"
                        >
                          {{ content.applicationStatus }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold mb-2">
                      Influencer Information
                    </h3>
                    <div class="space-y-2">
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Full Name:</span>
                        <span
                          >{{ content.userProfile.firstName }}
                          {{ content.userProfile.lastName }}</span
                        >
                      </div>
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Username:</span>
                        <span>{{ content.user.username }}</span>
                      </div>
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Email:</span>
                        <span>{{ content.user.email }}</span>
                      </div>
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Country:</span>
                        <span>{{ content.userProfile.country }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="content.content_link" class="mt-5">
                  <iframe :src="content.content_link" class="w-full h-screen" />
                </div>

                <div class="mt-5 flex justify-end">
                  <UiButtonDefault
                    variant="secondary"
                    :loading="approving === constants.LOADING"
                    :disabled="approving === constants.LOADING"
                    @click="() => approveOrReject('DECLINED', content)"
                    class="px-6 py-2"
                    label="Reject"
                  />
                  <UiButtonDefault
                    variant="primary"
                    :loading="approving === constants.LOADING"
                    :disabled="approving === constants.LOADING"
                    @click="reasonModal = content"
                    class="px-6 py-2"
                    label="Approve"
                  />
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <UtModal
      v-model:state="reasonModal"
      m-width="34.3125rem"
      content-class="mx-auto mt-[10%]"
    >
      <div class="bg-white dark:bg-gray-700 p-3 pb-5 px-5 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-xl max-w-[200px] leading-10">Reason</h1>
          <button class="" @click="reasonModal = null">
            <UtSvg name="cancel" dim w="1.5rem" h="1.5rem" />
          </button>
        </div>
        <div>
          <textarea
            cols="30"
            v-model="reason"
            class="w-full p-5 mb-5 min-h-[18.75rem] rounded-lg border dark:border-gray-600 dark:bg-gray-600/50"
          />
        </div>
        <div>
          <UiButtonDefault
            variant="primary"
            @click="() => approveOrReject('APPROVED', reasonModal)"
            :loading="approving === constants.LOADING"
            :disabled="approving === constants.LOADING"
            class="w-full py-2"
            label="Submit"
          />
        </div>
      </div>
    </UtModal>
  </div>
</template>

<script setup lang="ts">
import type { ContentReview } from "~/lib/interfaces/payload";
import type { GetInfluencerContentApplicationsResponse } from "~/lib/interfaces/response";

definePageMeta({
  name: "ViewBrandCampaignContents",
});

const api = useAPI();
const reasonModal = ref<any>(null);
const reason = ref("");
const route = useRoute();
const { notify } = useNotification();
const contents = ref<GetInfluencerContentApplicationsResponse["data"]>([]);
//
useRequestState({
  immediately: true,
  async action() {
    return api.getCampaignContents(route.params.id as string, "", {
      page: 1,
      limit: 10,
    });
  },

  onSuccess(response) {
    contents.value = response.data;
  },
});

const { state: approving, execute: approveOrReject } = useRequestState({
  async action(status: ContentReview["status"], content: any) {
    return api.reviewContent({
      campaign_id: content.campaign_id,
      content_id: content.application_id,
      status,
      ...(status == "DECLINED" ? { reason: reason.value } : {}),
    });
  },

  onSuccess(response) {
    reason.value = "";
    notify({
      type: "success",
      title: "Content reviewed successfully",
      text: "The content has been reviewed successfully",
    });
  },

  onError(error) {
    notify({
      type: "error",
      title: "Error",
      text: "Content review failed",
    });
  },
});
</script>

<style></style>
