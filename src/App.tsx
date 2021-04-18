import React, { useState } from "react";
import "./App.css";
import { Difficulty, fetchQuestions, QuestionsState } from "./request";
import Question from "./components/Question";
const Total_questions: number = 10;
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
function App() {
  const [Questions, setQuestions] = useState<QuestionsState[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [loading, setLoading] = useState(false);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const res = await fetchQuestions(Total_questions, Difficulty.EASY);
    setQuestions(res);
    setScore(0);
    setNumber(0);
    setUserAnswers([]);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = Questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject: AnswerObject = {
        question: Questions[number].question,
        answer,
        correct,
        correctAnswer: Questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    const next = number + 1;
    if (next === Total_questions) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  };
  return (
    <div className="App">
      <h1>Typescript Quiz!!</h1>
      {loading ? (
        "Isloading"
      ) : (
        <React.Fragment>
          {" "}
          
          {gameOver || userAnswers.length === Total_questions ? (
            <button onClick={startTrivia}>Start Quiz</button>
          ) : null}
          {!gameOver && (
            <React.Fragment>
              Score: {score}
              {" "}
              <Question
                totalQuestions={Total_questions}
                question={Questions[number].question}
                questioNr={number + 1}
                callback={checkAnswer}
                answers={Questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
              />
              {!gameOver &&
                userAnswers.length === number + 1 &&
                number !== Total_questions - 1 && (
                  <button onClick={nextQuestion}>Next Question</button>
                )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
