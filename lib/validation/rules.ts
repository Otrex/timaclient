import { email, helpers, minLength, required } from "@vuelidate/validators";

export const SET_TRANSACTION_PIN = {
  pin: {
    required: helpers.withMessage("Please enter your transaction pin", required),
    minLength: helpers.withMessage(
      "Your transaction pin should not be less than 5 digits",
      minLength(4)
    ),
  }
}

export const CREATE_USER_RULE = {
  emailAddress: {
    email: helpers.withMessage("Please enter a valid email", email),
  },
  userName: {
    required: helpers.withMessage("Please enter a valid username", required),
  },
  password: {
    required: helpers.withMessage("Please enter your password", required),
    minLength: helpers.withMessage(
      "Password should be at least 6 characters",
      minLength(6)
    ),
  },
  phoneNumber: {
    required: helpers.withMessage(
      "Please enter a valid phone number",
      required
    ),
  },
};

export const UPDATE_INFLUENCER_USER_RULE = {};

export const ADD_SOCIAL_VALIDATION = {
  name: {
    required: helpers.withMessage("Please enter name", required),
  },
  handle: {
    required: helpers.withMessage("Please enter your handle", required),
  },
};

export const CREATE_APPLICATION_RULE = {
  campaignPublicId: {
    required: helpers.withMessage(
      "No campaign selected. Please select a campaign",
      required
    ),
  },
  collaboration: {
    required: helpers.withMessage(
      "Please enter if you have worked with us before",
      required
    ),
  },
  userExperience: {
    required: helpers.withMessage(
      "Please enter if you have used our product or service before?",
      required
    ),
  },
  userExperienceBrief: {
    required: helpers.withMessage(
      "Please enter If you have used our product or service before, what did you love about it??",
      required
    ),
  },
  userMotivationBrief: {
    required: helpers.withMessage(
      "In one or two sentences, tell us why you would like to work with us.",
      required
    ),
  },
};

type Pass = ReturnType<typeof reactive<{ newPassword: string }>>;

export const UPDATE_PASSWORD_RULE = <T extends Pass>(form: T) => ({
  currentPassword: {
    required: helpers.withMessage("Please enter your password", required),
    minLength: helpers.withMessage(
      "Password should be at least 3 characters",
      minLength(3)
    ),
  },
  confirmPassword: {
    required: helpers.withMessage(
      "Please enter your confirm password",
      required
    ),
    sameAsRawValue: helpers.withMessage(
      "Passwords do not match",
      (data) => data === form.newPassword
    ),
  },
  newPassword: {
    required: helpers.withMessage("Please enter your new password", required),
    minLength: helpers.withMessage(
      "Your new password should not be less than 8 characters",
      minLength(8)
    ),
  },
});

export const CREATE_BANK_DETAILS_RULE = {
  accountNumber: {
    required: helpers.withMessage(
      "Please enter a valid Account Number",
      required
    ),
  },
  accountName: {
    required: helpers.withMessage(
      "Please enter a valid Account Name",
      required
    ),
  },
  bankAddress: {
    required: helpers.withMessage(
      "Please enter a valid Bank Address",
      required
    ),
  },
  bankCode: {
    minLength: helpers.withMessage(
      "Bank code should be at least 3 characters",
      minLength(3)
    ),
  },
  swiftCode: {
    minLength: helpers.withMessage(
      "Swift code should be at least 5 characters",
      minLength(5)
    ),
  },
  bankName: {
    required: helpers.withMessage("Please enter a valid Bank Name", required),
  },
};

export const COMPLETE_PROFILE_VALIDATOR = {
  firstName: {
    required: helpers.withMessage("Please enter a valid first name", required),
  },
  lastName: {
    required: helpers.withMessage("Please enter a valid last name", required),
  },
};

export const CREATE_BRAND_ADDRESS_VALIDATOR = {
  street: {
    required: helpers.withMessage("Please enter a valid street", required),
    minLength: helpers.withMessage(
      "street should be at least 3 characters",
      minLength(3)
    ),
  },
  country: {
    required: helpers.withMessage("Please enter a valid country", required),
    minLength: helpers.withMessage(
      "country should be at least 3 characters",
      minLength(3)
    ),
  },
  state: {
    required: helpers.withMessage("Please enter a valid state", required),
    minLength: helpers.withMessage(
      "state should be at least 3 characters",
      minLength(3)
    ),
  },
  city: {
    required: helpers.withMessage("Please enter a valid city", required),
    minLength: helpers.withMessage(
      "city should be at least 3 characters",
      minLength(3)
    ),
  },
  // postCode: {
  //   required: helpers.withMessage("Please enter a valid postalCode", required),
  //   minLength: helpers.withMessage(
  //     "postalCode should be at least 3 characters",
  //     minLength(3)
  //   ),
  // },

  profilePicture: {
    required: helpers.withMessage("Please select a valid picture", required),
  },
  companyRegDocs: {
    required: helpers.withMessage("Please select a valid document", required),
  },
};

