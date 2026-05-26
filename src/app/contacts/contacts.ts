import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styles: ``,
})
export class Contacts {
  selectedContact!: Contact;
}
