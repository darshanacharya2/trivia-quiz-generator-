import { useState } from "react";
import styles from "./QuizSetup.module.css";

const DIFFICULTIES = [
  { value: "easy",   label: "Easy",   desc: "Crowd-pleaser facts" },
  { value: "medium", label: "Medium", desc: "Know-your-stuff level" },
  { value: "hard",   label: "Hard",   desc: "Expert territory" },
  { value: "mixed",  label: "Mixed",  desc: "Surprise difficulty" },
];

const COUNTS = [5, 10, 15];

const TOPIC_SUGGESTIONS = [
  "Ancient Rome", "The Ocean", "90s Pop Music", "Quantum Physics",
  "Studio Ghibli", "Formula 1", "World Capitals", "The Human Body",
  "Shakespeare", "Dinosaurs", "The Marvel Universe", "Chess",
];

export default function QuizSetup({ onStart, error }) {
  const [topic,      setTopic]      = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [count,      setCount]      = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) onStart(topic.trim(), difficulty, count);
  };

  const pickSuggestion = (s) => setTopic(s);

  return (
    <div className={styles.wrapper}>
      {/* Title card */}
      <div className={styles.titleCard}>
        <div className={styles.titleGlow} aria-hidden="true" />
        <p className={styles.titleEyebrow}>AI-POWERED</p>
        <h1 className={styles.title}>TRIVIA<br /><span className={styles.titleAccent}>BLITZ</span></h1>
        <p className={styles.titleSub}>Any topic. Any difficulty. Instant quiz.</p>
      </div>

      {/* Form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Topic input */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="topic">
            <span className={styles.labelNum}>01</span> ENTER YOUR TOPIC
          </label>
          <input
            id="topic"
            className={styles.input}
            type="text"
            placeholder="e.g. Ancient Rome, Jazz Music, Black Holes..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            maxLength={150}
            autoFocus
            autoComplete="off"
          />
        </div>

        {/* Topic suggestions */}
        <div className={styles.suggestions}>
          {TOPIC_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.chip} ${topic === s ? styles.chipActive : ""}`}
              onClick={() => pickSuggestion(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div className={styles.field}>
          <label className={styles.label}>
            <span className={styles.labelNum}>02</span> DIFFICULTY
          </label>
          <div className={styles.diffGrid}>
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                type="button"
                className={`${styles.diffBtn} ${difficulty === d.value ? styles.diffActive : ""}`}
                onClick={() => setDifficulty(d.value)}
              >
                <span className={styles.diffLabel}>{d.label}</span>
                <span className={styles.diffDesc}>{d.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className={styles.field}>
          <label className={styles.label}>
            <span className={styles.labelNum}>03</span> NUMBER OF QUESTIONS
          </label>
          <div className={styles.countRow}>
            {COUNTS.map((c) => (
              <button
                key={c}
                type="button"
                className={`${styles.countBtn} ${count === c ? styles.countActive : ""}`}
                onClick={() => setCount(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <p className={styles.error}>⚠ {error}</p>}

        {/* Submit */}
        <button className={styles.startBtn} type="submit" disabled={!topic.trim()}>
          <span className={styles.startBtnInner}>START QUIZ ▶</span>
        </button>
      </form>
    </div>
  );
}
