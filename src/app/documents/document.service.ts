import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable({
    providedIn: 'root'
})

export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();
    documentListChangedEvent = new Subject<Document[]>();
    maxDocumentId: number;

    documents: Document[] = [];

    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: string) {
        for(let document of this.documents) {
            if(document.id === id) {
                return document;
            }
        }

        return null;
    }

    getMaxId(): number {
        let maxId = 0;

        for(let document of this.documents) {
            let currentId = parseInt(document.id);

            if(currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    deleteDocument(document: Document) {
        if(!document) {
            return;
        }

        const pos = this.documents.indexOf(document);

        if(pos < 0) {
            return;
        }

        this.documents.splice(pos, 1);
        
        const documentsListClone = this.documents.slice();

        this.documentListChangedEvent.next(documentsListClone);
    }

    addDocument(newDocument: Document) {
        if(!newDocument) {
            return;
        }

        this.maxDocumentId++;

        newDocument.id = this.maxDocumentId.toString();

        this.documents.push(newDocument);

        const documentsListClone = this.documents.slice();

        this.documentListChangedEvent.next(documentsListClone);
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if(!originalDocument || !newDocument) {
            return;
        }

        const pos = this.documents.indexOf(originalDocument);

        if(pos < 0) {
            return;
        }

        newDocument.id = originalDocument.id; 

        this.documents[pos] = newDocument;

        const documentsListClone = this.documents.slice();

        this.documentListChangedEvent.next(documentsListClone);
    }
}