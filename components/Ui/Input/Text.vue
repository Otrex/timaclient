<template>
  <div
    class="inline-block p-0 m-0 border-none outline-none bg-transparent relative"
  >
    <div class="p-0 m-0 border-none outline-none bg-transparent relative">
      <input
        ref="input"
        v-bind="$attrs"
        @input="update"
        :value="props.modelValue"
        :class="[
          $attrs.class,
          'px-[1.5rem] w-full py-[0.75rem] dark:text-black rounded-[2.5rem] text-[1.1875rem] placeholder:text-[#999999]',
        ]"
      />
      <div
        v-if="props.passwordToggle"
        tabindex="1"
        class="absolute top-[1px] bottom-[1px] right-[1px] flex items-center bg-inherit justify-center rounded-r-[2.5rem] w-[calc(2.5rem_+_0.75rem)]"
      >
        <UtSvg
          @click="togglePasswordVisibility"
          name="eye"
          :class="[
            typeState === 'password' ? 'text-[#333333]' : 'text-[#A4A4A4]',
            'w-[1.5rem] h-[1.5rem]',
          ]"
        />
      </div>
    </div>
    <div v-if="props.errorMessage" class="mt-[0.625rem] text-[0.875rem]">
      {{ props.errorMessage }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  modelValue?: string;
  passwordToggle?: boolean;
  errorMessage?: string;
}>();

const input = ref<HTMLInputElement>();
const typeState = ref("password");
const emits = defineEmits(["update:modelValue"]);

function update(e: any) {
  emits("update:modelValue", e.target.value);
}

function togglePasswordVisibility() {
  if (!input.value) return;
  if (input.value.type === "password") {
    input.value.type = "text";
  } else {
    input.value.type = "password";
  }
}
</script>
