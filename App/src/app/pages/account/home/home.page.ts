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
    if(this.setQuestion('RACIOCÍNIO LÓGICO')){
      this.navCtrl.navigateForward('/raclogico');
    } 
   }

   searchHistoria(){
    if(this.setQuestion('HISTÓRIA')){
      this.navCtrl.navigateForward('/historia');
    } 
   }

   searchQuimica(){
     if(this.setQuestion('QUÍMICA')){
       this.navCtrl.navigateForward('/quimica');
     }
   }

   searchIngles(){
     if(this.setQuestion('INGLÊS')){
       this.navCtrl.navigateForward('/ingles');
     } 
   }

   searchMatematica(){
    if(this.setQuestion('MATEMÁTICA')){
      this.navCtrl.navigateForward('/matematica');
    }
   }

   searchFisica(){
    if(this.setQuestion('FÍSICA')){
      this.navCtrl.navigateForward('/fisica');
    }
   }

   searchGeografia(){
    if(this.setQuestion('GEOGRAFIA')){
      this.navCtrl.navigateForward('geografia');
    }
   }

   searchBiologia(){
     if(this.setQuestion('BIOLOGIA')){
       this.navCtrl.navigateForward('/biologia');
     }
   }

   searchPortugues(){
    if(this.setQuestion('PORTUGUÊS')){
      this.navCtrl.navigateForward('/portugues');
    }
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
