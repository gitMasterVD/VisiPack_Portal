import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeLoginComponent } from './home-login/home-login.component';

export const routes: Routes = [
  { path: 'home-login', component: HomeLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home-login', pathMatch: 'full' },
  { path: '**', redirectTo: 'home-login' }
];