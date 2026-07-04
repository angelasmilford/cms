import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    messageChangedEvent = new EventEmitter<Message[]>();

    messages: Message[] = [];

    maxMessageId: number;

    private messagesUrl = 'https://asmcms-default-rtdb.firebaseio.com/messages';

    constructor(private http: HttpClient) { }

    getMessages() {
        // return this.messages.slice();
        this.http.get<Message[]>(this.messagesUrl)
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages || [];
                    this.maxMessageId = this.getMaxId();

                    this.messages.sort((a, b) => {
                        if(a.subject < b.subject) return -1;
                        if(a.subject > b.subject) return 1;
                        return 0;
                    });

                    this.messageChangedEvent.emit(this.messages.slice());
                },
                (error: any) => {
                    console.error(error);
                }
            )
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
        this.storeMessages();
    }

    getMaxId(): number {
        let maxId = 0;

        for(let message of this.messages) {
            let currentId = parseInt(message.id);

            if(currentId > maxId) {
                maxId= currentId;
            }
        }

        return maxId;
    }

    storeMessages() {
        const messages = JSON.stringify(this.messages);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.put(
            this.messagesUrl,
            messages,
            { headers: headers }
        )
        .subscribe(() => {
            this.messageChangedEvent.emit(this.messages.slice());
        }, (error) => {
            console.error(error);
        });
    }
}