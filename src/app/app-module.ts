import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './header';
import { Contacts } from './contacts/contacts';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { ContactList } from './contacts/contact-list/contact-list';
import { ContactItem } from './contacts/contact-item/contact-item';
import { Documents } from './documents/documents';
import { DocumentList } from './documents/document-list/document-list';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { DoumentItem } from './documents/document-list/doument-item/doument-item';

@NgModule({
  declarations: [
    App,
    Contacts,
    ContactDetail,
    ContactList,
    ContactItem,
    Documents,
    DocumentList,
    DocumentDetail,
    DoumentItem,
  ],
  imports: [BrowserModule, Header],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
