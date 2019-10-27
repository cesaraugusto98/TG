import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { SecurityUtil } from 'src/utils/security.util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user$:  UserModel;
  public nickname: String;
  
  constructor(
    private navCtrl: NavController,
  ) {}  

  ngOnInit() {
    this.user$ = SecurityUtil.get();
    console.log(this.user$);
    this.nickname = this.user$.nickname;
    console.log(this.nickname);
  }

  logout(){
    SecurityUtil.clear();
    this.navCtrl.navigateRoot('/login');
  }

}
