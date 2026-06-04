import { Component, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'Document 1',
      'Description 1',
      'https://example.com/',
    ),
    new Document(
      '2',
      'Document 2',
      'Description 2',
      'https://example.com/',
    ),
    new Document(
      '3',
      'Document 3',
      'Description 3',
      'https://example.com/',
    ),
    new Document(
      '4',
      'Document 4',
      'Description 4',
      'https://example.com/',
    ),
    new Document(
      '5',
      'Document 5',
      'Description 5',
      'https://example.com/',
    ),
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
