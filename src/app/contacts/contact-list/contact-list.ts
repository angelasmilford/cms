import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactList implements OnDestroy {
  contacts: Contact[] = [];
  term: string = '';

  private subscription: Subscription;

  constructor(private contactService: ContactService,
              private router: Router, 
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    
    this.subscription = this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  search(value: string) {
    this.term = value;
  }
}
