import { Contact } from './contact.model';
import { Property } from './property.model';

export interface Appointment {
  id: string;
  // preferably we'd only have this as string in a DTO file and type Date in a local model
  date: string;
  maxInviteeCount: number;
  attendeeCount: number;
  showContactInformation: boolean;
  contact: Contact;
  property: Property;
}
