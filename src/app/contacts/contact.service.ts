import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    contactSelectedEvent = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();
    contactListChangedEvent = new Subject<Contact[]>();
    maxContactId: number;

    contacts: Contact[] = [];

    private contactsUrl = 'http://localhost:3000/contacts';

    constructor(private http: HttpClient) { }

    getContacts(): void {
        this.http.get<Contact[]>(this.contactsUrl)
            .subscribe(
                (contacts: Contact[]) => {
                    this.contacts = contacts;
                    this.maxContactId = this.getMaxId();
                    this.sortAndSend();
                },
                error => {
                    console.error(error);
                }
            );
    }

    getContact(id: string) {
        for(let contact of this.contacts) {
            if(contact._id === id || contact.id === id) {
                return contact;
            }
        }

        return null;
    }

    getMaxId(): number {
        let maxId = 0;

        for(let contact of this.contacts) {
            let currentId = parseInt(contact.id);

            if(currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    deleteContact(contact: Contact) {
        if(!contact) {
            return;
        }

        const pos = this.contacts.findIndex(c => c.id === contact.id);

        if(pos < 0) {
            return;
        }
        
        this.http.delete(this.contactsUrl + '/' + contact.id)
        .subscribe(() => {
            (response: Response) => {
                this.contacts.splice(pos, 1);
                this.sortAndSend();
            }
        });
    }

    addContact(newContact: Contact) {
        if(!newContact) {
            return;
        }

        newContact.id = '';

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.post<{ message: String, contact: Contact }>(
            this.contactsUrl,
            newContact,
            { headers: headers }
        )
        .subscribe(
            (responseData) => {
                this.contacts.push(responseData.contact);
                this.sortAndSend();
            }
        );
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if(!originalContact || !newContact) {
            return;
        }

        const pos = this.contacts.findIndex(c => c.id === originalContact.id);

        if(pos < 0) {
            return;
        }

        newContact.id = originalContact.id; 
        newContact._id = originalContact._id; 

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.put(
            this.contactsUrl + '/' + originalContact.id,
            newContact, 
            { headers: headers }
        )
        .subscribe(
            () => {
                this.contacts[pos] = newContact;
                this.sortAndSend();
            }
        );
    }

    sortAndSend() {
        this.contacts.sort((a, b) => {
            if(a.name < b.name) {
                return -1;
            }

            if(a.name > b.name) {
                return 1;
            }

            return 0;
        });

        this.contactChangedEvent.next(this.contacts.slice());
    }
}