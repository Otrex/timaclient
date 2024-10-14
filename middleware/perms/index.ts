import { ProfileSetupState, UserType } from "~/lib/enums";
import { log } from "~/utils";

export type IProfile = NonNullable<ReturnType<typeof useAuthStore>["profile"]>;
type RegisterHandler = Pick<Record<UserType, (profile: IProfile, progress: ProfileSetupState) => Promise<any>>, UserType.BRAND | UserType.INFLUENCER>
export const register: RegisterHandler = {
  [UserType.BRAND]: async (profile, progress) => {
    log("-- Checking the register - brand block");

    if (!profile.hasVerifiedEmail) {
      return navigateTo({
        name: "RegisterBasicDetails",
        query: {
          verify: 1,
        },
      });
    }

    if (progress === ProfileSetupState.REGISTERED) {
      return navigateTo({
        name: "SignUpBrandCompanyInfo",
      });
    }

    if (progress === ProfileSetupState.PROFILE_SETUP) {
      return navigateTo({
        name: "SignUpBrandAddress",
      });
    }

    if (progress === ProfileSetupState.PROFILE_SETUP_COMPLETED) {
      return navigateTo({
        name: "SignUpBrandIndustry",
      });
    }

    if (progress === ProfileSetupState.INDUSTRY_SELECTED) {
      return navigateTo({
        name: "SignUpBrandReviewProfile",
      });
    }
  },
  [UserType.INFLUENCER]: async (profile, progress) => {
    log("-- Checking the register - influencer block");

    const signUpNavigate = (tab: string) => navigateTo({
      name: "SignUp",
      params: {
        type: UserType.INFLUENCER,
      },
      query: {
        tab
      },
    })

    if (!profile.hasVerifiedEmail) {
      return signUpNavigate(constants.EMAIL_VERIFY);
    }

    if (progress === ProfileSetupState.REGISTERED) {
      return signUpNavigate(constants.COMPLETE_PROFILE);
    }

    if (progress === ProfileSetupState.PROFILE_SETUP) {
      return signUpNavigate(constants.ADDRESS_DOCUMENTATION_INFLUENCER);
    }

    if (progress === ProfileSetupState.PROFILE_SETUP_COMPLETED) {
      return signUpNavigate(constants.INDUSTRY_SELECTION);
    }

    if (progress === ProfileSetupState.INDUSTRY_SELECTED) {
      return navigateTo({
        name: "SignUpSocials",
        params: {
          type: UserType.INFLUENCER,
        },
      })
    }
  },
}