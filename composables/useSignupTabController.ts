export default function () {
  const tabMap = {
    [constants.BASIC_DETAILS]: {
      prev: { name: "index" },
      activeOthers: [
        constants.EMAIL_VERIFY
      ],
    },
    [constants.EMAIL_VERIFY]: {
      prev: { name: "index" },
      activeOthers: [
        constants.BASIC_DETAILS
      ],
    },
    [constants.BASIC_INFORMATION]: {
      prev: {
        query: {
          tab: constants.BASIC_DETAILS
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS
      ],
    },
    [constants.COMPLETE_PROFILE]: {
      prev: {
        query: {
          tab: constants.BASIC_DETAILS
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS
      ],
    },
    [constants.ADDRESS_DOCUMENTATION]: {
      prev: {
        query: {
          tab: constants.COMPLETE_PROFILE
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS
      ],
    },
    [constants.INDUSTRY_SELECTION]: {
      prev: {
        query: {
          tab: constants.ADDRESS_DOCUMENTATION
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS
      ],
    },
    [constants.BANK_DETAILS]: {
      prev: {
        query: {
          tab: constants.INDUSTRY_SELECTION
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS
      ],
    },
    [constants.CONTENT_CATEGORY]: {
      prev: {
        query: {
          tab: constants.INDUSTRY_SELECTION
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS
      ],
    },
  };

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
    () => (route.params.type || "influencer") as string
  );

  function previousTab(tab: keyof typeof tabMap) {
    return tabMap[tab].prev || { query: { tab: constants.BASIC_DETAILS } };
  }

  function isType(type: string) {
    return userType.value === type
  }

  return {
    currentTab,
    previousTab,
    userType,
    tabMap,
    isType,
    isActiveTab
  }
}