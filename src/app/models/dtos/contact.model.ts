import { Address } from './address.model';

export interface Contact {
  firstName: string;
  name: string;
  email: string;
  mobile: string;
  phone: string;
  address: Address;
  fullName: string;
}
