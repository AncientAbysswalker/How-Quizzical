import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";

// Components
import QuestionCard from "./components/QuestionCard";

// Types
import { QuestionDataComplete, Difficulty } from "./API";

// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string;
};

const Categories: { [key: string]: number } = {
  "General Knowledge": 9,
  "Computer Science": 18,
  "Cartoons & Animation": 32,
  Animals: 27,
};

// Global Variables
const TOTAL_QUESTIONS = 10;

// Main App
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionDataComplete[]>([]);
  const [question_number, setQuestionNumber] = useState(0);
  const [user_answers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [game_ended, setGameEnded] = useState(true);
  const [category_state, setCategory] = useState(
    Categories["General Knowledge"]
  );
  const [difficulty_state, setDifficulty] = useState(Difficulty.EASY as string);

  async function startQuiz() {
    setLoading(true);
    setGameEnded(false);

    const new_questions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty_state,
      category_state
    );

    try {
      setQuestions(new_questions);
    } catch (err) {
      alert(`An exception occurred trying to set up the quiz for you:\n${err}`);
    }
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  }

  // Check the validity of the user's answer and commit the answer to the list of recorded answers
  function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    if (!game_ended) {
      const answer = e.currentTarget.value;
      const correct = questions[question_number].correct_answer === answer;

      // Commit answer
      if (correct) setScore((prev) => prev + 1);
      const answer_obj = {
        question: questions[question_number].question,
        answer,
        correct,
        correct_answer: questions[question_number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answer_obj]);
    }
  }

  // Progress onto the next question in the quiz
  function nextQuestion() {
    const next_question = question_number + 1;

    if (next_question === TOTAL_QUESTIONS) {
      setGameEnded(true);
    } else {
      setQuestionNumber(next_question);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>How Quizzical‽</h1>
        {/* Render dropdowns and start button at quiz start */}
        {(game_ended || user_answers.length === TOTAL_QUESTIONS) && (
          <>
            <div>
              <select
                className="dropdown"
                defaultValue={category_state}
                onChange={(e) => setCategory(+e.currentTarget.value)}
              >
                {Object.keys(Categories).map((category) => (
                  <option key={category} value={Categories[category]}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="dropdown"
                defaultValue={difficulty_state}
                onChange={(e) => setDifficulty(e.currentTarget.value)}
              >
                {Object.keys(Difficulty).map((diff) => (
                  <option key={diff} value={Difficulty[diff]}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
            <button className="start" onClick={startQuiz}>
              Start
            </button>
          </>
        )}
        {!game_ended && !loading && <p className="score">Score: {score}</p>}{" "}
        {/* Render score if appropriate */}
        {loading && <div className="loader"></div>}{" "}
        {/* Render loader when loading */}
        {/* Render questoin cards during quiz */}
        {!loading && !game_ended && (
          <QuestionCard
            q_num={question_number + 1}
            q_total={TOTAL_QUESTIONS}
            question={questions[question_number].question}
            answers={questions[question_number].answers}
            user_answer={
              user_answers ? user_answers[question_number] : undefined
            }
            callback={checkAnswer}
          />
        )}
        {/* Render next button after answering */}
        {!loading &&
          !game_ended &&
          user_answers.length === question_number + 1 &&
          question_number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  );
};

export default App;
