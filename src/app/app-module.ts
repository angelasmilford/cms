import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './header';
import { Contacts } from './contacts/contacts';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { ContactList } from './contacts/contact-list/contact-list';
import { ContactItem } from './contacts/contact-item/contact-item';

@NgModule({
  declarations: [App, Contacts, ContactDetail, ContactList, ContactItem],
  imports: [BrowserModule, Header],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
