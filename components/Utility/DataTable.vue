<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 v-if="label" class="text-[1.25rem] mb-10 font-bold w-full">
        {{ label }}
      </h2>
      <div
        v-if="searchField"
        class="flex flex-row items-center mb-10 justify-end w-full"
      >
        <div class="max-w-[26.9375rem] w-full">
          <UiInputText
            search
            class="w-full"
            :placeholder="searchField.placeholder || 'Search'"
          />
        </div>
        <div>
          <slot name="filter"></slot>
        </div>
      </div>
    </div>

    <section>
      <table class="w-full">
        <thead>
          <th
            :style="colWidth"
            :class="['w-[--ww] !font-medium py-3', tclass?.thead]"
            v-for="(item, index) in thead"
            :key="index"
          >
            <slot name="thead" :item="item">
              <span class="font-bold">{{ item.label }}</span>
            </slot>
          </th>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tbody" :key="index">
            <td
              :class="tclass?.tbody"
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
    thead: {
      label: string;
      key: string;
    }[];
    tclass?: {
      thead?: string;
      tbody?: string;
    };
    tbody: {
      [key: string]:
        | string
        | number
        | ReturnType<typeof resolveComponent>
        | any;
    }[];
  }>(),
  {
    thead: () => [],
    tbody: () => [],
    filters: () => [],
  }
);

const emits = defineEmits(["update:filters"]);
const colWidth = computed(() => {
  const width = props.thead.length;
  return {
    "--ww": `${100 / width}%`,
  };
});
</script>

<style></style>
