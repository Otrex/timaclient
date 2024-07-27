import { UserType } from "~/lib/enums";
import type { Address, Application, Notification, Authentication, Bank, BankDetails, Campaign, CampaignMetrics, Country, Industry, InfluencerBookmark, SocialType, UserIndustry, CampaignOptions, PaymentMethod, CampaignByName } from "~/lib/interfaces/core";
import { type ProfileInfo, type User } from "~/lib/interfaces/core"

const freeImageUrls = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtcGFpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGFpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGFpZ24lMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbXBhaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
]

function getRandomImage() {
  return freeImageUrls[Math.floor(Math.random() * freeImageUrls.length)]
}

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
    firstName: `${getRandomFirstName()}`,
    middleName: `${getRandomMiddleName()}`,
    lastName: `${getRandomFirstName()}`,
    email: `john${index + 1}@example.com`,
    phoneNumber: `+1234567890${index + 1}`,
    userType,
    companyName: `Company ${index + 1}`,
    website: `https://www.example${index + 1}.com`,
    language: null,
    profilePicture: getRandomImage(),
    registeredDocument: null,
    notificationSetting: `{"emailNotifications": true, "pushNotifications": false}`,
    userid: null,
    createdOn: new Date(`2023-05-0${index + 1}T00:00:00Z`),
    bio: `This is a mock bio for user ${index + 1}`,
    settingBackground: getRandomImage()
  }
})

export const mockCampaign: ((index?: number) => Campaign) = (index = Math.ceil(Math.random() * 10)) => ({
  publicId: `campaign-${index}`,
  brandName: `Brand ${index}`,
  overview: {
    name: `Campaign ${index}`,
    briefDescription: `This is a brief description for Campaign ${index}`,
    website: `https://www.campaign${index}.com`,
    plannedBudget: 10000 + index * 1000,
    costPerPost: 500 + index * 50,
    socialMediaPlatforms: ['Instagram', 'Facebook', 'Twitter']
  },
  influencer: {
    influencerCategory: ['Fashion', 'Lifestyle'],
    audienceSize: ['10K-50K', '50K-100K'],
    audienceGender: ['Male', 'Female'],
    audienceAgeGroup: ['18-24', '25-34'],
    audienceLocation: ['New York', 'Los Angeles'],
    publicId: "",
    username: "Ben",
    fullName: "ZBzen Hemm",
    email: "o@gmail.com",
    phoneNumber: "09025615232",
    profilePicture: `https://picsum.photos/200/200?random=${index}`,
  },
  creative: {
    paymentType: 'Fixed',
    startDate: new Date(`2023-06-${index < 10 ? '0' + index : index}T00:00:00Z`),
    endDate: new Date(`2023-07-${index < 10 ? '0' + index : index}T00:00:00Z`).toISOString(),
    contentType: ['Photo', 'Video'],
    contentPlacement: ['Feed', 'Story'],
    creativeBrief: `Creative brief for Campaign ${index}`,
    rules: `Rules for Campaign ${index}`,
    creativeTone: ['Casual', 'Friendly'],
    referenceLink: `https://reference.campaign${index}.com`,
    awarenessObjective: ['Brand Awareness', 'Reach'],
    acquisitionObjective: ['Website Traffic', 'App Installs'],
    thumbnail: getRandomImage(),
    visibility: true
  },
  status: index % 3,
  createdOn: new Date(`2023-05-${index < 10 ? '0' + index : index}T00:00:00Z`)
})


export const generateRandomIndustries = (count: number): Industry[] => {
  const industries: Industry[] = []
  const industryNames = [
    "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
    "Retail", "Agriculture", "Entertainment", "Transportation", "Energy",
    "Hospitality", "Real Estate", "Telecommunications", "Automotive", "Aerospace",
    "Pharmaceuticals", "Construction", "Media", "Food and Beverage", "Fashion",
    "Sports", "Tourism", "E-commerce", "Biotechnology", "Renewable Energy",
    "Artificial Intelligence", "Cybersecurity", "Logistics", "Marketing", "Consulting"

  ]

  const shuffled = [...industryNames].sort(() => 0.5 - Math.random())
  const selectedNames = shuffled.slice(0, Math.min(count, industryNames.length))

  for (const name of selectedNames) {
    industries.push({
      name,
      description: `Description for ${name} industry`
    })
  }

  return industries
}

