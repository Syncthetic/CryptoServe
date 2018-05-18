import { Component } from '@angular/core';
import { AccountService } from './account/account.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CryptoServ';

  constructor(
    public account: AccountService,
    public notification: NotificationService
  ) { }
}