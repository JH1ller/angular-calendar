export enum UserType {
  COMPANYADMIN = 'COMPANYADMIN',
}

export interface User {
  profile: {
    firstname: string;
    name: string;
    phone: string;
    gender: string;
    title: string;
  };
  usertype: UserType;
}
