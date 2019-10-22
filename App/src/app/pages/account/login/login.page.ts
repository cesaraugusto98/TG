import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { UserModel } from 'src/app/models/user.model';
import { SecurityUtil } from 'src/utils/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public hide = true;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCrtl: LoadingController,
    private toastCrtl: ToastController,
    private navCrtl: NavController,
    private service: DataService,
  ) {
    this.form = this.fb.group({
      _id: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.required
      ])]
    });
  }

  ngOnInit() {

  }

  async submit() {
    if (this.form.invalid)
      return;

    const loading = await this.loadingCrtl.create({ message: 'Autenticando...' });
    loading.present();

    this
      .service
      .getAuthenticated(this.form.value)
      .subscribe(
        (res: UserModel) => {
          console.log(res)
          console.log(res._id)
          console.log(res.password)
          if (res._id!=undefined) {
            this.showSucess(`Seja bem vindo ${res.nickname}!`)
            SecurityUtil.set(res);
            loading.dismiss();
            this.navCrtl.navigateRoot('/');
          }else{
            this.showError('Usuário ou senha inválidos');
            loading.dismiss();
          }
        },
        (err) => {
          this.showError('Usuário ou senha inválidos');
          loading.dismiss();
        });
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  async showError(message) {
    const error = await this.toastCrtl.create({ message: message, showCloseButton: true, closeButtonText: 'Fechar', duration: 3000 });
    error.present();
  }

  async showSucess(message) {
    const success = await this.toastCrtl.create({ message: message, showCloseButton: true, closeButtonText: 'Fechar', duration: 3000 });
    success.present();
  }

}