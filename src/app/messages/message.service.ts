import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    messageChangedEvent = new EventEmitter<Message[]>();

    messages: Message[] = [];

    constructor() {
        this.messages = MOCKMESSAGES;
    }

    getMessages() {
        return this.messages.slice();
    }

    getMessage(id:string) {
        for(let message of this.messages) {
            if(message.id === id) {
                return message;
            }
        }

        return null;
    }

    addMessage(messages: Message[]) {
        // messages.push(message)
        this.messages.push(...messages);

        // emit(messages)
        this.messageChangedEvent.emit(this.messages.slice());
    }
}