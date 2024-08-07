<template>
  <div class="inline-block transition-all">
    <transition>
      <div
        v-show="props.errorMessage"
        class="text-red-600 text-left text-[0.875rem]"
      >
        {{ props.errorMessage }}
      </div>
    </transition>
    <select
      :class="[
        props.errorMessage && '!border-red-600',
        'px-[1.5rem] py-[0.75rem] bg-[#efefef] w-full dark:text-black rounded-[2.5rem] text-[1.1875rem] placeholder:text-[#999999]',
      ]"
      v-model="selected"
    >
      <option disabled selected class="text-[#999999]">
        {{ props.placeholder || "-- Select --" }}
      </option>
      <option
        v-for="(option, idx) in shallowOptions"
        :key="idx"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="flex flex-wrap gap-[1rem] px-[1.875rem] mt-[0.4375rem]">
      <transition-group mode="in-out">
        <template v-for="(select, idx) in selections" :key="idx">
          <div class="inline-flex bg-[#696969] rounded overflow-hidden">
            <div class="flex text-white px-[6px] items-center">
              <span>{{ select }}</span>
            </div>
            <button
              @click="removeSelection(idx)"
              class="bg-[#7A7A7A] active:bg-gray-700 aspect-square px-[0.375rem] flex items-center"
            >
              <UtSvg
                name="close"
                class="w-[0.625rem] text-white h-[0.625rem]"
              />
            </button>
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: { label: string; value: string }[];
  placeholder?: string;
  modelValue?: string[];
  errorMessage?: string;
}>();

// const selected
const selected = ref();
const selections = computed({
  get() {
    return props.modelValue || [];
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
const shallowOptions = computed(() =>
  props.options.filter((option) => !selections.value.includes(option.value))
);

const emits = defineEmits(["update:modelValue"]);

watch(selected, () => {
  selections.value = Array.from(new Set([...selections.value, selected.value]));
});

const removeSelection = (index: number) => {
  selections.value.splice(index, 1);
  emits("update:modelValue", selections.value);
};
</script>

<style></style>
