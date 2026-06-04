import { Component } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messages: Message[] = [
    new Message('1', 'Subject 1', 'This is a test message.', 'Name'),
    new Message('2', 'Subject 2', 'This is another test message.', 'Name'),
    new Message('3', 'Subject 3', 'This is yet another test message.', 'Name'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
