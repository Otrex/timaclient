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
  postCode: {
    required: helpers.withMessage("Please enter a valid postalCode", required),
    minLength: helpers.withMessage(
      "postalCode should be at least 3 characters",
      minLength(3)
    ),
  },

  profilePicture: {
    required: helpers.withMessage("Please select a valid picture", required),
  },
  companyRegDocs: {
    required: helpers.withMessage("Please select a valid document", required),
  }
}

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