export const CREATE_BRAND_ADDRESS_VALIDATOR_V2 = {
  street: {
    required: helpers.withMessage("Please enter a valid street", required),
    minLength: helpers.withMessage(
      "street should be at least 3 characters",
      minLength(3)
    ),
  },
  country: {
    required: helpers.withMessage("Please enter a valid country", required),
    minLength: helpers.withMessage(
      "country should be at least 3 characters",
      minLength(3)
    ),
  },
  language: {
    required: helpers.withMessage("Please enter a valid language", required),
  },
  state: {
    required: helpers.withMessage("Please enter a valid state", required),
    minLength: helpers.withMessage(
      "state should be at least 3 characters",
      minLength(3)
    ),
  },
  city: {
    required: helpers.withMessage("Please enter a valid city", required),
    minLength: helpers.withMessage(
      "city should be at least 3 characters",
      minLength(3)
    ),
  },
  // postCode: {
  //   required: helpers.withMessage("Please enter a valid postalCode", required),
  //   minLength: helpers.withMessage(
  //     "postalCode should be at least 3 characters",
  //     minLength(3)
  //   ),
  // }, REGISTERED

  profilePicture: {
    required: helpers.withMessage("Please select a valid picture", required),
  },
  companyRegDocs: {
    required: helpers.withMessage("Please select a valid document", required),
  },
};

export const SIGN_IN_RULE = {
  identifier: {
    required: helpers.withMessage(
      "Please enter a valid username or email",
      required
    ),
  },
  password: {
    required: helpers.withMessage("Please enter your password", required),
  },
};

export const UPDATE_BRAND_INFO_RULE = {
  companyName: {
    required: helpers.withMessage(
      "Please enter a valid company name",
      required
    ),
  },
  website: {
    url: helpers.withMessage(
      "Please enter a valid url",
      helpers.regex(
        /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/
      )
    ),
    required: helpers.withMessage("Please enter a website url", required),
  },
};

export const CREATE_CAMPAIGN_INFLUENCERS = {
  category: {
    required: helpers.withMessage(
      "Please select your influencer category",
      (data: string[]) => data.length > 0
    ),
  },
  audienceGender: {
    required: helpers.withMessage(
      "Please select your audience gender",
      (data: string[]) => data.length > 0
    ),
  },
  audienceAgeGroup: {
    required: helpers.withMessage(
      "Please select your audience age group",
      (data: string[]) => data.length > 0
    ),
  },
  audienceLocation: {
    required: helpers.withMessage(
      "Please select your audience location",
      (data: string[]) => data.length > 0
    ),
  },
  audienceSize: {
    required: helpers.withMessage(
      "Please select your audience size",
      (data: string[]) => data.length > 0
    ),
  },
};

export const CREATE_CAMPAIGN_CREATIVE = (form: Record<string, any>) => ({
  // paymentType: {
  //   required: helpers.withMessage(
  //     "Please select a valid payment type",
  //     required
  //   ),
  // },
  contentType: {
    required: helpers.withMessage(
      "Please select a valid content type",
      required
    ),
  },
  contentPlacement: {
    required: helpers.withMessage(
      "Please select a valid content placement",
      required
    ),
  },
  startDate: {
    required: helpers.withMessage(
      "Please enter a start date",
      (data?: string | Date) => !!data
    ),
    min: helpers.withMessage(
      "Your start date must be greater than your today's date",
      (data: string | Date) => new Date(data) >= new Date(Date.now())
    ),
  },
  endDate: {
    required: helpers.withMessage(
      "Please enter a end date",
      (data?: string | Date) => !!data
    ),
    min: helpers.withMessage(
      "Your end date must be greater than your start date",
      (data: string | Date) => new Date(data) > new Date(form.startDate)
    ),
  },
  creativeBrief: {
    required: helpers.withMessage(
      "Please enter a valid creative brief",
      required
    ),
  },
  creativeTone: {
    required: helpers.withMessage("Please select a creative tone", required),
  },
  campaignRule: {
    required: helpers.withMessage(
      "Please enter your rules for this campaign",
      required
    ),
  },
  referenceLink: {
    required: helpers.withMessage("Please enter your reference link", required),
  },

  campaignObjectiveAwareness: {
    required: helpers.withMessage(
      "Please select your awareness objectives",
      (data: string[]) => data.length > 0
    ),
  },

  campaignObjectiveAcquisition: {
    required: helpers.withMessage(
      "Please select your acquisition objectives",
      (data: string[]) => data.length > 0
    ),
  },

  banner: {
    required: helpers.withMessage("Please upload a thumbnail", required),
  },
});

export const CREATE_CAMPAIGN_OVERVIEW = {
  campaignName: {
    required: helpers.withMessage(
      "Please enter a valid campaign name",
      required
    ),
  },

  socialMediaPlatform: {
    required: helpers.withMessage(
      "Please select your social media platforms",
      (data: string[]) => data.length > 0
    ),
  },

  campaignAbout: {
    required: helpers.withMessage(
      "Please enter a valid campaign description",
      required
    ),
  },

  planningBudget: {
    required: helpers.withMessage(
      "Please enter a valid campaign budget",
      required
    ),
    max: helpers.withMessage(
      "Please enter a valid amount of budget",
      (data: number) => +data > 0
    ),
  },

  // costPerPost: {
  //   required: helpers.withMessage(
  //     "Please enter a valid campaign budget",
  //     required
  //   ),
  //   max: helpers.withMessage(
  //     "Please enter a valid amount of budget",
  //     (data: number) => +data > 0
  //   ),
  // },

  campaignWebsite: {
    url: helpers.withMessage(
      "Please enter a valid url",
      helpers.regex(
        /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/
      )
    ),
    required: helpers.withMessage("Please enter a website url", required),
  },
};
