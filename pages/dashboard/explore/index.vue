<template>
  <div>
    <UtPermit :user-type="constants.INFLUENCER">
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
    </UtPermit>
    <UtPermit :user-type="constants.AGENCY">
      <div class="px-[1.625rem] mb-[2.5rem] pt-[1.875rem] pb-[2.5rem]">
        <DashboardExploreInfluencerSearchPanel class="mb-[3.75rem]" />

        <section class="mb-[3.25rem]">
          <h2 class="text-[2rem] mb-[1.375rem]">The Buzz</h2>
          <div class="flex flex-row gap-[1.125rem]">
            <template v-for="(buzz, idx) in buzzes" :key="idx">
              <UiBuzzCard
                class="w-full"
                :title="buzz.title"
                :bg="buzz.bg"
                :images="buzz.images"
              />
            </template>
          </div>
        </section>

        <section class="mb-[3.25rem]">
          <h2 class="text-[2rem] mb-[1.375rem]">Categories</h2>
          <div class="flex flex-row gap-[1.125rem]">
            <template v-for="(buzz, idx) in categories" :key="idx">
              <UiBuzzCard
                class="w-full"
                :title="buzz.title"
                :bg="buzz.bg"
                :images="buzz.images"
              />
            </template>
          </div>
        </section>
      </div>
    </UtPermit>
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

const buzzes = ref([
  {
    title: "New influencers on the block",
    bg: { from: "#00EAFF", to: "#3C8CE7" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
  {
    title: "Top 100 influencers for the week",
    bg: { from: "#ABDCFF", to: "#0396FF" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
  {
    title: "Top categories for the week",
    bg: { from: "#65FDF0", to: "#1D6FA3" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
]);

const categories = ref([
  {
    title: "Travel Influencers",
    bg: { from: "#FEB692", to: "#EA5455" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
  {
    title: "Technology Influencers",
    bg: { from: "#FCCF31", to: "#F55555" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
  {
    title: "Food Influencers",
    bg: { from: "#FAD7A1", to: "#E96D71" },
    images: [
      "https://s3-alpha-sig.figma.com/img/32d5/5881/e65f8cc2154698c97396551fb8ff99f3?Expires=1704067200&Signature=lctRoe33YBx-ZKtIcy9sV-1jbYDXsPUEJLFn1LgGkST1lZ7hHe8I4ozIim8Mg8DxvJs-t0hMLnVaJSn6IsYO-nr2XkKTtDJxf3qnthcDbgmepW1fpTWo6RzucXIY-abWBb-x1jB1crOPEbzzQei~-h-7rmSZvTkfLPyibFBqZ7atS5Zo1sap7Yh2pgjUnRyfXNTK-8ITD6aTHJvjkN~VrwTFJt4S1~8WbU79Cdibzf5FRYDoYgTH4skTGxUwLAkdIfZcWZpatryijP2Tk7z1oUdJHOW664YQJ~ADQXGhO9aO~F4XWWf9ebGm-I7uPMaumL4j4XNN6wr20lZiEb6mYA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1704067200&Signature=niAH7vYHmNuDIVjOTXo0YYiGgMTcL6uO1Al3Zi06qOzWV6fhmzLZX50Dg37qhhIuy~0VOgtiVemWTOXNFGYUnbpZu9TAsQ8178jWWHPxdfirhgpLMbQ7CCnn5z0j~6Z5zfl87kFbzlQFxmdzG5NDMvjsWC3qDLEFRPuccn~7fCOfiLMiuCaB3wzKhccr--uaxnxHaTk1w2yP3slSV4q8smI9aGIKkGv7ddebMu5RUrzqy1AdsICbOncr5yajEWFU-Oa-jBm8nbPGeIRLBZyPQhLO85b5J7EirQuUxCQjenjBUrXlp8t2PWDUIlqjBQalZvmJzGCJBdyWi5uN~H8KSA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/17c5/c2c5/8197e7a481cc597b5c2e5c41b2e7d9c7?Expires=1704067200&Signature=HWQBq2C6nSOxkBNMd1RJc9RpGh5AK-Tlb6q1rksuEMi3tRSy5SnbsKkNdv4cyyyx843-QYIo3JcesGOGUyRrcdkZy9epO-lF4A~~wNjFhRLF-s7VPJTiyky6ViHPffwIOnG4Lm3hNSNvdDOVVeF7V2sl8jUAE-e~xBD6DwBw~uf0Q-22UiU925f~AHV7wcYpyJltywUTuOh0FxOGu7rmziqJAC8oYXUWr7xNruw-4ezVJja9O4FA5TrTtXMwuXFRZxyFUOcKYLQErSlinPJh4hDd~iTSAv3k1Ye-Mu9LePVLm-Rc5PvVcZ~pJGTqqiJvH0x8X9aebg-Xr0Cce1OIew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/054b/0612/57d3493b65b102b195ab45bae13d31e3?Expires=1704067200&Signature=GM3mF8Lpz-DUtN64JXZ09yxuiNfwSse1t7fN4XG55EUQ3xo4YbGKgbALE~hwrzK2pn1kdfLGcXvnpeRH24J7rc7CdXr53InKFaZLpedK8Cvuh2SyTVfFXVT8CO2H6we0UZBdg10cZeJQ-F23TRutB23BGysB4yRAqUmokLwrpJTg~PH6ZpBHoCrhHWExscT4cKf1XoynAN0UlKlG1cQ~zTWDUre3V9vlRoR8P9fbtWMeg0UmoBwwwEYPoftDA5zHJ4TVzzZHjuwR6t0zroSf2F3R0hp7LDKJA4HNOM~xEbQwtbW8tz0UGyYCUlkHp2NeYf4~2uW2n~ea7xyw7R6-JA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      "https://s3-alpha-sig.figma.com/img/59f0/9bb1/d5c20440e4dd644295a5c845cbe2942f?Expires=1704067200&Signature=Z3Kq3Iw4JCgtUzGcDg2mION3ZADbCmSZkN5MDQ~thU69HI5o6HZ9ELlG8JVNqbOv2ZIR1BmYzcRbX-NsaWbkzHo9xafOXTw3RrG8zhHEODyGevuZwdOLXIaNQdZzmqPZpf3RErKEBYaEuyHMlpdL~aa9wDsv0G1Q49PfPv3ZpW8Z3Hhc2Y88n~psrVwDW~pmu-YYZNSqD00mRBFyf-9Hw1CbCxMqMqQvQ~wDTqTfXSnScTBkddVCAoSqL~rokhbJEn8g56c~SG-yzYBToDmXfpbFdF37XzhHW2d-ZiCmDUfRWlxyVVHr4Ar-CBJ2ZpRusuZh8I~AwZnPL1HcZVeDrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    ],
  },
]);
</script>

<style></style>
