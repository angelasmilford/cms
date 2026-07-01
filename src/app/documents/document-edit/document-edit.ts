import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEdit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor() { }
  
  onCancel() {

  }

  onSubmit(form: NgForm) {

  }
}
