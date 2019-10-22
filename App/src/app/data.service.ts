import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //public baseUrl = "https://345362ce.ngrok.io/QuizFATEC";
  public baseUrl = "http://localhost:5000/QuizFATEC";

  constructor(private http: HttpClient) { }

  public getAuthenticated(data: any) {
    console.log(data)
    return this.http.post(`${this.baseUrl}/Usuarios/Login`, data);
  }

  public postUser(data: any) {
    return this.http.post(`${this.baseUrl}/Usuarios/Login`, data);
  }

  public getAllQuestions() {
    return this.http.get(`${this.baseUrl}/Provas`);
  }

  public getRandomQuestion() {
    return this.http.get(`${this.baseUrl}/Provas/Random/`);
  }
  

  public getRandomTheme(theme: string) {
    return this.http.get(`${this.baseUrl}/Provas/Random/${theme}`);
  }
}
