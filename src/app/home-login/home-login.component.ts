import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home-login',
  standalone: true,
  imports: [
      CommonModule,      // ✅ for *ngIf, ngClass
      FormsModule   // ✅ for <app-chatbot>
    ],
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.css'
})
export class HomeLoginComponent {
 constructor(private router: Router) {}

 isLoading = false;
login() {
  this.isLoading = true;

  setTimeout(() => {
    document.body.classList.add('page-transition');

    setTimeout(() => {
      this.router.navigate(['/home']).then(() => {
        document.body.classList.remove('page-transition');
      });
    }, 300);

  }, 1000);
}

}
