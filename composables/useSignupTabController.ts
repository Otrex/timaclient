export default function (tabMap: Record<any, any>) {
  const route = useRoute();
  function isActiveTab(...names: any[]): boolean {
    return (
      names.includes(currentTab.value) ||
      (tabMap[currentTab.value].activeOthers as string[]).includes(names[0])
    );
  }

  const currentTab = computed(
    () => (route.query.tab || "basic-details") as keyof typeof tabMap
  );
  const userType = computed(
    () => ((route.params.type as string) || constants.AGENCY).toUpperCase()
  );
  const currentView = computed(
    () => tabMap[currentTab.value]
  )
  const activeTabs = computed(() => [
    currentTab.value,
    ...tabMap[currentTab.value].activeOthers,
  ]);

  function previousTab(tab: keyof typeof tabMap) {
    return tabMap[tab].prev || { query: { tab: constants.BASIC_DETAILS } };
  }

  function isType(type: string) {
    return userType.value === type
  }

  function show(tab: keyof typeof tabMap) {
    return currentTab.value === tab && !(tabMap[tab].hideFrom as string[]).includes(userType.value);
  }

  return {
    activeTabs,
    currentView,
    currentTab,
    previousTab,
    type: isType,
    userType,
    tabMap,
    show,
    isActiveTab
  }
}