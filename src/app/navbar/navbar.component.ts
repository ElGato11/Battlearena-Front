import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../utils/service/user.service';
import { Router, RouterModule } from '@angular/router';
import { SalasService } from '../utils/service/salas.service';

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
public userService: UserService,
public salasService: SalasService,
public router: Router  
){}

toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
logout(){
  this.userService.logout();

}
entrarArena() {
  const sala = this.salasService.getSalaActual();
  if(sala){
    this.salasService.existe(sala).subscribe(b => {
      console.log(b);
      if(b)this.router.navigate([`/sala/${sala}`]);
      
    })
  }else this.router.navigate(['/lista-salas']);
}
}
