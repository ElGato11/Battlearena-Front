import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
menuOpen = false;

toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
logout(){
  console.log("que va a hacer :V")
}
}
