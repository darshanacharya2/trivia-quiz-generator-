import { useState, useCallback } from "react";
import { generateQuiz } from "../utils/api.js";

// States: setup → loading → question → results
export function useQuiz() {
  const [screen, setScreen]               = useState("setup");   // setup | loading | question | results
  const [quiz, setQuiz]                   = useState(null);       // full quiz data
  const [currentIndex, setCurrentIndex]   = useState(0);         // current question index
  const [answers, setAnswers]             = useState([]);         // { selectedIndex, correct }[]
  const [revealed, setRevealed]           = useState(false);      // whether answer is shown for current Q
  const [error, setError]                 = useState(null);

  const startQuiz = useCallback(async (topic, difficulty, count) => {
    setScreen("loading");
    setError(null);
    setAnswers([]);
    setCurrentIndex(0);
    setRevealed(false);
    setQuiz(null);

    try {
      const data = await generateQuiz(topic, difficulty, count);
      setQuiz(data);
      setScreen("question");
    } catch (err) {
      setError(err.message);
      setScreen("setup");
    }
  }, []);

  const selectAnswer = useCallback((selectedIndex) => {
    if (revealed) return; // already answered
    const question = quiz.questions[currentIndex];
    const correct = selectedIndex === question.correctIndex;
    setAnswers((prev) => [...prev, { selectedIndex, correct, questionId: question.id }]);
    setRevealed(true);
  }, [revealed, quiz, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= quiz.questions.length) {
      setScreen("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setRevealed(false);
    }
  }, [currentIndex, quiz]);

  const resetQuiz = useCallback(() => {
    setScreen("setup");
    setQuiz(null);
    setAnswers([]);
    setCurrentIndex(0);
    setRevealed(false);
    setError(null);
  }, []);

  const score = answers.filter((a) => a.correct).length;

  return {
    screen,
    quiz,
    currentIndex,
    answers,
    revealed,
    error,
    score,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  };
}
