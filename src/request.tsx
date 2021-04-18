import { shuffleArray } from "./utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionsState = Question & { answers: string[] };
export let fetchQuestions = async (
  amt: number,
  difficulty: Difficulty
): Promise<QuestionsState[]> => {
  let url = `https://opentdb.com/api.php?amount=${amt}&category=9&difficulty=${difficulty}&type=multiple`;
  let res = await (await fetch(url)).json();
  return res.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
