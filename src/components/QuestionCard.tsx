import React from "react";

// Styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

// Types
import { AnswerObject } from "../App";
type QuestionCardProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  user_answer: AnswerObject | undefined;
  q_num: number;
  q_total: number;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  callback,
  user_answer,
  q_num,
  q_total,
}) => (
  <Wrapper>
    <p className="number">
      Question: {q_num} / {q_total}
    </p>

    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={user_answer?.correct_answer === answer}
          userClicked={user_answer?.answer === answer}
          userHasAnswered={user_answer !== undefined}
        >
          <button disabled={!!user_answer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
