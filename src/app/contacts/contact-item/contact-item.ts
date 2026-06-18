import { Component, Input } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  templateUrl: './contact-item.html',
  styles: ``,
})
export class ContactItem {
  @Input() contact: Contact;

  constructor() { }

  ngOnInit() {
  }
}
