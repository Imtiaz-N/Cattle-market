import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CattleListComponent } from './components/cattle-list/cattle-list.component';

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
    path: '**',
    redirectTo: '',
  },
];
