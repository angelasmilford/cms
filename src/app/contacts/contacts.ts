import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from '../contacts/contact.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styles: ``,
  providers: [ContactService]
})
export class Contacts {
  selectedContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => {
          this.selectedContact = contact;
        }
      )
  }
}
