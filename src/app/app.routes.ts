import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CattleListComponent } from './components/cattle-list/cattle-list.component';
import { CattleFormComponent } from './components/cattle-form/cattle-form.component';
import { CattleeditComponent } from './components/cattleedit/cattleedit.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'cattle', component: CattleListComponent },
      { path: 'cattle/edit/:id', component: CattleeditComponent },
      { path: 'cattle/add', component: CattleFormComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
