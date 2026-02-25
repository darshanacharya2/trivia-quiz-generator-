import { useQuiz } from "./hooks/useQuiz.js";
import QuizSetup from "./components/QuizSetup.jsx";
import QuizQuestion from "./components/QuizQuestion.jsx";
import QuizResults from "./components/QuizResults.jsx";
import styles from "./App.module.css";

export default function App() {
  const {
    screen, quiz, currentIndex, answers, revealed,
    error, score, startQuiz, selectAnswer, nextQuestion, resetQuiz,
  } = useQuiz();

  // "Retry" — same topic/difficulty/count
  const handleRetry = () => {
    if (quiz) startQuiz(quiz.topic, quiz.difficulty, quiz.questions.length);
  };

  return (
    <div className={styles.app}>
      {/* Neon grid background */}
      <div className={styles.bgGrid} aria-hidden="true" />
      {/* Top neon glow bar */}
      <div className={styles.topGlow} aria-hidden="true" />

      <header className={styles.topBar}>
        <span className={styles.logo}>TRIVIA<span className={styles.logoAccent}>BLITZ</span></span>
        {quiz && screen !== "setup" && (
          <button className={styles.exitBtn} onClick={resetQuiz}>✕ EXIT</button>
        )}
      </header>

      <main className={styles.main}>
        {/* Loading screen */}
        {screen === "loading" && (
          <div className={styles.loadingScreen}>
            <div className={styles.loadingOuter}>
              <div className={styles.loadingInner} />
            </div>
            <p className={styles.loadingText}>GENERATING QUIZ</p>
            <p className={styles.loadingSubtext}>Claude AI is crafting your questions…</p>
          </div>
        )}

        {/* Setup */}
        {screen === "setup" && (
          <QuizSetup onStart={startQuiz} error={error} />
        )}

        {/* Question */}
        {screen === "question" && quiz && (
          <QuizQuestion
            question={quiz.questions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={quiz.questions.length}
            score={score}
            onSelect={selectAnswer}
            onNext={nextQuestion}
            revealed={revealed}
            selectedIndex={answers[currentIndex]?.selectedIndex ?? null}
          />
        )}

        {/* Results */}
        {screen === "results" && quiz && (
          <QuizResults
            quiz={quiz}
            answers={answers}
            score={score}
            onReset={resetQuiz}
            onRetry={handleRetry}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <span>TRIVIA BLITZ</span>
        <span className={styles.sep}>·</span>
        <span>AI-POWERED BY CLAUDE</span>
        <span className={styles.sep}>·</span>
        <span>ANY TOPIC · ANY DIFFICULTY</span>
      </footer>
    </div>
  );
}
