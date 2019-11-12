import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/service/data.service';
import { UserModel } from 'src/app/models/user.model';
import { CustomValidator } from 'src/utils/custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public hide = true;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCrtl: LoadingController,
    private toastCtrl: ToastController,
    private navCrtl: NavController,
    private service: DataService,
  ) { this.form = this.fb.group({
    _id: ['', Validators.compose([
      Validators.required,
    ])],
    name: ['', Validators.compose([Validators.required])],
    nickname: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, CustomValidator.EmailValidator])],
    password: ['', Validators.compose([
      Validators.minLength(4),
      Validators.maxLength(12),
      //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
      Validators.required,
    ])]
  });}

  ngOnInit() {
  }

  async submit() {
    if (this.form.invalid)
      return;

    
    const loading = await this.loadingCrtl.create({ message: 'Criando sua conta...' });
    loading.present();

    this
      .service
      .postUser(this.form.value)
      .subscribe(
        (res: UserModel) => {
          if (res._id!=undefined) {
            this.showDialog(`Seja bem vindo ${res.nickname}!`, 'success')
            loading.dismiss();
            this.navCrtl.navigateRoot('/login');
          }else{
            this.showDialog('Não foi possivel criar a sua conta, verifique sua conexão com a internet!', 'danger');
            loading.dismiss();
          }
        },
        (err) => {
          this.showDialog('Não foi possivel criar a sua conta, verifique sua conexão com a internet!', 'danger');
          loading.dismiss();
        });
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  async showDialog(message, color) {
    const error = await this.toastCtrl.create({ message: message, showCloseButton: true, closeButtonText: 'Fechar', duration: 3000, color:color});
    error.present();
  }

  voltar(){
    this.navCrtl.navigateRoot('/login');
  }

}
