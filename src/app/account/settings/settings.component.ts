import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    public account: AccountService,
    private notification: NotificationService,
    private router: Router,
    private _fileService: FileService
  ) { }

  ngOnInit() {
    if (!this.account.information.loggedIn) {
      this.account.information.login_redirect = 'account/settings'
      this.router.navigateByUrl('/login')
      this.notification.add('Not authorized', 'You must be logged in to view this page!')
    }
  }

  serverFiles () {
    this._fileService.returnServerFiles();
  }

}
