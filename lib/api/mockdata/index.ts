import { UserType } from "~/lib/enums";
import type { Authentication, Bank, Country, Industry, UserIndustry } from "~/lib/interfaces/core";
import { type ProfileInfo, type User } from "~/lib/interfaces/core"


export const auth: Authentication = {
  scope: null,
  token_type: "Bearer",
  expires_in: 3600,
  access_token: 'mock_token',
  refresh_token: `mock_refresh_token`,
}

export const mockBankList: Bank[] = Array.from({ length: 3 }, (_, index) => ({
  id: (index + 1).toString(),
  name: `Mock Bank ${index + 1}`,
  code: `MB${index + 1}`,
  longcode: (123456789 + index * 432198765).toString().slice(0, 9),
  longCode: (123456789 + index * 432198765).toString().slice(0, 9),
  gateway: `Mock Gateway ${index + 1}`,
  pay_with_bank: index !== 2,
  active: true,
  country: "Mock Country",
  currency: "MCK",
  type: "nuban",
  is_deleted: false,
  createdAt: `2023-05-0${index + 1}T00:00:00Z`,
  updatedAt: `2023-05-0${index + 1}T00:00:00Z`,
  slug: `mock-bank-${index + 1}`
}))

export const mockUserIndustry: UserIndustry[] = Array.from({ length: 3 }, (_, index) => ({
  userPublicId: `user-${index + 1}`,
  selectedIndustries: [`Industry ${index + 1}`, `Industry ${index + 2}`, `Industry ${index + 3}`],
  createdOn: new Date(`2023-05-0${index + 1}T12:00:00Z`).toISOString()
}))


export const mockProfileInfo: ((u: UserType, i?: number) => ProfileInfo) = (userType: UserType, index = Math.ceil(Math.random() * 10)) => ({
  username: `user${index + 1}`,
  publicId: `public-id-${index + 1}`,
  profile: {
    firstName: `John${index + 1}`,
    middleName: `Middle${index + 1}`,
    lastName: `Doe${index + 1}`,
    email: `john${index + 1}@example.com`,
    phoneNumber: `+1234567890${index + 1}`,
    userType,
    companyName: `Company ${index + 1}`,
    website: `https://www.example${index + 1}.com`,
    language: null,
    profilePicture: `https://example.com/profile${index + 1}.jpg`,
    registeredDocument: null,
    notificationSetting: `{"emailNotifications": true, "pushNotifications": false}`,
    userid: null,
    createdOn: new Date(`2023-05-0${index + 1}T00:00:00Z`),
    bio: `This is a mock bio for user ${index + 1}`,
    settingBackground: `https://example.com/background${index + 1}.jpg`
  }
})

export const mockIndustries: Industry[] = [
  {
    name: "Industry 1",
    description: "Description for Industry 1"
  },
  {
    name: "Industry 2",
    description: "Description for Industry 2"
  },
  {
    name: "Industry 3",
    description: "Description for Industry 3"
  },
  {
    name: "Industry 4",
    description: "Description for Industry 4"
  },
  {
    name: "Industry 5",
    description: "Description for Industry 5"
  }
]


export const mockCountries: Country[] = [
  {
    name: "United States",
    language: ["English"],
    currency: "USD"
  },
  {
    name: "Canada",
    language: ["English", "French"],
    currency: "CAD"
  },
  {
    name: "United Kingdom",
    language: ["English"],
    currency: "GBP"
  },
  {
    name: "Australia",
    language: ["English"],
    currency: "AUD"
  },
  {
    name: "Germany",
    language: ["German"],
    currency: "EUR"
  },
  {
    name: "France",
    language: ["French"],
    currency: "EUR"
  },
  {
    name: "Japan",
    language: ["Japanese"],
    currency: "JPY"
  },
  {
    name: "Brazil",
    language: ["Portuguese"],
    currency: "BRL"
  },
  {
    name: "India",
    language: ["Hindi", "English"],
    currency: "INR"
  },
  {
    name: "China",
    language: ["Mandarin"],
    currency: "CNY"
  }
]
