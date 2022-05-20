import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private router: Router
  ) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  closeSession() {
    this.authService.logout().then(() => {
      this.menu.close('first');
      this.router.navigate(['/login', {replaceUrl: true}]);
    });
  }

}
