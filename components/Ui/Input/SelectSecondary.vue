<template>
  <div class="inline-block rounded-lg !bg-transparent !border-0 !p-0">
    <select
      style="
        background-position: calc(100% - 20px) 50%;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDE0IDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMi45MTg4IDAuNjgwMTc2SDEuMDc4NzdDMC4xMTg3NzIgMC42ODAxNzYgLTAuMzYxMjI4IDEuODQwMTggMC4zMTg3NzIgMi41MjAxOEw1LjQ5ODc3IDcuNzAwMThDNi4zMjg3NyA4LjUzMDE4IDcuNjc4NzcgOC41MzAxOCA4LjUwODc3IDcuNzAwMThMMTAuNDc4OCA1LjczMDE4TDEzLjY4ODggMi41MjAxOEMxNC4zNTg4IDEuODQwMTggMTMuODc4OCAwLjY4MDE3NiAxMi45MTg4IDAuNjgwMTc2WiIgZmlsbD0iIzU0NTQ1NCIvPgo8L3N2Zz4=');
      "
      :class="[
        props.errorMessage && '!border-red-600 ',
        'bg-no-repeat border border-[#BBBBBB] bg-[length:12px_12px] bg-right appearance-none px-[1.5rem] bg-transparent py-[0.75rem] dark:text-black rounded-lg text-base text-[#B0B0B0] placeholder:text-[#B0B0B0]',
      ]"
      v-bind="$attrs"
      v-model="value"
    >
      <option v-if="props.placeholder" disabled selected class="text-[#B0B0B0]">
        {{ props.placeholder }}
      </option>
      <option
        v-for="(option, idx) in props.options"
        :key="idx"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <transition>
      <div
        v-show="props.errorMessage"
        class="text-red-600 text-left text-[0.875rem]"
      >
        {{ props.errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: { label: string; value: string }[];
  placeholder?: string;
  modelValue?: string;
  errorMessage?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue || props.placeholder;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style></style>
