import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { MOCKCONTACTS } from '../contacts/MOCKCONTACTS';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    contactSelectedEvent = new EventEmitter<Contact>();

    contacts: Contact[] = [

    ];

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id: string): Contact {
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
}