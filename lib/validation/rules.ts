import { email, helpers, minLength, required, url } from "@vuelidate/validators";

export const CREATE_USER_RULE = {
  email: {
    email: helpers.withMessage("Please enter a valid email", email),
  },
  username: {
    required: helpers.withMessage("Please enter a valid username", required),
  },
  password: {
    required: helpers.withMessage("Please enter your password", required),
    minLength: helpers.withMessage(
      "Password should be at least 6 characters",
      minLength(6)
    ),
  },
};

export const SIGN_IN_RULE = {
  identifier: {
    required: helpers.withMessage("Please enter a valid username or email", required),
  },
  password: {
    required: helpers.withMessage("Please enter your password", required),
  }
}

export const UPDATE_BRAND_INFO_RULE = {
  companyName: {
    required: helpers.withMessage("Please enter a valid company name", required),
  },
  phoneNumber: {
    required: helpers.withMessage("Please enter a valid phone number", required),
  },
  website: {
    url: helpers.withMessage("Please enter a valid url", url),
    required: helpers.withMessage("Please enter a website url", required),
  },
}