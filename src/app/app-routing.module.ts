import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeLoginComponent } from './home-login/home-login.component';

const routes: Routes = [
   { path: 'home-login', component: HomeLoginComponent },
    { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home-login', pathMatch: 'full' },
  { path: '**', redirectTo: '/home-login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
