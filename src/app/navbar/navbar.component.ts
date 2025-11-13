import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../utils/service/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
menuOpen = false;

constructor(
public userService: UserService  
){}

toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
logout(){
  this.userService.logout();

}
}
