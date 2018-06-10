// @angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
// Import Services
import { ApiService } from './services/api.service';
import { FileService } from './services/file.service';
import { AccountService } from './account/account.service';
import { AesService } from './services/aes.service';
import { NotificationService } from './services/notification.service';
// Other Imports
import { NgxElectronModule } from 'ngx-electron';
// Import Components
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { SettingsComponent } from './account/settings/settings.component';
import { LandingComponent } from './landing/landing.component';
import { ApiComponent } from './api/api.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EncryptComponent } from './files/encrypt/encrypt.component';
import { DecryptComponent } from './files/decrypt/decrypt.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes: Routes = [
   {
     path: '',
     redirectTo: 'landing',
     pathMatch: 'full'
   },
  { path: 'landing', component: LandingComponent },
  { path: 'api', component: ApiComponent },
  { path: 'home', component: AppComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account/settings', component: SettingsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'files/encrypt', component: EncryptComponent },
  { path: 'files/decrypt', component: DecryptComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    LandingComponent,
    ApiComponent,
    NotificationsComponent,
    EncryptComponent,
    DecryptComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      {
        onSameUrlNavigation: "reload",
       // enableTracing: true
      }
    ),
    MDBBootstrapModule.forRoot()
   ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ApiService, FileService, AccountService, AesService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }