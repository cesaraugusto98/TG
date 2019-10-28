export class QuestionModel {
    constructor(
        public prova: string,
        public numero: number,
        public tema: string,
        public texto: string,
        public a: string,
        public b: string,
        public c: string,
        public d: string,
        public e: string,
        public links: string[],
        public resposta: string,
    ) {

    }
}