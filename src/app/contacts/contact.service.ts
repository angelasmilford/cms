import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { MOCKCONTACTS } from '../contacts/MOCKCONTACTS';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    contactSelectedEvent = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();
    contactListChangedEvent = new Subject<Contact[]>();
    maxContactId: number;

    contacts: Contact[] = [];

    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id: string) {
        // FOR each contact in the contacts list
        for(let contact of this.contacts) {
            // IF contact.id equals the id THEN
            if(contact.id === id) {
            // RETURN contact
                return contact;
            // ENDIF
            }
        // ENDFOR
        }

        // RETURN null
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

        const pos = this.contacts.indexOf(contact);

        if(pos < 0) {
            return;
        }

        this.contacts.splice(pos, 1);
        
        const contactsListClone = this.contacts.slice();

        this.contactListChangedEvent.next(contactsListClone);
    }

    addDocument(newContact: Contact) {
        if(!newContact) {
            return;
        }

        this.maxContactId++;

        newContact.id = this.maxContactId.toString();

        this.contacts.push(newContact);

        const contactsListClone = this.contacts.slice();

        this.contactListChangedEvent.next(contactsListClone);
    }

    updateDocument(originalContact: Contact, newContact: Contact) {
        if(!originalContact || !newContact) {
            return;
        }

        const pos = this.contacts.indexOf(originalContact);

        if(pos < 0) {
            return;
        }

        newContact.id = originalContact.id; 

        this.contacts[pos] = newContact;

        const contactsListClone = this.contacts.slice();

        this.contactListChangedEvent.next(contactsListClone);
    }
}