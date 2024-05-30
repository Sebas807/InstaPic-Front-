import { Component } from '@angular/core';
import { PublicacionesService } from '../galeria/services/publicaciones.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  user$ = this.authService.user$;
  cantidadActual: number = 0;
  pendingFollowers$ = this.authService.pendingFollowers$;
  approvedFollowers$ = this.authService.approvedFollowers$;
  userFirstPhoto$ = this.authService.userFirstPhoto$;
  userPostCount$ = this.authService.userPostCount$;

  constructor(
    private publicacionesService: PublicacionesService,
    private authService: AuthService) {}

  ngOnInit() {
    this.publicacionesService.cantidad$.subscribe(cantidad => {
      this.cantidadActual = cantidad;
    });
  }
}
