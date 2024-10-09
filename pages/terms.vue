<template>
  <div class="dark:bg-slate-800 pt-[6.25rem] dark:text-white w-full h-screen">
    <div class="dark:bg-slate-800 dark:text-white text-center max-w-[56.125rem] px-[0.625rem] mx-auto">
      <UtSvg name="logo/tima" class="max-w-[6.125rem] h-[2.4375rem] mb-[57px]" />
      <div class="text-left">
        <h1 class="text-[2.4375rem] text-center mb-[54px]">
          Terms & Conditions
        </h1>

        <p class="mb-3">
          Lorem ipsum dolor sit amet consectetur. Diam vivamus amet eu dolor id
          vivamus consectetur bibendum auctor. Nascetur velit dictumst diam est
          sociis enim in. A sed amet facilisis condimentum sed. Eu quisque morbi
          tristique iaculis tristique feugiat dignissim lorem. At sed augue duis
          platea ornare vestibulum. Neque odio id ligula tristique placerat.
          Tincidunt sagittis sit lacus duis tristique bibendum enim sit.
          Condimentum turpis sed eleifend diam urna egestas.
        </p>
        <p class="mb-3">
          Elit sagittis elit morbi at feugiat pretium dictum tristique. Tortor
          mattis felis eget tortor nisi nulla vitae. A vivamus lectus egestas
          tempor consequat nibh varius tincidunt. Euismod viverra aliquam
          iaculis pellentesque sed. In libero cras pharetra eget. Diam aliquam
          quis natoque sollicitudin enim egestas non lacus. Suspendisse donec
          nisi nisi nunc mi a sollicitudin commodo vitae. Nisl aliquet elementum
          dui pellentesque interdum lorem suscipit. Varius nulla feugiat id ac
          ornare consectetur lectus.
        </p>

        <p>
          Duis quisque urna faucibus non vel. Laoreet adipiscing in gravida leo
          sagittis massa mi cursus hendrerit. Suspendisse odio scelerisque nisl
          amet natoque nibh. Tellus blandit et nisi sollicitudin celerisque
          molestie. Suspendisse feugiat amet nunc ut ut viverra nunc pulvinar.
          Integer curabitur blandit risus elementum nunc ultrices nec dolor. Sit
          massa at suspendisse platea iaculis est arcu sit phasellus. Facilisi
          vivamus sapien hendrerit auctor fermentum tristique. Est dignissim at
          placerat consequat augue tristique sed cras. Massa ullamcorper nisi
          non posuere id. Tincidunt vitae quis mauris ac est arcu condimentum
          aenean. Amet eget non.
        </p>
      </div>

      <div class="flex flex-col gap-[1rem] max-w-[37.375rem] mx-auto mt-[3.4375rem]">
        <UiButtonDefault @click="toLogin" label="Go Back" variant="primary" class="w-full py-[0.875rem]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "TermsAndCondition",
});

const route = useRoute();
const router = useRouter();

function toLogin() {
  // window.location.href = "/auth/login";
  navigateTo(`/signup/${route.params.type}?tab=basic-details`);
}
</script>

<style></style>