export const generateRandomSocialTypes = (count: number): SocialType[] => {
  const socialTypes: SocialType[] = [
    { name: 'Facebook', logo: 'facebook-logo.png' },
    { name: 'Instagram', logo: 'instagram-logo.png' },
    // { name: 'Twitter', logo: 'twitter-logo.png' },
    // { name: 'LinkedIn', logo: 'linkedin-logo.png' },
    // { name: 'YouTube', logo: 'youtube-logo.png' },
    // { name: 'TicTok', logo: 'tiktok-logo.png' }
  ]
  return socialTypes
}

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

export function generateMockInfluencerBookmarks(count: number): InfluencerBookmark[] {
  const mockInfluencerBookmarks: InfluencerBookmark[] = []

  for (let i = 0; i < count; i++) {
    const mockInfluencerBookmark: InfluencerBookmark = {
      publicId: `influencer-${i + 1}`,
      username: `user${i + 1}`,
      fullName: `Influencer ${i + 1}`,
      email: `influencer${i + 1}@example.com`,
      phoneNumber: `+1234567890${i}`,
      profilePicture: `https://example.com/profile-picture-${i + 1}.jpg`,
      id: '' + (i + 1),
      campaignRecord: {
        publicId: `campaign-${i + 1}`,
        brandName: `Brand-${i + 1}`,
        overview: {
          name: `overview ${i + 1}`,
          briefDescription: `lorem ipsum ${i + 1}`,
          website: `https://go${i + 1}.test`,
          plannedBudget: 1000 * i,
          costPerPost: 20 * i,
          socialMediaPlatforms: ['tiktok', 'facebook'],
        },
        influencer: {
          influencerCategory: ['Fashion', 'Beauty', 'Lifestyle'],
          audienceSize: ['100000', '500000', '1000000'],
          audienceGender: ['Male', 'Female', 'Non-binary'],
          audienceAgeGroup: ['18-24', '25-34', '35-44'],
          audienceLocation: ['New York', 'Los Angeles', 'London', 'Paris', 'Tokyo'],
          publicId: `influcer-${i + 1}`,
          username: "user" + i + 1,
          fullName: "John Doe",
          email: "johndoe@example.com",
          phoneNumber: "+1 (555) 123-4567",
          profilePicture: "https://example.com/profile-picture.jpg"
        },
        creative: {
          paymentType: 'Fixed',
          startDate: new Date(),
          endDate: '2023-12-31',
          contentType: ['Video', 'Image', 'Story'],
          contentPlacement: ['Instagram', 'TikTok', 'YouTube'],
          creativeBrief: 'Create engaging content showcasing our new product line',
          rules: 'Must include product hashtag and brand mention',
          creativeTone: ['Energetic', 'Authentic', 'Informative'],
          referenceLink: 'https://example.com/campaign-reference',
          awarenessObjective: ['Brand Awareness', 'Reach'],
          acquisitionObjective: ['Website Traffic', 'App Installs'],
          thumbnail: getRandomImage(),
          visibility: true,
        },
        status: Math.ceil(Math.random() * 100),
        createdBy: 'public_id' + ' ' + i + 1,
        createdOn: new Date(),
      }
    }

    mockInfluencerBookmarks.push(mockInfluencerBookmark)
  }

  return mockInfluencerBookmarks
}

