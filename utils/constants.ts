import { RequestState, UserType } from "~/lib/enums";

export default Object.freeze({
  LOADING: RequestState.LOADING,

  BILLING_SUBSCRIPTION: "billing-subscription",
  BILLING_PAYMENT_METHOD: "billing-payment-method",
  BILLING_TRANSACTIONS: "billing-transactions",

  NOTIFICATION_SETTINGS_INFLUENCER: "notification-settings-influencer",
  ADDRESS_DOCUMENTATION_INFLUENCER: "address-documentation-v2",
  ADDRESS_DOCUMENTATION: "address-documentation",
  NOTIFICATION_SETTINGS: "notification-settings",
  PERSONAL_INFORMATION: "personal-information",
  ACCOUNT_DEACTIVATION: "account-deactivation",
  PAYMENT_INFORMATION: "payment-information",
  INDUSTRY_SELECTION: "industry-selection",
  BASIC_INFORMATION: "basic-information",
  BRAND_INFORMATION: "brand-information",
  ADDRESS_INFORMATION: "address-information",
  INDUSTRY_INFORMATION: "industry-information",
  BRAND_BILLING: "brand-billing",
  CONTENT_CATEGORY: "content-category",
  COMPLETE_PROFILE: "complete-profile",
  CAMPAIGN: "campaign",
  BRAND_OVERVIEW: "brand-overview",
  BRAND_CREATIVE: "brand-creative",
  BRAND_INFLUENCERS: "brand-influencers",
  BRAND_PREVIEW: "brand-preview",

  DEMOGRAPHIC_INFO: "demographic-BasicInformation",
  REVIEW_PROFILE: "review-profile",

  BASIC_DETAILS: "basic-details",
  EMAIL_VERIFY: "email-verify",
  BANK_DETAILS: "bank-details",
  PASSWORD: "password",
  REVIEW: "review",

  CAMPAIGN_PAYMENT: "payment",
  CAMPAIGN_INFLUENCERS: "influencers",
  CAMPAIGN_ANALYTICS: "analytics",
  CAMPAIGN_PERSONAL_INFO: "personal-info",
  CAMPAIGN_INFLUENCER_CAMPAIGN_INFO: "campaign-info",

  INFLUENCER: UserType.INFLUENCER,
  ADMIN: UserType.ADMIN,
  AGENCY: UserType.BRAND,
});
