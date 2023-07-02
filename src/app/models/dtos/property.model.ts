import { Address } from './address.model';
import { User } from './user.model';

export interface Property {
  id: string;
  name: string;
  inviteeCount: number;
  address: Address;
  attachments: unknown[];
  user: User;
}
