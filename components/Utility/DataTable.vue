<template>
  <div :class="variant === 'secondary' && 'bg-[#F7F7F7] px-5 py-3 rounded-2xl'">
    <div
      class="flex items-center"
      :class="variant !== 'secondary' && 'justify-between'"
    >
      <h2
        v-if="label"
        :class="[
          variant !== 'secondary' && 'w-full',
          variant === 'secondary' && 'text-[#898989]',
        ]"
        class="text-[1.25rem] mb-10 font-bold"
      >
        {{ label }}
      </h2>
      <div
        v-if="searchField"
        :class="variant !== 'secondary' && 'justify-end'"
        class="flex flex-row items-center mb-10 w-full"
      >
        <div v-if="search" class="max-w-[26.9375rem] w-full">
          <UiInputText
            @input="(e) => emits('update:search', e)"
            :model-value="search"
            search
            class="w-full"
            :placeholder="searchField.placeholder || 'Search'"
          />
        </div>
        <div>
          <div
            v-if="secondaryTabFilters.length"
            class="flex flex-row items-center gap-5 ml-5"
          >
            <template
              v-for="(xfilter, index) in secondaryTabFilters"
              :key="index"
            >
              <UiInputOption
                name="tabfilter"
                type="single"
                class="!text-sm"
                main-class="py-1 text-[#898989] !bg-[#D9D9D9]"
                active-class="!bg-black text-white"
                :label="xfilter.label"
                :model-value="tabFilters"
                :value="xfilter.value"
                @update:model-value="(e) => emits('update:tabFilters', e)"
              />
            </template>
          </div>
          <slot name="filter"></slot>
        </div>
      </div>
    </div>

    <section>
      <table class="w-full">
        <thead>
          <th
            :style="colWidth"
            :class="[
              'w-[--ww] !font-medium py-3',
              tclass?.thead,
              variant === 'secondary' && 'text-[#898989] text-base text-center',
            ]"
            v-for="(item, index) in thead"
            :key="index"
          >
            <slot name="thead" :item="item">
              <span class="font-bold">{{ item.label }}</span>
            </slot>
          </th>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tbody"
            :key="index"
            :class="{
              'border-b': index !== tbody.length - 1 && variant == 'secondary',
            }"
          >
            <td
              :class="[tclass?.tbody, variant === 'secondary' && 'align-top']"
              v-for="(item, index) in thead"
              :key="index"
            >
              <slot
                name="tbody"
                :row="row"
                :field="item.key"
                :item="row[item.key]"
              >
                <component
                  v-if="isVueComponent(row[item.key])"
                  :is="row[item.key]"
                />
                <span v-else>{{ row[item.key] }}</span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { isVueComponent } from "@/utils";
const props = withDefaults(
  defineProps<{
    searchField?: {
      placeholder?: string;
    };
    theadClass?: string;
    label?: string;
    filters?: {
      label: string;
      value: string;
    }[];
    secondaryTabFilters?: {
      label: string;
      value: string;
    }[];
    search?: string;
    thead: {
      label: string;
      key: string;
    }[];
    tclass?: {
      thead?: string;
      tbody?: string;
    };
    tabFilters?: string;
    tbody: {
      [key: string]:
        | string
        | number
        | ReturnType<typeof resolveComponent>
        | any;
    }[];
    variant?: "primary" | "secondary";
  }>(),
  {
    thead: () => [],
    tbody: () => [],
    filters: () => [],
    variant: "primary",
    secondaryTabFilters: () => [],
  }
);

const emits = defineEmits([
  "update:filters",
  "update:tabFilters",
  "update:search",
]);
const colWidth = computed(() => {
  const width = props.thead.length;
  return {
    "--ww": `${100 / width}%`,
  };
});
</script>

<style></style>
