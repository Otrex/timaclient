import { RequestState, UserType } from "~/lib/enums";

export default Object.freeze({
  LOADING: RequestState.LOADING,
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
  CONTENT_CATEGORY: "content-category",
  COMPLETE_PROFILE: "complete-profile",

  BRAND_OVERVIEW: "brand-overview",
  BRAND_CREATIVE: "brand-creative",
  BRAND_INFLUENCERS: "brand-influencers",
  BRAND_PREVIEW: 'brand-preview',

  BASIC_DETAILS: "basic-details",
  EMAIL_VERIFY: "email-verify",
  BANK_DETAILS: "bank-details",
  PASSWORD: "password",
  REVIEW: "review",

  CAMPAIGN_PAYMENT: 'payment',
  CAMPAIGN_INFLUENCERS: 'influencers',
  CAMPAIGN_ANALYTICS: 'analytics',
  CAMPAIGN_PERSONAL_INFO: 'personal-info',
  CAMPAIGN_INFLUENCER_CAMPAIGN_INFO: 'campaign-info',

  INFLUENCER: UserType.INFLUENCER,
  AGENCY: UserType.BRAND,
});