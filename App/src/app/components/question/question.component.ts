import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { SecurityUtil } from 'src/utils/security.util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public question: QuestionModel;
  public prova: String;
  public numero: Number;
  public texto: String;
  public a: String;
  public b: String;
  public c: String;
  public d: String;
  public e: String;
  public repostaGabarito: String;
  public links: String[]; 
  public respostaDada
  
  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
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
      console.log(this.repostaGabarito);
    }
  }

  validateQuestion(){
    if(this.respostaDada!=this.repostaGabarito){
      console.log(this.respostaDada)
      console.log(this.repostaGabarito)
      console.log("errou")
    } else{
      console.log(this.respostaDada)
      console.log(this.repostaGabarito)
      console.log("acertou")
    }
    
  }

  reportQuestion(){
    console.log("Deveria enviar um email")
  }

  radioGroupChange(event){
    this.respostaDada = event.detail;
  }
}
