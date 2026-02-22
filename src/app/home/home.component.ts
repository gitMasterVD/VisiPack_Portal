import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,      // ✅ for *ngIf, ngClass
    ChatbotComponent   // ✅ for <app-chatbot>
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isCollapsed = false;
  isDarkMode = false;
  isMobileOpen = false;
  activeModule = 'dashboard';
  isProfileOpen = false;
  isChatOpen = false;
userMessage = '';
chatMessages: { type: 'user' | 'bot', text: string }[] = [];


  constructor(private router: Router,  private eRef: ElementRef) {
    const savedTheme = localStorage.getItem('vp-theme');
    this.isDarkMode = savedTheme === 'dark';
    if (this.isDarkMode) document.body.classList.add('dark-mode');
  }
  

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobile() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('vp-theme', this.isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
 toggleProfileMenu() {
  this.isProfileOpen = !this.isProfileOpen;
  const wrapper = document.querySelector('.vp-profile-wrapper');
  if (wrapper) wrapper.classList.toggle('show', this.isProfileOpen);
}

navigate(target: string) {
  const routes: Record<string, string> = {
    'dispatch': '/dispatch-login',
    'warehouse': '/warehouse-login',
    'rfid': '/rfid-login',
    'mes': '/mes-login',
    'erp': '/erp-login'
  };

  if (routes[target]) {
    // Internal route
    this.activeModule = target;
    this.isMobileOpen = false;
    this.router.navigate([routes[target]]);
  } else if (target.startsWith('http://') || target.startsWith('https://')) {
    // External URL
    window.open(target, '_blank');
  } else {
    console.warn('Unknown navigation target:', target);
  }
}

// Toggle chatbot open/close
toggleChat() {
  this.isChatOpen = !this.isChatOpen;

  if (this.isChatOpen) {
    // Clear previous messages and input
    this.chatMessages = [];
    this.userMessage = '';
  }
}

// Send message
sendMessage() {
  if (!this.userMessage.trim()) return;

  // Add user message
  this.chatMessages.push({ type: 'user', text: this.userMessage });

  // Dummy bot response (replace with API call if needed)
  setTimeout(() => {
    this.chatMessages.push({ type: 'bot', text: `You said: "${this.userMessage}"` });
  }, 500);

  this.userMessage = '';
}


logout(event: Event) {
  event.stopPropagation();

  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');

  this.isProfileOpen = false;

  this.router.navigate(['/home-login']);
}
@HostListener('document:click', ['$event'])
clickOutside(event: MouseEvent) {
  const clickedElement = event.target as HTMLElement;

  if (!clickedElement.closest('.vp-profile-wrapper')) {
    this.isProfileOpen = false;
  }
}

}
