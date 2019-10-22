export class UserModel {
    constructor(
        public _id: string,
        public email: string,
        public name: string,
        public nickname: string,
        public password: string,
    ) {

    }
}