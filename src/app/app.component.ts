import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
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
    console.log('CONSOLETEST segon intent');
    this.setModeToggle();
    this.setNotifications();
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

  setNotifications() {

    console.log('CONSOLETEST Setting notifications');

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('CONSOLETEST', 'Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('CONSOLETEST', 'Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('CONSOLETEST', 'Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('CONSOLETEST', 'Push action performed: ' + JSON.stringify(notification));
      }
    );

  }


}
