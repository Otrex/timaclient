<template>
  <div class="p-[1.75rem]">
    <div class="flex justify-end">
      <div>
        <UiButtonDefault
          p="0.625rem"
          class="mr-[0.75rem]"
          variant="info-outline"
          label="Edit publications"
        />
        <UiButtonDefault variant="info" label="Add Publications" p="0.625rem" />
      </div>
    </div>

    <section class="mt-[0.75rem]">
      <div><img :src="src" alt="campaign banner" /></div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Campaign",
});

const src =
  "https://s3-alpha-sig.figma.com/img/8fe6/8571/c8e53c81e59e8694df607a6bf3018436?Expires=1703462400&Signature=FJ6hEMq~uLydgv0fRwBCDCdZnGbOawNY1DNYkKlF2LO2TygXq7C9S6Rc9GYprDWaW83ZAhCIxJKPxKkUD6afauKYoV1hrUpsDpIH0n43Ntu9C6YhmOYyH-d2C7Qu22q0VSK-soA6qp3gJ6MxYjuUIujcu-K1q9MVojFOQijGsqTXVLCZKIpOx3nrIR4C-wcpCRyM~MHIX9wphPH9LJRe-SSTxYPxjLt9EpOYHhKjuQOUyL~tz4fYEHQek2pc21yZyqjigMq9an9i1kVnsS6KnNsE7cRZ9DOtj62gYnG8DeIK0sYWnNDmOBFhKb2JvApSOUXDphrh23JGgtX4e~t~DQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
</script>

<style></style>
