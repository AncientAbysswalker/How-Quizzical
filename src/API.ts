import { shuffleArr } from "./utils";

// Not an enum because mapping with enums is a massive pain!
export const Difficulty: { [key: string]: string } = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export type QuestionData = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionDataComplete = QuestionData & { answers: string[] };

export async function fetchQuizQuestions(
  amount: number,
  difficulty: string,
  category: number
): Promise<QuestionDataComplete[]> {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`;
  console.log(endpoint);
  const data = await (await fetch(endpoint)).json();

  console.log(data);

  return data.results.map((question: QuestionData) => ({
    ...question,
    answers: shuffleArr([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
}
