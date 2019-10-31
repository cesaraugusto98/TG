import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { SecurityUtil } from 'src/utils/security.util';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { QuestionModel } from 'src/app/models/question.model';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user$:  UserModel;
  public nickname: string;
  public theme: string;

  constructor(
    private navCtrl: NavController,
    private service: DataService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {}  

  ngOnInit() {
    this.user$ = SecurityUtil.get();
    if(this.user$==null){
      this.navCtrl.navigateRoot('/login');
    }else{
      this.nickname = this.user$.nickname;
    } 
  }

  logout(){
    SecurityUtil.clear();
    this.navCtrl.navigateRoot('/login');
  }

  searchMultidisciplinar(){
    if(this.setQuestion('MULTIDISCIPLINAR')){
      this.navCtrl.navigateForward('/multidisciplinar');
    }    
  }

  searchRacLogico(){
    this.setQuestion('RACIOCÍNIO LÓGICO'); 
   }

   searchHistoria(){
    this.setQuestion('HISTÓRIA'); 
   }

   searchQuimica(){
    this.setQuestion('QUÍMICA'); 
   }

   searchIngles(){
    this.setQuestion('INGLÊS'); 
   }

   searchMatematica(){
    this.setQuestion('MATEMÁTICA'); 
   }

   searchFisica(){
    this.setQuestion('FÍSICA'); 
   }

   searchGeografia(){
    this.setQuestion('GEOGRAFIA'); 
   }

   searchBiologia(){
    this.setQuestion('BIOLOGIA'); 
   }

   searchPortugues(){
    this.setQuestion('PORTUGUÊS');
   }

   async setQuestion(theme: string){

    const loading = await this.loadingCtrl.create({ message: 'Sorteando aleatoriamente sua questão aleatória...' });
    loading.present();
    
    SecurityUtil.clearQuestion();

     this
      .service
      .getRandomTheme(theme)
      .subscribe(
        (res: QuestionModel) => {
          if (res.texto!=undefined) {
            SecurityUtil.setQuestion(res);
            loading.dismiss();
            return true;
          }else{
            this.showError('Alguma coisa falhou, estranho...melhor falar com o Administrador');
            loading.dismiss();
            return false;
          }
        },
        (err) => {
          this.showError('Alguma coisa falhou, estranho...melhor falar com o Administrador');
          loading.dismiss();
          return false;
        });
   }

   async showError(message) {
    const error = await this.toastCtrl.create({ message: message, showCloseButton: true, closeButtonText: 'Fechar', duration: 3000 });
    error.present();
  }
}
