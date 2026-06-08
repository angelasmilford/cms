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
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

  onSelected() {
    this.messageSelected.emit();
  }
}