export function generateMockCampaignMetrics(count: number): CampaignMetrics[] {
  const mockCampaignMetrics: CampaignMetrics[] = []

  for (let i = 0; i < count; i++) {
    mockCampaignMetrics.push({
      total_value: {
        value: Math.floor(Math.random() * 10000),
      },
      id: `metric-${i + 1}`,
      name: `Metric ${i + 1}`,
      period: ['daily', 'weekly', 'monthly'][Math.floor(Math.random() * 3)],
      title: `Campaign Metric ${i + 1}`,
      description: `Description for campaign metric ${i + 1}`,
    })
  }

  return mockCampaignMetrics
}

export function generateMockApplications(count: number): Application[] {
  const mockApplications: Application[] = []

  for (let i = 0; i < count; i++) {
    mockApplications.push({
      applicationId: `app-${i + 1}`,
      campaignPublicId: `campaign-${i + 1}`,
      campaignName: `Campaign ${i + 1}`,
      campaignBudget: Math.floor(Math.random() * 100000) + 10000,
      campaignDescription: `Description for Campaign ${i + 1}`,
      username: `user${i + 1}`,
      fullName: `User ${i + 1}`,
      biography: `Biography for User ${i + 1}`,
      referenceLink: `https://example.com/reference-${i + 1}`,
      email: `user${i + 1}@example.com`,
      phoneNumber: `+1 (555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i).slice(1)}`,
      profilePicture: `https://example.com/profile-${i + 1}.jpg`,
      socialMediaPlatforms: ['Instagram', 'TikTok', 'YouTube'].sort(() => 0.5 - Math.random()).slice(0, 2),
      collaboration: ['Paid', 'Unpaid', 'Product Exchange'][i % 3],
      userExperience: ['Beginner', 'Intermediate', 'Expert'][i % 3],
      userExperienceBrief: `Experience brief for User ${i + 1}`,
      userMotivationBrief: `Motivation brief for User ${i + 1}`,
      status: ['Pending', 'Approved', 'Rejected'][i % 3],
      applicationDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      approvedBy: i % 3 === 1 ? `admin${i}` : null,
      submittedBy: `user${i + 1}`,
      reviewedBy: i % 3 !== 0 ? `reviewer${i}` : null,
      createdOn: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000),
      editedOn: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000),
    })
  }

  return mockApplications
}

