import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Message } from '../message.model';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styles: ``,
})
export class MessageEdit {
  currentSender: string = '6a61881efc2d4fe857810b70';

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') messageInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.messageInputRef.nativeElement.value;

    const newMessage = new Message(
      '', 
      subject, 
      msgText, 
      this.currentSender
    );
    
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    const subject = this.subjectInputRef.nativeElement.value = '';
    const msgText = this.messageInputRef.nativeElement.value = '';
  }
}
