import { Component } from '@angular/core';

import { Message } from '../message.model';

import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messages: Message[] = [];

  constructor(private messageService: MessageService,
              private contactService: ContactService
  ) { }

  ngOnInit() {
      this.messageService.messageChangedEvent
          .subscribe(
              (messages: Message[]) => {
                  this.messages = messages;
              }
          );

      this.contactService.getContacts();
      this.messageService.getMessages();
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
