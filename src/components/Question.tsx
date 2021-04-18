import React from "react";
import { AnswerObject } from "../App";
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questioNr: number;
  totalQuestions: number;
};
const Question: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questioNr,
  totalQuestions,
}) => {
  return (
    <div className="question-card">
      <p>
        Question: {questioNr} of {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="btn-container">
        {answers.map((answer, i) => (
          <button
            className="btn"
            value={answer}
            onClick={callback}
            disabled={userAnswer ? true : false}
            key={i}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Question;
