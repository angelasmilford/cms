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

    private documentsUrl = 'http://localhost:3000/documents';

    constructor(private http: HttpClient) { }

    getDocuments(): void {
        this.http.get<Document[]>(this.documentsUrl)
            .subscribe(
                (documents: Document[]) => {
                    this.documents = documents;
                    this.maxDocumentId = this.getMaxId();
                    this.sortAndSend();
                },
                (error: any) => {
                    console.error("GET documents failed:", error);
                }
            );
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

        const pos = this.documents.findIndex(d => d.id === document.id);

        if(pos < 0) {
            return;
        }

        // delete from database
        this.http.delete(this.documentsUrl + '/' + document.id)
        .subscribe(() => {
            (response: Response) => {
                this.documents.splice(pos, 1);
                this.sortAndSend();
            }
        });
    }

    addDocument(newDocument: Document) {
        if(!newDocument) {
            return;
        }

        // make sure id of the new Document is empty
        newDocument.id = '';

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        // add to database
        this.http.post<{ message: string, document: Document }>(
            this.documentsUrl,
            newDocument,
            { headers: headers }
        )
        .subscribe(
            (responseData) => {
                // add new document to documents
                this.documents.push(responseData.document);
                this.sortAndSend();
            }
        );
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if(!originalDocument || !newDocument) {
            return;
        }

        const pos = this.documents.findIndex(d => d.id === originalDocument.id);

        if(pos < 0) {
            return;
        }

        // set the id of the new Document to the id of the old Document
        newDocument.id = originalDocument.id;
        newDocument._id = originalDocument._id;

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        // update database
        this.http.put(
            this.documentsUrl + '/' + originalDocument.id,
            newDocument, 
            { headers: headers }
        )
            .subscribe(
                (response: Response) => {
                    this.documents[pos] = newDocument;
                    this.sortAndSend();
                }
            );
    }

    sortAndSend() {
        this.documents.sort((a, b) => {
            if(a.name < b.name) {
                return -1;
            }

            if(a.name > b.name) {
                return 1;
            }

            return 0;
        });

        this.documentListChangedEvent.next(this.documents.slice());
    }
}