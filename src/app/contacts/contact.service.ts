import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { MOCKCONTACTS } from '../contacts/MOCKCONTACTS';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    contactSelectedEvent = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();

    contacts: Contact[] = [];

    constructor() {
        this.contacts = MOCKCONTACTS;
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

    deleteContact(contact: Contact) {
        if(!contact) {
            return;
        }

        const pos = this.contacts.indexOf(contact);

        if(pos < 0) {
            return;
        }

        this.contacts.splice(pos, 1);
        this.contactChangedEvent.emit(this.contacts.slice());
    }
}