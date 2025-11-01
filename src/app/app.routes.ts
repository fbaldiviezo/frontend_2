import { Routes } from '@angular/router';
import { Home } from './shared/components/statics/home/home';
import { Contacts } from './shared/components/statics/contacts/contacts';
import { UsersMainPage } from './features/users/pages-components/users-main-page/users-main-page';
import { RolesMainPage } from './features/roles/components/roles-main-page/roles-main-page';
import { MenusMainPage } from './features/menus/components/menus-main-page/menus-main-page';
import { MeproMainPage } from './features/asignments/mepro-asignment/components/mepro-main-page/mepro-main-page';
import { RolmeMainPage } from './features/asignments/rolme-asignment/components/rolme-main-page/rolme-main-page';
import { UsurolMainPage } from './features/asignments/usurol-asignment/components/usurol-main-page/usurol-main-page';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'contacts', component: Contacts },
    { path: 'users', component: UsersMainPage },
    { path: 'roles', component: RolesMainPage },
    { path: 'menus', component: MenusMainPage },
    { path: 'asignmepro', component: MeproMainPage },
    { path: 'asignrolme', component: RolmeMainPage },
    { path: 'asignusurol', component: UsurolMainPage },
];
