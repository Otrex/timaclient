<template>
  <div class="inline-block">
    <label class="block">
      <input
        :type="typeMap[props.type]"
        :name="props.name"
        class="hidden"
        @change="update"
      />
      <div
        :class="[
          'p-[11px] rounded-[40px] border border-solid border-[#111111]',
          isActive && (props.activeClass || 'ring-4 ring-slate-300'),
        ]"
      >
        <p>{{ props.label }}</p>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  type: "multi" | "single";
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
