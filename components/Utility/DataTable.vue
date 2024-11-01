<template>
  <div
    :class="
      variant === 'secondary' && 'bg-[#F7F7F7] px-5 w-full py-3 rounded-2xl'
    "
  >
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

    <UtSpinner v-if="loading" />
    <section v-else class="mb-5 w-full overflow-x-auto">
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
        <tbody v-if="tbody.length">
          <tr
            v-for="(row, index) in tbody"
            :key="index"
            :class="{
              'border-b': index !== tbody.length - 1 && variant == 'secondary',
            }"
          >
            <td
              :class="[
                tclass?.tbody,
                variant === 'secondary' && 'align-top text-sm text-gray-700',
              ]"
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
        <tbody v-else>
          <tr>
            <td colspan="100%" class="text-center">
              <div class="py-8 flex flex-col items-center">
                <svg
                  class="w-16 h-16 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4 6h16M4 12h16m-7 6h7M4 18h4"
                  ></path>
                  <circle cx="12" cy="12" r="8" stroke-dasharray="2 4"></circle>
                </svg>
                <p class="text-gray-500 text-lg">No entries found</p>
                <p class="text-gray-400 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <UtPaginate
      :disabled="loading"
      v-if="page"
      :current-page="page.page"
      :total="page.total"
      :limit="page.limit"
      @update:currentPage="(e) => emits('update:page', e)"
    />
  </div>
</template>

<script lang="ts" setup>
import { isVueComponent } from "@/utils";

const props = withDefaults(
  defineProps<{
    searchField?: {
      placeholder?: string;
    };
    loading?: boolean;
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
    page?: {
      page: number;
      limit: number;
      total: number;
    };
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
  "update:page",
]);
const colWidth = computed(() => {
  const width = props.thead.length;
  return {
    "--ww": `${100 / width}%`,
  };
});
</script>

<style></style>
