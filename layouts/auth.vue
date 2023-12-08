<template>
  <div class="w-full h-screen flex flex-row">
    <div class="flex-1 dark:bg-black dark:text-white">
      <div>
        <div class="p-[2.5rem] flex flex-row items-center pt-[2.1875rem]">
          <NuxtLink v-show="!props.hideBack" :to="props.prev || '/'">
            <UtSvg name="long-back" class="w-[1.5rem] h-[0.75rem]" />
          </NuxtLink>
          <div class="w-full">
            <div class="items-center flex justify-end">
              <span
                >Don’t have an account?
                <NuxtLink
                  to="/"
                  class="text-red-600 text-[1.1875rem] underline underline-offset-2"
                  >Sign Up</NuxtLink
                >
              </span>
            </div>
          </div>
        </div>
        <div class="px-[2.5rem]">
          <div>
            <div class="text-center overflow-auto">
              <UtSvg
                name="logo/tima"
                class="max-w-[6.125rem] h-[2.4375rem] mb-[3.5625rem] mt-[0.625rem]"
              />
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  prev?: string | object;
  hideBack?: boolean;
}>();
</script>
