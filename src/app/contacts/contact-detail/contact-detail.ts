import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styles: ``,
})
export class ContactDetail {
  @Input() contact!: Contact;

  constructor() { }

  ngOnInit() {
  }
}
