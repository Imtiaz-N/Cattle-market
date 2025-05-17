import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CattleListComponent } from './components/cattle-list/cattle-list.component';
import { CattleFormComponent } from './components/cattle-form/cattle-form.component';
import { CattleeditComponent } from './components/cattleedit/cattleedit.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'cattle',
    component: CattleListComponent,
  },
  {
    path: 'cattle/edit/:id',
    component: CattleeditComponent,
  },
  { path: 'cattle/add', component: CattleFormComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
