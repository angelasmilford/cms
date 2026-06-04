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
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.messageInputRef.nativeElement.value;

    const newMessage = new Message(
      '1', 
      subject, 
      msgText, 
      this.currentSender
    );
    
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    const subject = this.subjectInputRef.nativeElement.value = '';
    const msgText = this.messageInputRef.nativeElement.value = '';
  }
}
