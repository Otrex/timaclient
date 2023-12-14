<template>
  <div class="px-[1.625rem] pt-[1.875rem] pb-[2.5rem]">
    <DashboardExploreSearchPanel class="mb-[3.75rem]" />
    <h2 class="text-[2rem] mb-[1.375rem]">Recommended Campaigns</h2>
    <div class="flex flex-wrap gap-[1.0625rem]">
      <template v-for="(campaign, idx) in recommended" :key="idx">
        <NuxtLink :to="{ params: { id: idx }, name: 'Explore - Campaign' }">
          <LazyDashboardCampaignCard
            :image="campaign.image"
            :brand="campaign.brand"
            :budget="campaign.budget"
            :category="campaign.category"
            :deadline="campaign.deadline"
            :completion="campaign.completion"
            :description="campaign.description"
          />
        </NuxtLink>
      </template>
    </div>

    <h2 class="text-[2rem] mt-[1.5rem] mb-[1.375rem]">
      Top Campaigns for the week
    </h2>
    <div class="flex flex-wrap gap-[1.0625rem]">
      <template v-for="(campaign, idx) in topCampaigns" :key="idx">
        <LazyDashboardCampaignCard
          :image="campaign.image"
          :brand="campaign.brand"
          :budget="campaign.budget"
          :category="campaign.category"
          :deadline="campaign.deadline"
          :completion="campaign.completion"
          :description="campaign.description"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Explore",
});

const search = ref({
  category: "",
  campaignType: "",
  budgetRange: "",
  audienceDemography: "",
  campaignStatus: "",
});

const recommended = ref([
  {
    image:
      "https://s3-alpha-sig.figma.com/img/f471/8529/5eb4c6137c1f6a34dce366a5b1d7fdb9?Expires=1703462400&Signature=pXg2kh34Dd07t6~vtlzHiQ~F7vZjARpOCg2kX-IFDRj4iUr4u7DQXwzn~UH0I2ZA~EiPCFTmr4umzlndhRx~NEkK2gWQyhARaLv7tr5SEvZuNbPeT~EYjGvo8sQyX377JsBQ1COWOh8Rpho8pD2HYQotKfQQxb4KW5g6FbGjiRPTRR4RYqc~0YaRsCIG8IWuCRhX6v0iK6wXYhEHF3w2jyBLTy5H5Pv13~VupdMiau2-kO02e-cvS4Wjc63D8B3Tb0L2lIK5tPxgDShCJ~rxQtIhhGgbsqbtrvGST8uAnH5A6tPWKxK5ZtMQPZ2vkkjnKvBE~vXXyhUA~NWB3ZcgHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    category: "Fashion",
    brand: "Nike",
    description: `Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.
Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.`,
    budget: 250000,
    deadline: new Date().toISOString(),
    completion: 90,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/89c4/b5e1/886e08005e6e82644da63d47bf31b135?Expires=1703462400&Signature=njQR94mDXHwDlFvuraWFk3XxXWgh1Lzks6QwtRljhlss~DNPRinHcB6WCTL6jqAQ9yCxa9WOk1WD~0h3opvLN4dQDku3s0SUHh0gQl4I3OorY8-XM~bzBJ8mCPpeXdoEoCWcXEEM56rz3oMs0nIuSoI91RNIlIkUvK3DPQ~R8O4AY6KLG1OXhtjzmbOZ8Ecq-k-RaHPT7AYQtiRtkTZsXWtyUBAIXAyHOUu20ec1rrqYjoKdsKVfQ8vXuo2D-ysZ9vZT1tP6smkQ0X5ruGTdXmMGdtcA0h86cCRh5FtGOdUoXIoFljIDSxKiHUE4zod7SNTfZv1jGCNrV7vPxhG3Sw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    category: "Fashion",
    brand: "Nike",
    description: `Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.
Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.`,
    budget: 250000,
    deadline: new Date().toISOString(),
    completion: 80,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/7b53/a6f4/55aa9991ebbed7337fc15e5e8cccb605?Expires=1703462400&Signature=MaJbKRAWwMEO7P40qbJuerRMeKkqeFMED7w9VB2szrgs1p-hMKBFeF-rkFnbjQwbrpSnjSg~-KiWluhDM35ePLibWy-zD6KLN0NY7oH5T0asEdCrSI0KrnB~FgRtvkLWS-xEdQI7iYxXoss7CvSGMeHDr5LgM24OzHvl57v5Az9DPRGsyVkDWQ6ErgI~9m8YPvgGrFDTsvpkXlROz42Beo2tS-JrV0v6Em8kZm8XkknK4mwxgtr3kJm9kZ9iaMTw1PWKZGxujo3PeGJJvhRbZkTArxqstjHx8Z5jnBDK3~gjK5RH2k~O428B3-jdWUhkl26osFfcBZk9QSzanzc3xA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    category: "Fashion",
    brand: "Nike",
    description: `Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.
Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.`,
    budget: 50000,
    deadline: new Date().toISOString(),
    completion: 80,
  },
]);

