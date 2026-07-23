import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList implements OnDestroy {
  documents: Document[] = [];

  private subscription: Subscription;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.documents = this.documentService.getDocuments();

    this.subscription = this.documentService.documentChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )

      this.documentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
