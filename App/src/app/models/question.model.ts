export class QuestionModel {
    constructor(
        public id: string,
        public prova: string,
        public numeroQuestao: number,
        public tema: string,
        public questao: string,
        public alternativaA: string,
        public alternativaB: string,
        public alternativaC: string,
        public alternativaD: string,
        public alternativaE: string,
        public links: string[],
        public resposta: string,
    ) {

    }
}