import styles from "./QuizQuestion.module.css";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  score,
  onSelect,
  onNext,
  revealed,
  selectedIndex,
}) {
  const isLast = questionNumber === totalQuestions;
  const progressPct = ((questionNumber - 1) / totalQuestions) * 100;

  const getOptionState = (idx) => {
    if (!revealed) return "idle";
    if (idx === question.correctIndex) return "correct";
    if (idx === selectedIndex && idx !== question.correctIndex) return "wrong";
    return "dim";
  };

  return (
    <div className={styles.wrapper}>
      {/* HUD bar */}
      <div className={styles.hud}>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel}>QUESTION</span>
          <span className={styles.hudValue}>{String(questionNumber).padStart(2, "0")} / {String(totalQuestions).padStart(2, "0")}</span>
        </div>
        <div className={styles.hudProgress}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel}>SCORE</span>
          <span className={styles.hudValue}>{score} <span className={styles.hudSub}>pts</span></span>
        </div>
      </div>

      {/* Question card */}
      <div className={styles.questionCard}>
        <div className={styles.qNumber}>Q{questionNumber}</div>
        <p className={styles.questionText}>{question.question}</p>
      </div>

      {/* Options */}
      <div className={styles.options}>
        {question.options.map((opt, idx) => {
          const state = getOptionState(idx);
          return (
            <button
              key={idx}
              className={`${styles.option} ${styles[`option_${state}`]}`}
              onClick={() => onSelect(idx)}
              disabled={revealed}
            >
              <span className={styles.optionLabel}>{OPTION_LABELS[idx]}</span>
              <span className={styles.optionText}>{opt}</span>
              {state === "correct" && <span className={styles.optionIcon}>✓</span>}
              {state === "wrong"   && <span className={styles.optionIcon}>✗</span>}
            </button>
          );
        })}
      </div>

      {/* Explanation reveal */}
      {revealed && (
        <div className={`${styles.explanation} ${selectedIndex === question.correctIndex ? styles.explanationCorrect : styles.explanationWrong}`}>
          <div className={styles.explHeader}>
            <span className={styles.explResult}>
              {selectedIndex === question.correctIndex ? "✓ CORRECT!" : "✗ WRONG"}
            </span>
            {selectedIndex !== question.correctIndex && (
              <span className={styles.correctAnswerNote}>
                Correct: {question.options[question.correctIndex]}
              </span>
            )}
          </div>
          <p className={styles.explText}>{question.explanation}</p>
          {question.funFact && (
            <p className={styles.funFact}>
              <span className={styles.funFactIcon}>⚡</span>
              {question.funFact}
            </p>
          )}
        </div>
      )}

      {/* Next button */}
      {revealed && (
        <button className={styles.nextBtn} onClick={onNext}>
          {isLast ? "SEE RESULTS ▶" : "NEXT QUESTION ▶"}
        </button>
      )}
    </div>
  );
}