const topCampaigns = ref([
  {
    image:
      "https://s3-alpha-sig.figma.com/img/c360/a71b/7db3b2655bf684ea8078c0e34d960851?Expires=1703462400&Signature=CgN~cnIhb21VdCJBBgtOwCT2Y0XCWLRr6sOCIFxjUFnnhB2zda4ydvII6yJ8exQgvYv9kTfzBBFZDRdQ-oz8CXPnyIAK6Z7nrub5zuFzd89Qp5O14Mz3BjXsIrbvrMJ5L~04Dz-tfpd8DQDQ5L1n4H0VmwzBypmK8JqLna4KMSxO43VwTcw1-HDaLAguU~JmxdlmJQ-OGx9PiHWgrYnoaERwklkvFfOKwNVAbhncGdp2uBA9c5lPAjr~-oBoJjtCRwFTJvq~6v90OuPVE9iu3BPccHdpnfc~q-RQ5alKgvhZS6Oi-VojMXU6W7hs5HmZTv8VSyQVp00VgoSLy4-RfQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    category: "Fashion",
    brand: "Nike",
    description: `Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.
Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.`,
    budget: 250000,
    deadline: new Date().toISOString(),
    completion: 100,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/89c4/b5e1/886e08005e6e82644da63d47bf31b135?Expires=1703462400&Signature=njQR94mDXHwDlFvuraWFk3XxXWgh1Lzks6QwtRljhlss~DNPRinHcB6WCTL6jqAQ9yCxa9WOk1WD~0h3opvLN4dQDku3s0SUHh0gQl4I3OorY8-XM~bzBJ8mCPpeXdoEoCWcXEEM56rz3oMs0nIuSoI91RNIlIkUvK3DPQ~R8O4AY6KLG1OXhtjzmbOZ8Ecq-k-RaHPT7AYQtiRtkTZsXWtyUBAIXAyHOUu20ec1rrqYjoKdsKVfQ8vXuo2D-ysZ9vZT1tP6smkQ0X5ruGTdXmMGdtcA0h86cCRh5FtGOdUoXIoFljIDSxKiHUE4zod7SNTfZv1jGCNrV7vPxhG3Sw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    category: "Fashion",
    brand: "Nike",
    description: `Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.
Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.`,
    budget: 250000,
    deadline: new Date().toISOString(),
    completion: 80,
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/7b53/a6f4/55aa9991ebbed7337fc15e5e8cccb605?Expires=1703462400&Signature=MaJbKRAWwMEO7P40qbJuerRMeKkqeFMED7w9VB2szrgs1p-hMKBFeF-rkFnbjQwbrpSnjSg~-KiWluhDM35ePLibWy-zD6KLN0NY7oH5T0asEdCrSI0KrnB~FgRtvkLWS-xEdQI7iYxXoss7CvSGMeHDr5LgM24OzHvl57v5Az9DPRGsyVkDWQ6ErgI~9m8YPvgGrFDTsvpkXlROz42Beo2tS-JrV0v6Em8kZm8XkknK4mwxgtr3kJm9kZ9iaMTw1PWKZGxujo3PeGJJvhRbZkTArxqstjHx8Z5jnBDK3~gjK5RH2k~O428B3-jdWUhkl26osFfcBZk9QSzanzc3xA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    category: "Fashion",
    brand: "Nike",
    description: `Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.
Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.`,
    budget: 250000,
    deadline: new Date().toISOString(),
    completion: 80,
  },
]);
</script>

<style></style>
