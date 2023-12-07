export default function () {
  const tabMap = {
    [constants.BASIC_DETAILS]: {
      prev: { name: "index" },
      activeOthers: [
        constants.EMAIL_VERIFY
      ],
      hideFrom: []
    },
    [constants.EMAIL_VERIFY]: {
      prev: { name: "index" },
      activeOthers: [
        constants.BASIC_DETAILS
      ],
      hideFrom: []
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
      hideFrom: [constants.INFLUENCER]
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
      hideFrom: [constants.AGENCY]
    },
    [constants.ADDRESS_DOCUMENTATION]: {
      prev: {
        query: {
          tab: constants.BASIC_INFORMATION
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS,
        constants.BASIC_INFORMATION
      ],
      hideFrom: []
    },
    [constants.INDUSTRY_SELECTION]: {
      prev: {
        query: {
          tab: constants.ADDRESS_DOCUMENTATION
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS,
        constants.BASIC_INFORMATION,
        constants.ADDRESS_DOCUMENTATION
      ],
      hideFrom: [constants.INFLUENCER]
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
      hideFrom: [constants.INFLUENCER]
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
      hideFrom: [constants.INFLUENCER]
    },
    [constants.REVIEW]: {
      prev: {
        query: {
          tab: constants.BANK_DETAILS
        }
      },
      activeOthers: [],
      hideFrom: [],
    },
    [constants.ADDRESS_DOCUMENTATION_INFLUENCER]: {
      prev: {
        query: {
          tab: constants.COMPLETE_PROFILE
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS,
        constants.COMPLETE_PROFILE
      ],
      hideFrom: [],
    },
    [constants.BANK_DETAILS]: {
      prev: {
        query: {
          tab: constants.ADDRESS_DOCUMENTATION_INFLUENCER
        }
      },
      activeOthers: [
        constants.BASIC_DETAILS,
        constants.COMPLETE_PROFILE,
        constants.ADDRESS_DOCUMENTATION_INFLUENCER
      ],
      hideFrom: [],
    },
    [constants.CONTENT_CATEGORY]: {
      prev: {
        query: {
          tab: constants.BANK_DETAILS
        }
      },
      activeOthers: [
        constants.BANK_DETAILS,
        constants.BASIC_DETAILS,
        constants.COMPLETE_PROFILE,
        constants.ADDRESS_DOCUMENTATION_INFLUENCER
      ],
      hideFrom: [],
    }
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

  function show(tab: keyof typeof tabMap) {
    return currentTab.value === tab && !(tabMap[tab].hideFrom as string[]).includes(userType.value);
  }

  return {
    currentTab,
    previousTab,
    userType,
    tabMap,
    isType,
    show,
    isActiveTab
  }
}