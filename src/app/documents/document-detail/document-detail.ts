import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail {
  document: Document | null = null;

  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

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
}
