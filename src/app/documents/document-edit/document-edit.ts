import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEdit {
  originalDocument: Document | null = null;
  document: Document | null = null;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];

          if(id == null) {
            this.editMode = false;
            return;
          }

          this.originalDocument = this.documentService.getDocument(id);

          if(this.originalDocument == null) {
            return;
          }

          this.editMode = true;

          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }
  
  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newDocument = new Document(
      '',
      value.name,
      value.description,
      value.url,
    );

    if(this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }
}
