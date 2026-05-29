import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactList {

  @Output() contactWasSelected = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact(
      '1',
      'R. Kent Jackson',
      'Bro. Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      '../../assets/images/jacksonk.jpg',
      null,
    ),
    new Contact(
      '2',
      'Rex Barzee',
      'Bro. Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      '../../assets/images/barzeer.jpg',
      null,
    ),
  ];

  constructor() { }

  ngOnInit() {
  }

  onCreateContact() {
    
  }

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }
}
