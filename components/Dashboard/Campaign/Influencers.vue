<template>
  <div class="mt-[1.4375rem]">
    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Category <sub class="block">(select all that apply)</sub>
        </label>
      </div>
      <div class="w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions([])"
        />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Audience size <sub class="block">(select all that apply)</sub>
        </label>
      </div>
      <div class="w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions([])"
        />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Audience Gender <sub class="block">(select all that apply)</sub>
        </label>
      </div>
      <div class="w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions([])"
        />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Audience Age group <sub class="block">(select all that apply)</sub>
        </label>
      </div>
      <div class="w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions([])"
        />
      </div>
    </div>

    <div class="flex flex-row w-full mb-[1.75rem]">
      <div class="w-1/4 pt-2">
        <label class="w-full block whitespace-nowrap">
          Audience Location <sub class="block">(select all that apply)</sub>
        </label>
      </div>
      <div class="w-3/4">
        <UiInputSelectMulti
          class="w-full"
          :options="tools.generationOptions([])"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
