import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { Documents } from './documents/documents';
import { MessageList } from './messages/message-list/message-list';
import { Contacts } from './contacts/contacts';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { ContactEdit } from './contacts/contact-edit/contact-edit';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { Login } from './users/login/login';
import { Register } from './users/register/register';
import { UserList } from './users/user-list/user-list';
import { UserEdit } from './users/user-edit/user-edit';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'documents', component: Documents, 
        children: [
            { path: 'new', component: DocumentEdit },
            { path: ':id', component: DocumentDetail },
            { path: ':id/edit', component: DocumentEdit }
        ] 
    },
    
    { path: 'messages', component: MessageList },
    
    { path: 'contacts', component: Contacts, 
        children: [
            { path: 'new', component: ContactEdit },
            { path: ':id', component: ContactDetail },
            { path: ':id/edit', component: ContactEdit }
        ]
    },

    { path: 'login', component: Login },

    { path: 'register', component: Register },
    
    { path: 'users', component: UserList },
    
    { path: 'users/:id/edit', component: UserEdit },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}