<template>
  <NuxtLayout :prev="steps[currentStepIndex - 1] || 'index'" name="kyc">
    <template #topnav>
      <div
        v-if="route.path.includes('/influencer/register')"
        class="items-center flex justify-end"
      >
        <span>
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="text-red-600 text-[1.1875rem] underline underline-offset-2"
          >
            Log In
          </NuxtLink>
        </span>
      </div>
    </template>
    <template #sidebar>
      <ul>
        <li v-for="(step, index) in steps" :key="index" class="mb-[3rem]">
          <NavSignUpStep
            :title="step.title"
            :desc="step.desc"
            :active="isActive(index)"
          />
        </li>
      </ul>
    </template>

    <div class="text-center">
      <UtSvg
        name="logo/tima"
        class="max-w-[6.125rem] h-[2.4375rem] mb-3 mt-[0.625rem]"
      />

      <div class="mb-[3.5625rem]"></div>
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const steps = [
  {
    name: "RegisterInfluencer",
    path: "/influencer/register",
    title: "Basic details",
    desc: "Please provide your name and details",
  },
  {
    name: "CompleteProfileInfluencer",
    path: "/influencer/complete-profile",
    title: "Complete Profile",
    desc: "Please provide your name and details",
  },
  {
    name: "SignUpAddressInfluencer",
    path: "/influencer/address",
    title: "Address & documentation",
    desc: "Provide address & necessary documentation",
  },
  {
    name: "SignUpIndustryInfluencer",
    path: "/influencer/industry",
    title: "Industry selection",
    desc: "Select the industry that best describes your Brand (max. of 2)",
  },
];

const currentStepIndex = computed(() => {
  if (route.path.includes("/influencer/review")) return 4;
  return steps.findIndex((step) => route.path.includes(step.path));
});

function isActive(num: number) {
  return currentStepIndex.value >= num;
}
</script>
