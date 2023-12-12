<template>
  <div class="mt-[1.4375rem]">
    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block"> Payment type </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions(['crypto', 'money transfer'])"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Campaign start date
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText class="max-w-[19.625rem] w-full" type="date" />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Campaign end date
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText class="max-w-[19.625rem] w-full" type="date" />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Content type </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions(['test', 'test2'])"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Content placement
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions(['Main page', 'story'])"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Creative brief </label>
      </div>
      <div class="md:w-3/4">
        <UiInputTextArea class="w-full h-[9.125rem]" placeholder="Brief" />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Creative tone </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelect
          :options="tools.generationOptions(['Main page', 'story'])"
          class="w-full"
          placeholder="-- Select --"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap"> Campaign rules </label>
      </div>
      <div class="md:w-3/4">
        <UiInputTextArea class="w-full h-[9.125rem]" placeholder="Brief" />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-[90%] block"> Sample content reference link </label>
      </div>
      <div class="md:w-3/4">
        <UiInputText
          class="w-full"
          placeholder="Sample content reference link"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4 pt-2">
        <label class="w-full block leading-5">
          Campaign objective: awareness
          <sub class="md:block mt-1">(select up to 3)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions([])"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4">
        <label class="w-full block leading-5">
          Campaign objective: acquisition
          <sub class="md:block mt-1">(select up to 3)</sub>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions(['tex', 'ben'])"
        />
      </div>
    </div>

    <div class="tima__form">
      <div class="md:w-1/4">
        <label class="w-full block">
          Campaign thumbnail
          <p class="sm md:block max-w-[90%]">
            (it should be jpg/ png and not more 10 mb)
          </p>
        </label>
      </div>
      <div class="md:w-3/4">
        <UiInputUpload class="w-full" />
      </div>
    </div>

    <div class="tima__form pb-[1.875rem]">
      <div class="md:w-1/4">
        <UiInputSwitch size="lg" v-model="form.makeCampaignPublic" />
      </div>
      <div class="md:w-3/4">
        <h6 class="text-[1.4375rem]">Make campaign public</h6>
        <span>
          Influencers from all member platforms around the world can view and
          participate in this campaign. Additionally, you will have the option
          to personally invite influencers to join
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  makeCampaignPublic: false,
});
</script>

<style scoped>
.tima__form {
  @apply flex md:flex-row flex-col w-full mb-[1.75rem];
}
</style>
