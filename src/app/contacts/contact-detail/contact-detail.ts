import { Component, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styles: ``,
})
export class ContactDetail {
  contact: Contact;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe( // will need to be cleaned up
        (params: Params) => {
          const id = params['id'];
          this.contact = this.contactService.getContact(id);
        }
      );
  }

  onEditContact() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    if (!this.contact) {
      return;
    }

    this.contactService.deleteContact(this.contact)?.subscribe(
      () => {
        const pos = this.contactService.contacts.findIndex(
          c => c.id === this.contact.id
        );

        if (pos >= 0) {
          this.contactService.contacts.splice(pos, 1);
          this.contactService.sortAndSend();
        }

        this.router.navigate(['/contacts']);
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
  }
}
