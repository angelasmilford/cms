import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindowRefService } from '../../window-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail {
  document: Document | null = null;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private windowRefService: WindowRefService
  ) { 
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params
      .subscribe( // will need to be cleaned up
        (params: Params) => {
          // this.id = +params['id'];
          const id = params['id'];
          this.document = this.documentService.getDocument(id);
        }
      );
  }

  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onView() {
    if(this.document && this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    if (!this.document) {
      return;
    }

    this.documentService.deleteDocument(this.document)?.subscribe(
      () => {
        const pos = this.documentService.documents.findIndex(
          d => d.id === this.document!.id
        );

        if (pos >= 0) {
          this.documentService.documents.splice(pos, 1);
          this.documentService.sortAndSend();
        }

        this.router.navigate(['/documents']);
      },
      error => {
        console.error(error);
      }
    );
  }
}
