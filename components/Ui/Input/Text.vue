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
          props.search ? 'input-search' : '',
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
  search?: boolean;
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
<style>
.input-search {
  background-image: url('data:image/svg+xml;utf8,<svg width="16" height="17" fill="transparent" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg"><path d="M14.6673 15.1667L13.334 13.8334M7.66732 14.5C8.49902 14.5 9.32258 14.3362 10.091 14.0179C10.8594 13.6997 11.5576 13.2332 12.1457 12.645C12.7338 12.0569 13.2003 11.3588 13.5186 10.5904C13.8368 9.82197 14.0007 8.99841 14.0007 8.16671C14.0007 7.335 13.8368 6.51144 13.5186 5.74305C13.2003 4.97465 12.7338 4.27647 12.1457 3.68836C11.5576 3.10026 10.8594 2.63375 10.091 2.31547C9.32258 1.99719 8.49902 1.83337 7.66732 1.83337C5.98761 1.83337 4.3767 2.50063 3.18897 3.68836C2.00124 4.87609 1.33398 6.487 1.33398 8.16671C1.33398 9.84641 2.00124 11.4573 3.18897 12.645C4.3767 13.8328 5.98761 14.5 7.66732 14.5Z" stroke="%23BBBBBB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: 0.75rem center;
  padding-left: calc((0.75rem * 2.5) + 1rem);
  /* Additional styles for the container element */
}
</style>
