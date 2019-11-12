import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { SecurityUtil } from 'src/utils/security.util';
import { NavController, ToastController, } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public question: QuestionModel;  public prova: String; public numero: Number;
  public texto: String;
  public a: String;  public b: String;  public c: String;  public d: String;  public e: String;  public repostaGabarito: String;
  public links: String[]; 
  public respostaDada;
  public hide: boolean;
  
  
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private emailComposer: EmailComposer,
  ) { }

  ngOnInit() {
    this.hide = false;
    this.question = SecurityUtil.getQuestion();
    if(this.question==undefined){
      this.navCtrl.navigateBack('\home');
    }
    else{
      this.prova=this.question.prova;  
      this.numero=this.question.numero;
      this.texto=this.question.texto;
      this.a=this.question.a;
      this.b=this.question.b;
      this.c=this.question.c;
      this.d=this.question.d;
      this.e=this.question.e;
      this.links=this.question.links;
      this.repostaGabarito = this.question.resposta;
    }
  }

  validateQuestion(){
    if(this.respostaDada!=this.repostaGabarito){
      this.showDialog("Você errou, leia com atenção as alternativas e tente novamente!", "danger");
    } else{
      this.showDialog("Parabéns! Você acertou, continue focado nos estudos!", "success");
      this.hide = !this.hide;
    } 
  }

  reportQuestion(){
    this.sendEmail();
    this.showDialog("Obrigado por reportar a questão, em breve retornaremos!", "medium");
    this.hide = !this.hide;
  }

  voltar(){
    this.navCtrl.navigateRoot("/home");
  }

  radioGroupChange(event){
    this.respostaDada = event.detail.value;
  }

  async showDialog(message, color) {
    const dialog = await this.toastCtrl.create({ message: message, showCloseButton: true, closeButtonText: 'Fechar', duration: 3000, color: color});
    dialog.present();
  }

  sendEmail(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        
      }
      else{
        this.showDialog("Não foi possivel enviar o email", "danger")
      }
     });
     
     let email = {
      to: 'cesaraugusto.santos@outlook.com',
      cc: '',
      subject: "QuizFATEC - Questão "+ this.prova +"- Número: "+ String(this.numero) +" Reportada",
      body: "Não foi possivel responder a questão, verificar a ausência de imagens, textos ou alternativas vazias.",
      isHtml: true
    }
    
    // Send a text message using default options
    this.emailComposer.open(email);
  }
}
