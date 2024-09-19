<template>
  <button
    @click="setURLTab"
    class="bg-[#F7FCFF] hover:bg-gray-100 border border-[--clr-new-blue]/20 gap-[0.25rem] rounded-xl px-4 py-[0.9375rem] flex w-full flex-row items-center"
    :class="[
      route.query[props.field] === value &&
        'border-[--clr-new-blue] border-0 !border-b-2',
      isDefault &&
        !route.query[props.field] &&
        'border-[--clr-new-blue] border-0 !border-b-2',
    ]"
  >
    <div>
      <div class="p-2 bg-[--clr-new-blue] w-[40px] rounded-full aspect-square">
        <UtSvg :name="icon" dim w="1.25rem" h="1.25rem" />
      </div>
    </div>
    <div class="text-[1.125rem] text-black">
      {{ text }}
    </div>
  </button>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const props = defineProps({
  icon: {
    type: String,
    default: "cancel",
  },
  field: {
    type: String,
    default: "ctab",
  },
  text: {
    type: String,
    default: "Active",
  },
  value: {
    type: String,
  },
  isDefault: Boolean,
});

function setURLTab() {
  router.push({
    query: {
      [props.field]: props.value,
    },
  });
}
</script>

<style></style>
