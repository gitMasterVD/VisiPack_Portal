import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-login',
  standalone: false,
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
