import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonToggle, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  toggle;
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.use('ca');
  }

  ngOnInit(): void {
    this.setModeToggle();
  }

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

  setModeToggle() {
    document.body.classList.toggle('dark', this.prefersDark.matches);
    this.toggle = document.querySelector('#themeToggle');
    this.toggle.addEventListener('ionChange', (e) => document.body.classList.toggle('dark', e.detail.checked));
    this.prefersDark.addEventListener('change', (e) => this.checkToggle(e.matches));
  }

  checkToggle(shouldCheck) {
    this.toggle.checked = shouldCheck;
  }

}
