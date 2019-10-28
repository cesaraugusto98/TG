import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { SecurityUtil } from 'src/utils/security.util';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public question: QuestionModel;
  
  constructor() { }

  ngOnInit() {
    this.question = SecurityUtil.getQuestion();
    console.log(this.question)
  }

}
