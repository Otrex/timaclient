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
          props.errorMessage && '!border-red-600',
          'pr-[6.4375rem]',
          $attrs.class,
          'px-[1.5rem] bg-[#efefef] w-full py-[0.75rem] dark:text-black rounded-[2.5rem] text-[1.1875rem] placeholder:text-[#999999]',
        ]"
      />
      <div
        class="absolute top-[2px] max-w-[6.4375rem] bottom-[2px] right-[2px] flex items-center bg-inherit justify-center rounded-r-[2.5rem]"
      >
        <select
          class="w-full h-full bg-[#CCE9FF] dark:text-[#000] border-0 rounded-[2.5rem]"
        >
          <option
            v-for="(opt, idx) in props.options"
            :value="opt.value"
            :key="idx"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
    <transition>
      <div
        v-if="props.errorMessage"
        class="mt-[0.3125rem] text-red-600 text-[0.875rem]"
      >
        {{ props.errorMessage }}
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  modelValue?: string | number;
  passwordToggle?: boolean;
  errorMessage?: string;
  options: ReturnType<typeof tools.generationOptions>;
}>();

const attrs = useAttrs();

const selection = ref(props.options[0].value);

const input = ref<HTMLInputElement>();
const typeState = ref("password");
const emits = defineEmits(["update:modelValue"]);

function update(e: any) {
  if (attrs.type === "number")
    emits(
      "update:modelValue",
      attrs.type === "number" ? +e.target.value : e.target.value
    );
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
