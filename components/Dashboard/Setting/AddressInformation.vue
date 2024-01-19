<template>
  <div class="pt-[3.4375rem]">
    <div class="flex flex-col gap-[1.5rem]">
      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Post Code</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            :disabled="!props.isEditable"
            v-model="form.postCode"
            class="w-full"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Country</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputSelect
            type="text"
            class="w-full"
            :disabled="!props.isEditable"
            v-model="form.country"
            placeholder="Country"
            :options="optionsStore.$countries"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">State</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            :disabled="!props.isEditable"
            v-model="form.state"
            class="w-full"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">City</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            :disabled="!props.isEditable"
            v-model="form.city"
            class="w-full"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Street</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputText
            :disabled="!props.isEditable"
            v-model="form.street"
            class="w-full"
          />
        </div>
      </div>

      <div
        v-if="$route.params.type === constants.INFLUENCER"
        class="flex md:flex-row flex-col"
      >
        <div class="max-w-[22.125rem] w-full">
          <label class="text-[1.25rem] font-medium">Language</label>
        </div>
        <div class="flex items-center w-full">
          <UiInputSelect
            class="w-full"
            v-model="form.language"
            placeholder="Language"
            :options="optionsStore.$countryLanguages(form.country)"
          />
        </div>
      </div>

      <div class="flex md:flex-row flex-col">
        <div class="max-w-[22.125rem] w-full">&nbsp;</div>
        <div class="flex items-center w-full">
          <div class="mb-[1.875rem] mt-[7.625rem] w-full">
            <transition>
              <UiButtonDefault
                v-show="props.isEditable"
                @click="() => execute()"
                :disabled="state === constants.LOADING"
                :loading="state === constants.LOADING"
                class="w-full py-[0.875rem]"
                label="Save Changes"
                variant="primary"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isEditable?: boolean }>();
const profileStore = useProfileStore();
const optionsStore = useOptionsStore();
const { notify } = useNotification();

const form = useWatchedForm({
  monitor: profileStore.$profile?.address,
  fields: {
    postCode: "",
    country: "",
    language: "",
    street: "",
    state: "",
    city: "",
  },
});

const { execute, state } = useRequestState({
  action: () => profileStore.updateAddress(form),
  onError(e) {
    notify({
      type: "error",
      title: e.title,
      text: e.description,
    });
  },
  onSuccess() {
    notify({
      type: "success",
      title: "Update Successful",
      text: "Your address information has been updated",
    });
  },
});
</script>

<style></style>
