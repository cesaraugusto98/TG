import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';

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
    private service: DataService  ,
  ) { 
    this.form = this.fb.group({
      username: ['', Validators.compose([
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

  toggleHide(){
    this.hide = !this.hide;
  }

}