export function generateMockAddress(): Address {
  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Cedar Ln', 'Pine St']
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ']
  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany']

  return {
    street: `${Math.floor(Math.random() * 1000) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    state: states[Math.floor(Math.random() * states.length)],
    postCode: String(Math.floor(Math.random() * 90000) + 10000),
    country: countries[Math.floor(Math.random() * countries.length)],
    createdOn: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
  }
}


function getRandomFirstName() {
  const firstNames = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
    "Isabella", "William", "Mia", "James", "Charlotte", "Benjamin", "Amelia",
    "Lucas", "Harper", "Henry", "Evelyn", "Alexander", "Abigail", "Michael",
    "Emily", "Daniel", "Elizabeth", "Jacob", "Sofia", "Logan", "Avery", "Jackson"
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function getRandomMiddleName() {
  const middleNames = [
    "Grace", "James", "Rose", "Alexander", "Marie", "William", "Elizabeth",
    "Joseph", "Anne", "Thomas", "Lynn", "Robert", "Mae", "John", "Louise",
    "Michael", "Jane", "David", "Nicole", "Christopher", "Michelle", "Daniel",
    "Renee", "Matthew", "Leigh", "Andrew", "Ann", "Richard", "Lee", "Charles"
  ];
  return middleNames[Math.floor(Math.random() * middleNames.length)];
}

export function generateMockBankDetails(): BankDetails {
  const bankNames = ['Chase', 'Bank of America', 'Wells Fargo', 'Citibank', 'US Bank']
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
  const swiftCodes = ['CHASUS33', 'BOFAUS3N', 'WFBIUS6S', 'CITIUS33', 'USBKUS44']

  return {
    createdOn: null,
    publicId: `bank_${Math.random().toString(36).substr(2, 9)}`,
    bankName: bankNames[Math.floor(Math.random() * bankNames.length)],
    currency: currencies[Math.floor(Math.random() * currencies.length)],
    swiftCode: swiftCodes[Math.floor(Math.random() * swiftCodes.length)],
    bankAddress: `${Math.floor(Math.random() * 1000) + 1} ${['Main St', 'Broadway', 'Park Ave', 'Wall St', '5th Ave'][Math.floor(Math.random() * 5)]}, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)]} ${String(Math.floor(Math.random() * 90000) + 10000)}`,
    accountName: `${getRandomFirstName()} ${getRandomMiddleName()} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
    accountNumber: String(Math.floor(Math.random() * 9000000000) + 1000000000),
  }
}
export function generateMockNotification(): Notification {
  const notificationTypes = ['info', 'warning', 'error', 'success']
  const titles = [
    'Account Update',
    'New Login',
    'Payment Received',
    'Password Changed',
    'Support Message'
  ]
  const messages = [
    'Your account has been updated',
    'New login detected',
    'Payment received',
    'Password changed successfully',
    'New message from support'
  ]

  return {
    title: titles[Math.floor(Math.random() * titles.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    type: notificationTypes[Math.floor(Math.random() * notificationTypes.length)],
    status: Math.random() < 0.5 ? 'read' : 'unread',
    createdOn: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
  }
}


export function generateMockCampaignOptions(): CampaignOptions {
  return {
    size: ['Nano', 'Micro', 'Macro', 'Mega'],
    gender: ['Male', 'Female', 'Non-binary', 'All'],
    ageGroup: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'],
    location: ['North America', 'Europe', 'Asia', 'Africa', 'South America', 'Australia'],
    monthlyIncome: ['$0-$1000', '$1001-$3000', '$3001-$5000', '$5001-$10000', '$10001+']
  }
}


export function generateMockCampaignStrategies(): {
  contentType: string[]
  contentPlacement: string[]
  creativeTone: string[]
  objectiveAwareness: string[]
  objectiveAcquisition: string[]
} {
  return {
    contentType: ['Video', 'Image', 'Text', 'Carousel', 'Story'],
    contentPlacement: ['Feed', 'Stories', 'Reels', 'Explore', 'In-Stream'],
    creativeTone: ['Humorous', 'Serious', 'Inspirational', 'Informative', 'Emotional'],
    objectiveAwareness: ['Brand Awareness', 'Reach', 'Video Views', 'Ad Recall Lift'],
    objectiveAcquisition: ['Website Traffic', 'App Installs', 'Lead Generation', 'Conversions', 'Store Traffic']
  }
}

export function generateMockPaymentMethod(): PaymentMethod {
  const paymentTypes = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer']

  return {
    name: `Payment Method ${Math.floor(Math.random() * 1000)}`,
    type: paymentTypes[Math.floor(Math.random() * paymentTypes.length)],
    createdOn: new Date()
  }
}

export function generateRandomPaymentMethods(num: number): PaymentMethod[] {
  const paymentMethods = []
  for (let i = 0; i < num; i++) {
    paymentMethods.push(generateMockPaymentMethod())
  }
  return paymentMethods
}


export function generateMockCampaignsByName(num: number): CampaignByName[] {
  const campaigns: CampaignByName[] = []
  for (let i = 0; i < num; i++) {
    campaigns.push({
      campaignId: `campaign-${Math.random().toString(36).substr(2, 9)}`,
      name: `Campaign ${i + 1}`,
      banner: `https://example.com/banner-${i + 1}.jpg`,
      description: `This is a mock description for Campaign ${i + 1}.`
    })
  }
  return campaigns
}

export function generateMockPaymentStatsData() {
  const randomNumber = () => Math.floor(Math.random() * 10000) + 1000; // Generates a random number between 1000 and 10000

  return {
    totalBudget: randomNumber(),
    totalClientPaid: randomNumber(),
    totalAmountPaid: randomNumber(),
    totalBalance: randomNumber()
  };
}



