import { Component } from '@angular/core';

import { Document } from './document.model';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.html',
  styles: ``,
})
export class Documents {
  selectedDocument: Document;

  constructor() { }

  ngOnInit() {
  }
}
