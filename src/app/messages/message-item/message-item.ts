import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem {
  sender = 'SendersName';
  messageText = 'MessageText';

  @Input() message: Message;

  @Output() messageSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.messageSelected.emit();
  }
}
