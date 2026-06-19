import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactList {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService,
              private router: Router, 
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
