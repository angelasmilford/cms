import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';

import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem {
  @Input() message: Message;

  messageSender: string

  @Output() messageSelected = new EventEmitter<void>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact = this.contactService.getContact(this.message.sender);

    if(contact) {
      this.messageSender = contact.name;
    } else {
      this.messageSender = "Unknown Sender";
    }
  }

  onSelected() {
    this.messageSelected.emit();
  }
}
