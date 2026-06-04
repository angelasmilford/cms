import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  standalone: false,
  templateUrl: './document-item.html',
  styleUrl: './document-item.css',
})
export class DocumentItem {
  @Input() document: Document;

  @Output() documentSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.documentSelected.emit();
  }
}
