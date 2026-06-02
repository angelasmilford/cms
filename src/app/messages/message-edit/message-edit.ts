import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styles: ``,
})
export class MessageEdit {
  currentSender: string = 'Angela';

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') messageInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    // Get the value stored in the subject input element
    const subject = this.subjectInputRef.nativeElement.value;
    // Get the value stored in the msgText input element
    const msgText = this.messageInputRef.nativeElement.value;
    // Create a new Message object
    const newMessage = new Message('1', subject, msgText, this.currentSender);
    // Assign a hardcoded number to the id property of the new Message object
    newMessage.id = '1';
    // Assign the value of the currentSender class variable to the sender property of the new Message object
    newMessage.sender = this.currentSender;
    // Assign the values retrieved from the subject and msgText input elements to the corresponding properties of the new Message object
    newMessage.subject = subject;
    newMessage.msgText = msgText;
    // Call the addMessageEvent emitter’s emit() method and pass it the new Message object just created.
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    const subject = this.subjectInputRef.nativeElement.value = '';
    const msgText = this.messageInputRef.nativeElement.value = '';
  }
}
