
export interface Industry {
  name: string;
  description: string;
}

export interface Country {
  name: string;
  language: string[];
  currency: string;
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
  profilePicture: null;
  registeredDocument: null;
  notificationSetting: string;
  userid: null;
  createdOn: Date;
}

