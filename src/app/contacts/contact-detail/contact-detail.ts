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
    if(this.contact) {
      this.contactService.deleteContact(this.contact);
      
      this.router.navigate(['/contacts']);
    }
  }
}
