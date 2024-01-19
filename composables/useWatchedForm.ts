export default function <R extends Record<string, any>, T extends Record<string, any>>(options: { fields: T, updater?: () => void, monitor?: R | null }) {
  const form = reactive(options.fields);

  const updater = options.updater || (() => {
    if (options.monitor) {
      Object.keys(form).forEach(key => {
        (form[key] as any) = options.monitor![key];
      })
    }
  });

  watch(() => options.monitor, updater);
  onMounted(updater);

  return form;
}