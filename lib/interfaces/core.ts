export interface Bank {
  name: string;
  slug: string;
  code: string;
  longCode: null | string;
  country: string;
  currency: string;
  type: string;
}

export interface Industry {
  name: string;
  description: string;
}

export interface Country {
  name: string;
  language: string[];
  currency: string;
}
export interface Authentication {
  scope: null;
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  createdOn: Date;
}

export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  companyName: string;
  website: string;
  language: null;
  profilePicture: string | null;
  registeredDocument: null;
  notificationSetting: string;
  userid: null;
  createdOn: Date;
}

export interface ProfileInfo {
  username: string;
  publicId: string;
  profile: User;
}
