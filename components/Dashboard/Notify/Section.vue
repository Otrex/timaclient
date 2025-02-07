<template>
  <div class="">
    <div class="">
      <div
        v-if="data.length === 0"
        class="flex flex-col items-center justify-center py-8"
      >
        <p class="text-gray-500">No notifications yet</p>
      </div>
      <div
        v-if="state === 'LOADING'"
        class="flex flex-col items-center justify-center py-8"
      >
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        ></div>
        <p class="text-gray-500 mt-2">Accepting invite...</p>
      </div>

      <template v-else v-for="[date, invites] in data" :key="date">
        <div
          class="flex flex-row gap-3 mb-4 items-center"
          :class="{ 'mt-8': date !== 'Today' }"
        >
          <h2 class="text-lg font-semibold">{{ date }}</h2>
          <div class="border-b w-full"></div>
        </div>
        <DashboardNotifyCard
          v-for="invite in (invites as any[])"
          :key="invite.inviteId"
          :title="`Invite for the campaign: ${invite?.campaign?.campaignName}`"
          :message="invite.campaign?.campaignAbout"
          @accept="acceptInvite(invite.inviteId)"
          :time="
            new Date(invite?.campaign?.startDate).toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })
          "
        >
          <template #content>
            <div class="bg-white rounded-lg p-6 space-y-6">
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-sm font-medium text-gray-500">
                      Campaign Duration
                    </h3>
                    <p class="mt-1 text-sm text-gray-900">
                      {{
                        new Date(
                          invite?.campaign?.startDate
                        ).toLocaleDateString()
                      }}
                      -
                      {{
                        new Date(invite?.campaign?.endDate).toLocaleDateString()
                      }}
                    </p>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-sm font-medium text-gray-500">Budget</h3>
                    <p class="mt-1 text-sm text-gray-900">
                      {{ invite?.campaign?.planningBudget }}
                    </p>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-sm font-medium text-gray-500">Platforms</h3>
                    <div class="mt-2 flex flex-wrap gap-2">
                      <span
                        v-for="platform in invite?.campaign
                          ?.socialMediaPlatform"
                        :key="platform"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ platform }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-sm font-medium text-gray-500">
                      Target Audience
                    </h3>
                    <div class="mt-2 space-y-2">
                      <p class="text-sm text-gray-900">
                        <span class="font-medium">Age Groups:</span>
                        {{ invite?.campaign?.audienceAgeGroup.join(", ") }}
                      </p>
                      <p class="text-sm text-gray-900">
                        <span class="font-medium">Gender:</span>
                        {{ invite?.campaign?.audienceGender.join(", ") }}
                      </p>
                      <p class="text-sm text-gray-900">
                        <span class="font-medium">Location:</span>
                        {{ invite?.campaign?.audienceLocation.join(", ") }}
                      </p>
                    </div>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-sm font-medium text-gray-500">
                      Content Requirements
                    </h3>
                    <div class="mt-2 space-y-2">
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="type in invite?.campaign?.contentType"
                          :key="type"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {{ type }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-900 mt-2">
                        <span class="font-medium">Creative Tone:</span>
                        {{ invite?.campaign?.creativeTone }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">
                  Campaign Brief
                </h3>
                <p class="mt-2 text-sm text-gray-900">
                  {{ invite?.campaign?.creativeBrief }}
                </p>
              </div>

              <div class="flex justify-end space-x-4">
                <a
                  v-if="invite?.campaign?.campaignWebsite"
                  :href="invite?.campaign?.campaignWebsite"
                  target="_blank"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Visit Website
                </a>
                <a
                  v-if="invite?.campaign?.referenceLink"
                  :href="invite?.campaign?.referenceLink"
                  target="_blank"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  View References
                </a>
              </div>
            </div>
          </template>
        </DashboardNotifyCard>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    invites: (any | CampaignInvite)[];
  }>(),
  {
    invites: () => [],
  }
);

export interface CampaignDetails {
  audienceLocation: string[];
  campaignAbout: string;
  campaignWebsite: string;
  endDate: string;
  contentPlacement: string[];
  campaignObjectiveAwareness: string[];
  creativeBrief: string;
  campaignObjectiveAcquisition: string[];
  referenceLink: string;
  audienceAgeGroup: string[];
  statusProgress: string;
  createdAt: string;
  contentType: string[];
  campaign_id: string;
  updatedAt: string;
  campaignObjective: string;
  influencerID: string[];
  planningBudget: string;
  audienceSize: string[];
  campaignRule: string;
  banner: string;
  socialMediaPlatform: string[];
  user_id: string;
  audienceGender: string[];
  viewType: boolean;
  creativeTone: string;
  category: string[];
  campaignName: string;
  startDate: string;
}

export interface PlatformPrice {
  price: number;
  platform: string;
}

export interface CampaignInvite {
  inviteId: string;
  campaignId: string;
  campaign: CampaignDetails;
  platformPrices: PlatformPrice[];
  status: string;
}

const api = useAPI();
const { notify } = useNotification();

const { execute: acceptInvite, state } = useRequestState({
  action: async (inviteId: string) => api.acceptCampaignInvite(inviteId),
  onSuccess: () => {
    notify({
      title: "Success",
      text: "Invite Accepted",
      type: "success",
    });
  },
  onError: (error) => {
    notify({
      title: "Error",
      text: "Something went wrong",
      type: "error",
    });
  },
});

const data = computed(() => {
  const groupedInvites = props.invites.reduce((groups, invite) => {
    const date = new Date(invite?.campaign?.startDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let groupKey;
    if (date.toDateString() === today.toDateString()) {
      groupKey = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      groupKey = "Yesterday";
    } else {
      groupKey = date.toLocaleDateString();
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(invite);
    return groups;
  }, {} as Record<string, typeof props.invites>);

  return Object.entries(groupedInvites).sort((a, b) => {
    if (a[0] === "Today") return -1;
    if (b[0] === "Today") return 1;
    if (a[0] === "Yesterday") return -1;
    if (b[0] === "Yesterday") return 1;
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  });
});
</script>
