<template>
  <div class="bg-white p-4 rounded-lg mb-4">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-base font-bold">{{ title }}</h3>
        <p class="text-sm text-gray-400 mt-1">{{ message }}</p>
        <div class="flex items-center text-sm gap-2 text-gray-400 mt-2">
          <svg
            width="24"
            height="24"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 7.25C12.5 7.05109 12.421 6.86032 12.2803 6.71967C12.1397 6.57902 11.9489 6.5 11.75 6.5C11.5511 6.5 11.3603 6.57902 11.2197 6.71967C11.079 6.86032 11 7.05109 11 7.25V12.75C11 13.02 11.144 13.268 11.378 13.401L14.878 15.401C15.0503 15.4941 15.2522 15.5161 15.4405 15.4624C15.6288 15.4086 15.7886 15.2833 15.8858 15.1133C15.9829 14.9433 16.0097 14.742 15.9604 14.5524C15.9112 14.3629 15.7897 14.2002 15.622 14.099L12.5 12.315V7.25Z"
              fill="#777777"
            />
            <path
              d="M12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1ZM2.5 12C2.5 14.5196 3.50089 16.9359 5.28249 18.7175C7.06408 20.4991 9.48044 21.5 12 21.5C14.5196 21.5 16.9359 20.4991 18.7175 18.7175C20.4991 16.9359 21.5 14.5196 21.5 12C21.5 9.48044 20.4991 7.06408 18.7175 5.28249C16.9359 3.50089 14.5196 2.5 12 2.5C9.48044 2.5 7.06408 3.50089 5.28249 5.28249C3.50089 7.06408 2.5 9.48044 2.5 12Z"
              fill="#777777"
            />
          </svg>

          <span>{{ time }}</span>
        </div>
      </div>

      <UiButtonDefault
        variant="info-outline"
        class="border-gray-300 text-gray-500 text-sm !px-5 !py-2"
        label="Review"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  message: String,
  time: String,
});
</script>

<style scoped></style>
