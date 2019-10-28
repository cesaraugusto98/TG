import { UserModel } from '../app/models/user.model';
import { QuestionModel } from 'src/app/models/question.model';

export class SecurityUtil {
    public static set(user: UserModel) {
        const data = JSON.stringify(user);
        localStorage.setItem('student.data', btoa(data));
    }

    public static get(): UserModel {
        const data = localStorage.getItem('student.data');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }
    public static setQuestion(question: QuestionModel) {
        const data = JSON.stringify(question);
        localStorage.removeItem('student.question');
        localStorage.setItem('student.question', btoa(data));
    }

    public static getQuestion(): QuestionModel {
        const data = localStorage.getItem('student.question');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }

    public static hasToken(): boolean {
        const user = this.get();

        if (user && user._id)
            return true;
        else
            return false;
    }

    /*public static isInRole(role: string): boolean {
        const user = this.get();

        if (!user) 
            return false;

        if (!user.roles || user.roles.length == 0) 
            return false;

        return user.roles.includes(role);
    }*/

    public static clear() {
        localStorage.removeItem('student.data');
        localStorage.removeItem('student.question')
    }
}