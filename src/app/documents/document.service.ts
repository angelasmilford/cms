import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Document } from "./document.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();
    documentListChangedEvent = new Subject<Document[]>();
    maxDocumentId: number;

    documents: Document[] = [];

    private documentsUrl = 'https://asmcms-default-rtdb.firebaseio.com/documents.json';

    constructor(private http: HttpClient) { }

    getDocuments(): void {
        this.http.get<Document[]>(this.documentsUrl)
            .subscribe(
                // Success method
                (documents: Document[]) => {
                    this.documents = documents || [];
                    this.maxDocumentId = this.getMaxId();

                    this.documents.sort((a, b) => {
                        if(a.name < b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    });

                    this.documentListChangedEvent.next(this.documents.slice());
                },
                // Error method
                (error: any) => {
                    console.error(error);
                }
            )
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
        
        this.storeDocuments();
    }

    addDocument(newDocument: Document) {
        if(!newDocument) {
            return;
        }

        this.maxDocumentId++;

        newDocument.id = this.maxDocumentId.toString();

        this.documents.push(newDocument);

        this.storeDocuments();
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

        this.storeDocuments();
    }

    storeDocuments() {
        const documents = JSON.stringify(this.documents);
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.put(
            this.documentsUrl,
            documents,
            { headers: headers}
        )
        .subscribe(() => {
            this.documentListChangedEvent.next(this.documents.slice());
        }, (error) => {
            console.error(error);
        });
    }
}