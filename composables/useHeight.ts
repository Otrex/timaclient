export default function (baseHeight = 300) {
  const container = ref<HTMLDivElement>();
  const parent = ref<number | string>(300);

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
      (container.value?.parentElement?.parentElement?.offsetHeight || 600) - 300;
    parent.value = parent.value < 300 ? baseHeight : parent.value;
    parent.value = parent.value > 700 ? parent.value - 200 : parent.value;
  });


  return {
    styleVar,
    parent,
    container
  }
}