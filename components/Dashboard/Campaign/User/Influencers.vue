<template>
  <div>
    <div
      class="mt-[0.6875rem] p-[1.25rem]"
      style="background: rgba(228, 243, 255, 0.5)"
    >
      <div>
        <UiInputText
          search
          placeholder="Search Influencers"
          class="mr-[1.75rem] max-w-[26.9375rem] placeholder:text-[color:--clr-grey-500] w-full border-[color:--clr-grey-500]"
        />
        <UiInputSelect
          class="max-w-[8.9375rem] w-full text-center border-[color:--clr-grey-500]"
          :options="tools.generationOptions(['all'])"
        />
      </div>

      <section class="mt-[2rem]">
        <div class="grid sm:grid-cols-3 md:grid-cols-4 gap-[1.1875rem]">
          <template v-for="(influencer, idx) in influencers" :key="idx">
            <NuxtLink :to="`/dashboard/campaign/influencer/${idx}`">
              <DashboardInfluencerCard
                :name="influencer.name"
                :socialMedia="influencer.socialMedia"
                :earnedMedia="influencer.earnedMedia"
                :engagements="influencer.engagements"
                :profilePicture="influencer.profilePicture"
                :comments="influencer.comments"
                :cover="influencer.cover"
                :likes="influencer.likes"
                :saved="influencer.saved"
                :date="influencer.date"
              />
            </NuxtLink>
          </template>
        </div>
      </section>
    </div>

    <div class="mt-[2.5rem]">
      <h3>Campaign Application</h3>
      <section class="mt-[1.5rem]">
        <div class="grid sm:grid-cols-3 md:grid-cols-4 gap-[1.1875rem]">
          <template v-for="(application, idx) in applications" :key="idx">
            <DashboardCampaignApplication
              :id="idx"
              :name="application.name"
              :type="application.type"
              :socials="application.socials"
              :profilePicture="application.profilePicture"
              :questionAndAnswers="application.questionAndAnswers"
            />
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const applications = ref([
  {
    name: "beautygoddess",
    type: "Independent",
    socials: ["instagram", "tiktok"],
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    questionAndAnswers: [
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
    ],
  },
  {
    name: "beautygoddess",
    type: "Independent",
    socials: ["instagram", "tiktok"],
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    questionAndAnswers: [
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
    ],
  },
  {
    name: "beautygoddess",
    type: "Independent",
    socials: ["instagram", "tiktok"],
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    questionAndAnswers: [
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
    ],
  },
]);

