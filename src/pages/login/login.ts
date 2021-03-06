import { Component } from '@angular/core';

import { NavController, AlertController, LoadingController, Loading} from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { TermsPage } from '../terms/terms';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  templateUrl: 'login.html'
})

export class LoginPage {
  loading: Loading;
  registerCredentials = {phone: '', password: ''};
 
  constructor(public storage: Storage, private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
 
  public createAccount() {
    this.nav.push(RegisterPage);
  }
 
  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
        this.storage.set('user',true);
        this.loading.dismiss();
        this.nav.setRoot(TermsPage)
        });
      } else {
        this.showError("Invalid phone number or passsword");
      }
    },
    error => {
      this.showError(error);
    });
  }
    
  forgotPassword() {
      this.nav.push(ForgotPasswordPage);
  }
    
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}