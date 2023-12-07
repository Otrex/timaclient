<template>
  <div class="inline-block">
    <label class="block">
      <input
        :type="typeMap[props.type]"
        :name="props.name"
        class="hidden"
        :disabled="props.disabled"
        @change="update"
      />
      <div
        :class="[
          'p-[0.6875rem] rounded-[2.5rem] border border-solid border-[#111111] dark:border-[#eee] hover:ring-4 hover:ring-slate-300',
          isActive &&
            (props.activeClass || variantActiveCSS[props.variant || 'primary']),
        ]"
      >
        <p :class="$attrs.class">{{ props.label }}</p>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  type: "multi" | "single";
  variant?: "primary";
  disabled?: boolean;
  label: string;
  name: string;
  value?: string | number;
  modelValue?: string | number | string[] | number[];
  activeClass?: string;
}
const props = defineProps<IProps>();
const emits = defineEmits(["update:modelValue"]);
const isActive = computed(() => {
  return Array.isArray(props.modelValue)
    ? props.modelValue.includes(props.value as never)
    : props.modelValue === props.value;
});
const typeMap = {
  multi: "checkbox",
  single: "radio",
};

const variantActiveCSS = {
  primary:
    "border border-red-600 dark:border-red-600 border-solid text-red-600",
};

function update() {
  if (Array.isArray(props.modelValue)) {
    const newArray = [...props.modelValue];
    const index = props.modelValue.findIndex((e) => props.value === e);
    if (index >= 0) {
      newArray.splice(index, 1);
    } else {
      newArray.push(props.value!);
    }
    return emits("update:modelValue", newArray);
  }

  return emits("update:modelValue", props.value);
}
</script>

<style></style>
