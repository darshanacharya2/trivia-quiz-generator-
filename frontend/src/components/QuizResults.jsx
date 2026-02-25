import styles from "./QuizResults.module.css";

function getGrade(pct) {
  if (pct === 100) return { label: "PERFECT",  color: "#f5e642", emoji: "🏆" };
  if (pct >= 80)  return { label: "EXCELLENT", color: "#39ff6e", emoji: "⭐" };
  if (pct >= 60)  return { label: "GOOD",      color: "#00e5ff", emoji: "👍" };
  if (pct >= 40)  return { label: "FAIR",      color: "#ff9a3c", emoji: "📚" };
  return              { label: "TRY AGAIN",  color: "#ff2d78", emoji: "🔄" };
}

export default function QuizResults({ quiz, answers, score, onReset, onRetry }) {
  const total = quiz.questions.length;
  const pct   = Math.round((score / total) * 100);
  const grade = getGrade(pct);

  return (
    <div className={styles.wrapper}>
      {/* Score card */}
      <div className={styles.scoreCard} style={{ "--grade-color": grade.color }}>
        <div className={styles.gradeGlow} aria-hidden="true" />
        <div className={styles.emoji}>{grade.emoji}</div>
        <div className={styles.gradePill}>{grade.label}</div>
        <div className={styles.scoreBig}>
          <span className={styles.scoreNum}>{score}</span>
          <span className={styles.scoreSlash}>/</span>
          <span className={styles.scoreTotal}>{total}</span>
        </div>
        <div className={styles.scorePct}>{pct}%</div>
        <p className={styles.topicLine}>
          Topic: <em>{quiz.topic}</em> · {quiz.difficulty.toUpperCase()}
        </p>
      </div>

      {/* Answer review */}
      <div className={styles.reviewSection}>
        <h2 className={styles.reviewTitle}>ANSWER REVIEW</h2>
        <div className={styles.reviewList}>
          {quiz.questions.map((q, i) => {
            const answer = answers[i];
            const correct = answer?.correct;
            return (
              <div key={q.id} className={`${styles.reviewItem} ${correct ? styles.reviewCorrect : styles.reviewWrong}`}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewNum}>Q{i + 1}</span>
                  <span className={styles.reviewBadge}>{correct ? "✓" : "✗"}</span>
                </div>
                <p className={styles.reviewQ}>{q.question}</p>
                <p className={styles.reviewAnswer}>
                  <span className={styles.reviewAnswerLabel}>Correct: </span>
                  {q.options[q.correctIndex]}
                </p>
                {!correct && answer && (
                  <p className={styles.reviewYours}>
                    <span className={styles.reviewAnswerLabel}>Your answer: </span>
                    {q.options[answer.selectedIndex]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        <button className={styles.retryBtn} onClick={onRetry}>
          ↺ SAME TOPIC
        </button>
        <button className={styles.newBtn} onClick={onReset}>
          ▶ NEW QUIZ
        </button>
      </div>
    </div>
  );
}
