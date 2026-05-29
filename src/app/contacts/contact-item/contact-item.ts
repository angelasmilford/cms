import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  templateUrl: './contact-item.html',
  styles: ``,
})
export class ContactItem {
  @Input() contact: Contact;

  @Output() contactSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.contactSelected.emit();
  }
}
