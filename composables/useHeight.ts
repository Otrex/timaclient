export default function (baseHeight = 200) {
  const container = ref<HTMLDivElement>();
  const parent = ref<number | string>(200);

  const styleVar = computed({
    get() {
      return `--height: ${parent.value}px`;
    },
    set(value) {
      parent.value = value as unknown as number;
    },
  });

  onMounted(() => {
    parent.value =
      (container.value?.parentElement?.parentElement?.offsetHeight || 600) - 200;
    parent.value = parent.value < 200 ? baseHeight : parent.value;
    parent.value = parent.value > 700 ? parent.value - 200 : parent.value;
  });


  return {
    styleVar,
    parent,
    container
  }
}