const influencers = ref([
  {
    name: "beautygoddess",
    socialMedia: ["tiktok", "instagram"],
    earnedMedia: 1000000,
    engagements: 3.17,
    likes: 10000,
    comments: 400,
    cover:
      "https://s3-alpha-sig.figma.com/img/3f1f/b607/f7a67d77ee51c7b76209f6a00b21f9b0?Expires=1703462400&Signature=K3Y4IKfHQaCFbPxaEfrSXkVIjBBZ8CgQd3k07zgUoQb1TAZiTfbrTmF8JF6uL8vQbVBiI7qtK5mOk1mkXpy7VSM2xtKxYsmMryygIXOaIbXbhwF6zv0oQpCTHLffnqI20MAChq3f29N54be5cRR9dPITUkUy0KxhKLG-c6aJZDStwway-y7jx~ikGgcGyHBUHYmemTVW9Oh-m2H-5YLvY2mbjbJjVQ-z6ZI8RQjfbGMgxclh3~CdRG14JFgezt0c~~wohHg1HjJ6TfDMZa1AUeu6eWK3PxKx153EuYAMhyoGHS2p0FNrjaTtoF-8MPpNKngPacujscx~2C4venBJ3Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    saved: 10,
    date: new Date().toISOString(),
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    name: "enioluwaofficial",
    socialMedia: ["instagram"],
    earnedMedia: 1000000,
    engagements: 3.17,
    likes: 10000,
    comments: 400,
    saved: 10,
    cover:
      "https://s3-alpha-sig.figma.com/img/3500/ebd4/2c3df37e017a1edc4bbaefbdcafae4b6?Expires=1703462400&Signature=WUGLUgvSP6ZmE7q5-UmRRu255tGWRG2ua3WS4bqp9VtK558lHYC4z8GfYm1oGKPxM5E4tfzhezsV13JsyRCuCCTXL4eWfDVf9tEtSc-MdS97p1VSb~ljbBI7RZjX01f2gYP~AswZ62gjsDwvBK7Su1g~nfARAJ3jltgWBFxYwKchYtSELLYHcS-sInbE-D-bNLOJy4paW7qPldZhGZouMRw83JyeozHSWTNnrEDonqWFJ5ObxOYUwqjM9Q8SJtIZFj2l4RIF1LB9XBIVKkeyMVrdjAnhnfMo0kRN~Ej6fieCGhy3sBTRHZt8CmV-WlGDeUqvuBSAjFeE1eYDgknjVg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    date: new Date().toISOString(),
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    name: "enioluwaofficial",
    socialMedia: ["instagram"],
    earnedMedia: 1000000,
    engagements: 3.17,
    likes: 10000,
    comments: 400,
    saved: 10,
    cover:
      "https://s3-alpha-sig.figma.com/img/107d/2e6f/d6e64341ab17e3132cec95089efd9d3d?Expires=1703462400&Signature=VSmbHDattshIwzutkGIWZtCdPEn6beS08S61TQH6qmEnXu8ys1C4IMYfKNb-lUo0UPl-WLvRbm2zWZCDjQNslCTZ6RbLnHgYko0CK8OlyiKIU3Ow9T~XkPRZTCGwvr2rWdhNtdk0N~c6a2KuHBc0hBwng40ylObLsp1mooVKw2Dis9AJpP5-lJEIQHW31-0-JCB8WqIwAAfZspXG-XNbclB98A6pJ29gNj5IeW2qZe~8cEfPklThA4DBJT5dqiUJX9eBQMFWJ8yRZ4DobmoKX7PPqIsJbictsbdQtF-ItxIpTMArut5~hCI6xt-j1kOxspeL-P4JDgacqDDEDG8ZVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    date: new Date().toISOString(),
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    name: "beautygoddess",
    socialMedia: ["tiktok", "instagram"],
    earnedMedia: 1000000,
    engagements: 3.17,
    likes: 10000,
    comments: 400,
    cover:
      "https://s3-alpha-sig.figma.com/img/3f1f/b607/f7a67d77ee51c7b76209f6a00b21f9b0?Expires=1703462400&Signature=K3Y4IKfHQaCFbPxaEfrSXkVIjBBZ8CgQd3k07zgUoQb1TAZiTfbrTmF8JF6uL8vQbVBiI7qtK5mOk1mkXpy7VSM2xtKxYsmMryygIXOaIbXbhwF6zv0oQpCTHLffnqI20MAChq3f29N54be5cRR9dPITUkUy0KxhKLG-c6aJZDStwway-y7jx~ikGgcGyHBUHYmemTVW9Oh-m2H-5YLvY2mbjbJjVQ-z6ZI8RQjfbGMgxclh3~CdRG14JFgezt0c~~wohHg1HjJ6TfDMZa1AUeu6eWK3PxKx153EuYAMhyoGHS2p0FNrjaTtoF-8MPpNKngPacujscx~2C4venBJ3Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    saved: 10,
    date: new Date().toISOString(),
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    name: "enioluwaofficial",
    socialMedia: ["instagram"],
    earnedMedia: 1000000,
    engagements: 3.17,
    likes: 10000,
    comments: 400,
    saved: 10,
    cover:
      "https://s3-alpha-sig.figma.com/img/3500/ebd4/2c3df37e017a1edc4bbaefbdcafae4b6?Expires=1703462400&Signature=WUGLUgvSP6ZmE7q5-UmRRu255tGWRG2ua3WS4bqp9VtK558lHYC4z8GfYm1oGKPxM5E4tfzhezsV13JsyRCuCCTXL4eWfDVf9tEtSc-MdS97p1VSb~ljbBI7RZjX01f2gYP~AswZ62gjsDwvBK7Su1g~nfARAJ3jltgWBFxYwKchYtSELLYHcS-sInbE-D-bNLOJy4paW7qPldZhGZouMRw83JyeozHSWTNnrEDonqWFJ5ObxOYUwqjM9Q8SJtIZFj2l4RIF1LB9XBIVKkeyMVrdjAnhnfMo0kRN~Ej6fieCGhy3sBTRHZt8CmV-WlGDeUqvuBSAjFeE1eYDgknjVg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    date: new Date().toISOString(),
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    name: "enioluwaofficial",
    socialMedia: ["instagram"],
    earnedMedia: 1000000,
    engagements: 3.17,
    likes: 10000,
    comments: 400,
    saved: 10,
    cover:
      "https://s3-alpha-sig.figma.com/img/107d/2e6f/d6e64341ab17e3132cec95089efd9d3d?Expires=1703462400&Signature=VSmbHDattshIwzutkGIWZtCdPEn6beS08S61TQH6qmEnXu8ys1C4IMYfKNb-lUo0UPl-WLvRbm2zWZCDjQNslCTZ6RbLnHgYko0CK8OlyiKIU3Ow9T~XkPRZTCGwvr2rWdhNtdk0N~c6a2KuHBc0hBwng40ylObLsp1mooVKw2Dis9AJpP5-lJEIQHW31-0-JCB8WqIwAAfZspXG-XNbclB98A6pJ29gNj5IeW2qZe~8cEfPklThA4DBJT5dqiUJX9eBQMFWJ8yRZ4DobmoKX7PPqIsJbictsbdQtF-ItxIpTMArut5~hCI6xt-j1kOxspeL-P4JDgacqDDEDG8ZVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    date: new Date().toISOString(),
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
]);
</script>

<style></style>
