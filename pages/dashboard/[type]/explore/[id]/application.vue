<template>
  <div class="p-[1.625rem] flex flex-col justify-between h-full">
    <div>
      <p class="font-bold">Application form</p>

      <section class="max-w-[62.5rem]">
        <div class="tima__form">
          <div class="md:w-5/12 pt-2">
            <label class="w-full block"> Have you worked with us before?</label>
          </div>
          <div class="md:w-7/12">
            <UiInputText
              class="w-full"
              placeholder="Write campaign name here"
            />
          </div>
        </div>

        <div class="tima__form">
          <div class="md:w-5/12 pt-2">
            <label class="w-full block">
              Have you used our product or service before?</label
            >
          </div>
          <div class="md:w-7/12">
            <UiInputText
              class="w-full"
              placeholder="Write campaign name here"
            />
          </div>
        </div>

        <div class="tima__form">
          <div class="md:w-5/12 pt-2">
            <label class="w-full block">
              If you have used our product or service before, what did you love
              about it?</label
            >
          </div>
          <div class="md:w-7/12">
            <UiInputText
              class="w-full"
              placeholder="Write campaign name here"
            />
          </div>
        </div>

        <div class="tima__form">
          <div class="md:w-5/12 pt-2">
            <label class="w-full block">
              In one or two sentences, tell us why you would like to work with
              us.</label
            >
          </div>
          <div class="md:w-7/12">
            <UiInputText
              class="w-full"
              placeholder="Write campaign name here"
            />
          </div>
        </div>
      </section>
    </div>

    <section class="text-center mb-[3.4375rem]">
      <UiButtonDefault
        variant="primary"
        class="py-[0.75rem] px-[3.75rem]"
        label="Submit Application"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Explore - Application",
});
</script>

<style scoped>
.tima__form {
  @apply flex md:flex-row flex-col gap-[3.125rem] w-full mb-[1.75rem];
}

.tima__form label {
  color: var(--clr-grey-400);
  font-size: 1rem;
}
</style>
