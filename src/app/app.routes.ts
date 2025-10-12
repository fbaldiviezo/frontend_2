import { Routes } from '@angular/router';
import { Home } from './shared/components/statics/home/home';
import { Contacts } from './shared/components/statics/contacts/contacts';
import { UsersMainPage } from './features/users/pages-components/users-main-page/users-main-page';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'contacts', component: Contacts },
    { path: 'users', component: UsersMainPage },
];
