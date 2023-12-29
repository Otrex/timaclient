import { email, helpers, minLength, required } from "@vuelidate/validators";

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