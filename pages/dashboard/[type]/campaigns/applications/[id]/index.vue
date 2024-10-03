<template>
  <div>
    <transition mode="out-in">
      <div class="text-center relative" v-if="state === constants.LOADING">
        <UtLoaderIndicator
          class="absolute inset-0"
          message="Fetching Campaign"
        />
      </div>
      <div class="h-[400px]" v-else-if="!campaign">
        <div>
          <UtNoResource message="Campaign not found" style="--height: 400px" />
        </div>
      </div>
      <div v-else>
        <div class="mb-[1.25rem] overflow-hidden h-[29.3125rem] relative">
          <button
            style="--tw-ring-opacity: 0.2"
            :class="[
              'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
              avgColor < 128
                ? 'active:ring-slate-100'
                : 'active:ring-slate-700',
            ]"
          >
            <UtSvg
              name="bookmark"
              :class="[
                'w-[1.5rem] h-[1.5rem]',
                avgColor > 128 ? 'text-black' : 'text-white',
              ]"
            />
          </button>
          <UiImg
            ref="image"
            class="w-full h-full object-cover"
            :src="campaign?.creative.thumbnail"
            alt="campaign banner"
          />
        </div>

        <section>
          <h2 class="mb-[1rem] font-bold">Campaign Information</h2>
          <h3 class="mb-[1rem]">
            {{ campaign?.overview.name || "Nike" }}
          </h3>
          <p class="mb-[1.4375rem]">
            {{ campaign?.overview.briefDescription }}
          </p>

          <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
            <p class="nl">
              <b>Campaign website:</b> {{ campaign?.overview.website }}
            </p>
            <p class="nl">
              <b>Planned Budget:</b>
              {{ tools.formatCurrency(campaign?.overview.plannedBudget) }}
            </p>
            <p class="nl">
              <b>Cost per post:</b>
              {{ tools.formatCurrency(campaign?.overview.costPerPost) }}
            </p>
            <div>
              <p class="nl"><b>Social media platform:</b></p>
              <div
                v-for="(socials, idx) in campaign?.overview
                  .socialMediaPlatforms"
                :key="idx"
                class="border inline-flex rounded-md mr-2 items-center justify-center max-w-[3.125rem] p-[0.625rem] border-[--input-border-color]"
              >
                <UtSvg
                  :name="tools.resolveSocialsIcon(socials)"
                  class="h-[1.3125rem] max-w-[1.9375rem]"
                />
              </div>
            </div>
          </div>
        </section>

        <section class="mb-[1.75rem]">
          <h2 class="mb-[0.75rem] font-bold">Influencer requirement</h2>
          <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
            <p class="nl">
              <b>Category:</b>
              {{ campaign?.influencer.influencerCategory.join(", ") }}
            </p>
            <p class="nl">
              <b>Audience size:</b>
              {{ campaign?.influencer.audienceSize.join(", ") }}
            </p>
            <p class="nl">
              <b>Audience gender:</b>
              {{ campaign?.influencer.audienceGender.join(", ") }}
            </p>
            <p class="nl">
              <b>Audience location:</b>
              {{ campaign?.influencer.audienceLocation.join(", ") }}
            </p>
          </div>
        </section>

        <section>
          <h2 class="mb-[0.75rem] font-bold">Creatives</h2>
          <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
            <p class="nl">
              <b>Payment type: </b> {{ campaign?.creative.paymentType }}
            </p>
            <p class="nl">
              <b>Campaign start date:</b> {{ campaign?.creative.startDate }}
            </p>
            <p class="nl">
              <b>Campaign end date:</b> {{ campaign?.creative.endDate }}
            </p>
            <p class="nl">
              <b>Content type:</b> {{ campaign?.creative.contentType }}
            </p>
            <p class="nl">
              <b>Content placement:</b>
              {{ campaign?.creative.contentPlacement }}
            </p>
            <p class="nl">
              <b>Creative brief:</b> {{ campaign?.creative.creativeBrief }}
            </p>
            <p class="nl">
              <b>Creative tone:</b> {{ campaign?.creative.creativeTone }}
            </p>
            <p class="nl">
              <b>Campaign rules:</b> {{ campaign?.creative.rules }}
            </p>
            <p class="nl">
              <b>Sample content reference link:</b>
              <a :href="campaign?.creative.referenceLink">{{
                campaign?.creative.referenceLink
              }}</a>
            </p>
            <p class="nl">
              <b>Campaign objective awareness:</b>
              {{ campaign?.creative.awarenessObjective.join(", ") }}
            </p>
            <p class="nl">
              <b>Campaign objective acquisition:</b>
              {{ campaign?.creative.acquisitionObjective.join(", ") }}
            </p>
          </div>
        </section>

        <section class="text-center flex items-center justify-center">
          <button class="text-red-700">Report this campaign to TIMA</button>
          <UiButtonDefault
            @click="
              () =>
                navigateTo({
                  name: 'AttachContent',
                  params: {
                    campaignId: campaign.value.id,
                    applicationId: $route.params.id,
                  },
                })
            "
            variant="primary"
            class="py-[0.75rem] px-[3.75rem]"
            label="Submit Content"
          />
        </section>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
const campaign = ref(null as any);

definePageMeta({
  name: "Campaign Application",
});

const colorExtract = useImageColorExtract();
const image = ref<HTMLImageElement>();
const optionsStore = useOptionsStore();
const { notify } = useNotification();
const avgColor = ref(0);

const api = useAPI();
const route = useRoute();

const { execute: getCampaign, state } = useRequestState({
  action: () => api.viewCampaign(route.params.id as string),
  onSuccess: (response: any) => {
    console.log(response);

    campaign.value = response.data;
  },
});
</script>

<style></style>
