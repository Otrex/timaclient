<template>
  <section class="bg-white p-8 rounded-2xl">
    <div class="flex flex-row justify-between items-center">
      <div>
        <h3 class="text-[1.25rem] font-semibold">Add Your Bank Details</h3>
        <p class="text-sm">
          You can add information for up to three different bank accounts.
        </p>
      </div>
      <div>
        <UtSvg name="close" dim w="1.2rem" h="1.2rem" @click="emit('close')" />
      </div>
    </div>
    <div class="hr my-3 mb-4" />
    <div>
      <div class="flex md:flex-row flex-col">
        <div class="flex items-center mb-4 w-full">
          <UiInputText
            type="text"
            class="w-full"
            v-model="bank"
            :disabled="!props.isEditable"
            :error-message="v$.bank?.$errors[0]?.$message.toString()"
            placeholder="Select Bank"
          />
        </div>
      </div>

      <div class="flex md:flex-row mb-4 flex-col">
        <div class="flex items-center w-full">
          <UiInputText
            :disabled="!props.isEditable"
            type="text"
            class="w-full"
            v-model="accountName"
            :error-message="v$.accountName?.$errors[0]?.$message.toString()"
            placeholder="Account Name"
          />
        </div>
      </div>

      <div class="flex md:flex-row mb-5 flex-col">
        <div class="flex items-center w-full">
          <UiInputText
            type="text"
            class="w-full"
            v-model="accountNumber"
            :disabled="!props.isEditable"
            :error-message="v$.accountNumber?.$errors[0]?.$message.toString()"
            placeholder="Account Number"
          />
        </div>
      </div>

      <div class="text-right">
        <UiButtonDefault
          variant="primary"
          class="py-2 px-8"
          label="Add"
          @click="emit('submit')"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isEditable?: boolean;
  accountName?: string;
  accountNumber?: string;
  bank?: string;
  v$: any;
}>();

const emit = defineEmits([
  "update:accountName",
  "update:accountNumber",
  "update:bank",
  "close",
  "submit",
]);

const accountName = computed({
  set(value: string) {
    emit("update:accountName", value);
  },
  get() {
    return props.accountName ?? "";
  },
});

const accountNumber = computed({
  set(value: string) {
    emit("update:accountNumber", value);
  },
  get(): string {
    return props.accountNumber ?? "";
  },
});

const bank = computed({
  set(value: string) {
    emit("update:bank", value);
  },
  get() {
    return props.bank ?? "";
  },
});
</script>

<style scoped>
.hr {
  @apply h-[1px] border-t border-gray-300;
}
</style>
