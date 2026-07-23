import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    messageChangedEvent = new EventEmitter<Message[]>();
    maxMessageId: number;

    messages: Message[] = [];

    private messagesUrl = 'http://localhost:3000/messages';

    constructor(private http: HttpClient) { }

    getMessages(): void {
        this.http.get<Message[]>(this.messagesUrl)
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                    this.maxMessageId = this.getMaxId();
                    this.sortAndSend();
                },
                (error: any) => {
                    console.error("GET messages failed:", error);
                }
            );
    }

    getMessage(id:string) {
        for(let message of this.messages) {
            if(message.id === id) {
                return message;
            }
        }

        return null;
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

    // deleteMessage(message: Message) {
    //     if(!message) {
    //         return;
    //     }

    //     const pos = this.messages.findIndex(m => m.id === message.id);

    //     if(pos < 0) {
    //         return;
    //     }

    //     this.http.delete(this.messagesUrl + '/' + message.id)
    //     .subscribe(
    //         (response: Response) => {
    //             this.messages.splice(pos, 1);
    //             this.sortAndSend();
    //         }
    //     });
    // }

    addMessage(newMessage: Message) {
        if (!newMessage) {
            return;
        }

        newMessage.id = '';

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.post<{ message: string; messageObject: Message }>(
            this.messagesUrl,
            newMessage,
            { headers: headers }
        )
        .subscribe(
            (responseData) => {
                this.messages.push(responseData.messageObject);
                this.sortAndSend();
            }
        );
    }

    updateMessage(originalMessage: Message, newMessage: Message) {
        if(!originalMessage || !newMessage) {
            return;
        }

        const pos = this.messages.findIndex(d => d.id === originalMessage.id);

        if(pos < 0) {
            return;
        }

        newMessage.id = originalMessage.id;
        newMessage._id = originalMessage._id;

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.put(
            this.messagesUrl + '/' + originalMessage.id,
            newMessage, 
            { headers: headers }
        )
            .subscribe(
                (response: Response) => {
                    this.messages[pos] = newMessage;
                    this.sortAndSend();
                }
            );
    }

    sortAndSend() {
        this.messages.sort((a, b) => {
            if(a.subject < b.subject) {
                return -1;
            }

            if(a.subject > b.subject) {
                return 1;
            }

            return 0;
        });

        this.messageChangedEvent.next(this.messages.slice());
    }
}