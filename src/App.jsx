import React, { useMemo, useState } from "react";
import "katex/dist/katex.min.css";
import katex from "katex";
import { exerciseSets } from "./data/exerciseSets";

const PI_DIGITS = "314159265358979323846264338327950288419716939937510";

function MathBlock({ math }) {
  let html;
  try {
    html = katex.renderToString(math, {
      throwOnError: false,
      displayMode: true,
    });
  } catch (error) {
    html = `<span>${math}</span>`;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function parseInput(value) {
  const text = value.trim().replace(",", ".");
  if (!text) return NaN;

  if (text.includes("/")) {
    const [a, b] = text.split("/").map(Number);
    if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return NaN;
    return a / b;
  }

  return Number(text);
}

function closeEnough(a, b) {
  return Math.abs(a - b) <= 0.01;
}

function unorderedCloseEnough(values, answers) {
  if (values.length !== answers.length) return false;
  const used = new Array(answers.length).fill(false);

  for (const value of values) {
    let found = false;
    for (let i = 0; i < answers.length; i++) {
      if (!used[i] && closeEnough(value, answers[i])) {
        used[i] = true;
        found = true;
        break;
      }
    }
    if (!found) return false;
  }
  return true;
}

function piEncrypt(plainText) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|,:;.-_ /";
  let output = "";

  for (let i = 0; i < plainText.length; i++) {
    const char = plainText[i];
    const index = chars.indexOf(char);

    if (index === -1) {
      output += char;
      continue;
    }

    const shift = Number(PI_DIGITS[i % PI_DIGITS.length]);
    output += chars[(index + shift) % chars.length];
  }

  return output;
}

function resultToCode(result) {
  if (result === true) return "1";
  if (result === false) return "0";
  if (result === "skipped") return "S";
  return "N";
}

function resultToText(result) {
  if (result === true) return "yes";
  if (result === false) return "no";
  if (result === "skipped") return "skipped";
  return "not attempted";
}

function makeResultText(setTitle, results) {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB");
  const compact = results.map(resultToCode).join(",");
  const plain = `${setTitle}|${date}|${time}|${compact}`;
  const encrypted = piEncrypt(plain);

  return `Math Trainer Results\n\nDate: ${date}\nTime: ${time}\nSet: ${setTitle}\n\n${results
    .map((result, i) => `Question ${i + 1}: ${resultToText(result)}`)
    .join("\n")}\n\nMATHCHECK: ${encrypted}`;
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function App() {
  const [selectedSetId, setSelectedSetId] = useState(exerciseSets[0].id);
  const selectedSet = useMemo(
    () => exerciseSets.find((set) => set.id === selectedSetId),
    [selectedSetId]
  );

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const currentExercise = started && !finished ? selectedSet.exercises[currentIndex] : null;

  function startSet() {
    setStarted(true);
    setFinished(false);
    setCurrentIndex(0);
    setAttempts(0);
    setInputs({});
    setResults(new Array(selectedSet.exercises.length).fill(null));
    setFeedback("");
    setShowHelp(false);
  }

  function goToNextQuestion() {
    const nextIndex = currentIndex + 1;
    setInputs({});
    setAttempts(0);
    setFeedback("");
    setShowHelp(false);

    if (nextIndex >= selectedSet.exercises.length) {
      setFinished(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  function updateResult(questionIndex, value) {
    setResults((old) => {
      const copy = [...old];
      copy[questionIndex] = value;
      return copy;
    });
  }

  function continueExercise() {
    const values = currentExercise.fields.map((field) => parseInput(inputs[field] || ""));

    if (values.some((value) => Number.isNaN(value))) {
      setFeedback("Please enter valid numbers, for example 2, 3.5, or 8/3.");
      return;
    }

    let correct;
    if (currentExercise.type === "system") {
      correct = values.every((value, index) => closeEnough(value, currentExercise.answers[index]));
    } else {
      correct = unorderedCloseEnough(values, currentExercise.answers);
    }

    if (correct) {
      updateResult(currentIndex, true);
      setFeedback("Correct!");
      setTimeout(goToNextQuestion, 650);
      return;
    }

    if (attempts === 0) {
      setAttempts(1);
      setFeedback("Try again, your answer is wrong.");
      setInputs({});
      return;
    }

    updateResult(currentIndex, false);
    setFeedback("The worked solution is shown below. Moving to the next question...");
    setShowHelp(true);
    setTimeout(goToNextQuestion, 2200);
  }

  function skipExercise() {
    updateResult(currentIndex, "skipped");
    goToNextQuestion();
  }

  function endSession() {
    setFinished(true);
  }

  function downloadResults() {
    const content = makeResultText(selectedSet.title, results);
    const today = new Date().toISOString().slice(0, 10);
    const safeTitle = selectedSet.title.toLowerCase().replaceAll(" ", "-");
    downloadTextFile(`math-results-${safeTitle}-${today}.txt`, content);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", color: "#0f172a", padding: "32px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "8px" }}>Algebra Trainer</h1>
          <p style={{ color: "#475569" }}>Practise algebra and download your result file.</p>
        </header>

        {!started && (
          <main style={cardStyle}>
            <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "16px" }}>Choose an exercise set</h2>
            <select
              style={selectStyle}
              value={selectedSetId}
              onChange={(event) => setSelectedSetId(event.target.value)}
            >
              {exerciseSets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.title}
                </option>
              ))}
            </select>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: "20px", padding: "20px", marginBottom: "24px", background: "#f8fafc" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "700" }}>{selectedSet.title}</h3>
              <p style={{ color: "#475569", marginTop: "4px" }}>{selectedSet.description}</p>
            </div>

            <button onClick={startSet} style={primaryButtonStyle}>Start</button>
          </main>
        )}

        {started && !finished && currentExercise && (
          <main style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "16px" }}>
              <div>
                <p style={{ color: "#64748b", fontSize: "14px" }}>{selectedSet.title}</p>
                <h2 style={{ fontSize: "28px", fontWeight: "800" }}>
                  Question {currentIndex + 1} of {selectedSet.exercises.length}
                </h2>
              </div>
              <button onClick={() => setShowHelp((old) => !old)} style={secondaryButtonStyle}>Help</button>
            </div>

            <div style={{ width: "100%", background: "#e2e8f0", borderRadius: "999px", height: "12px", marginBottom: "32px" }}>
              <div
                style={{ width: `${(currentIndex / selectedSet.exercises.length) * 100}%`, background: "#2563eb", height: "12px", borderRadius: "999px", transition: "width 0.3s" }}
              />
            </div>

            <section style={{ background: "#f8fafc", borderRadius: "20px", padding: "24px", marginBottom: "24px", fontSize: "20px" }}>
              <p style={{ color: "#334155", marginBottom: "16px" }}>{currentExercise.instruction}</p>
              <MathBlock math={currentExercise.question} />
            </section>

            <section style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
              {currentExercise.fields.map((field) => (
                <label key={field} style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "20px" }}>
                  <span style={{ width: "56px", fontWeight: "800" }}>{field} =</span>
                  <input
                    style={inputStyle}
                    value={inputs[field] || ""}
                    onChange={(event) => setInputs((old) => ({ ...old, [field]: event.target.value }))}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") continueExercise();
                    }}
                    autoFocus={field === currentExercise.fields[0]}
                  />
                </label>
              ))}
            </section>

            {feedback && (
              <p style={{ fontWeight: "800", marginBottom: "24px", color: feedback.includes("Correct") ? "#16a34a" : "#dc2626" }}>
                {feedback}
              </p>
            )}

            {showHelp && (
              <section style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "20px", padding: "20px", marginBottom: "24px" }}>
                <h3 style={{ fontWeight: "800", fontSize: "20px", marginBottom: "8px" }}>Worked solution</h3>
                <MathBlock math={currentExercise.solution} />
              </section>
            )}

            <div style={{ display: "grid", gap: "12px" }}>
              <button onClick={continueExercise} style={primaryButtonStyle}>Continue</button>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <button onClick={skipExercise} style={secondaryWideButtonStyle}>Skip exercise</button>
                <button onClick={endSession} style={dangerButtonStyle}>End & get results</button>
              </div>
            </div>
          </main>
        )}

        {started && finished && (
          <main style={cardStyle}>
            <h2 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px" }}>Summary</h2>
            <p style={{ color: "#475569", marginBottom: "24px" }}>
              Correct: {results.filter((r) => r === true).length} / {results.length}
            </p>

            <div style={{ display: "grid", gap: "12px", marginBottom: "32px" }}>
              {results.map((result, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px", background: "#f8fafc" }}>
                  <span>Question {index + 1}</span>
                  <span style={{ color: resultColor(result), fontWeight: "800" }}>
                    {resultToText(result)}
                  </span>
                </div>
              ))}
            </div>

            <button onClick={downloadResults} style={{ ...primaryButtonStyle, marginBottom: "16px" }}>Download results</button>
            <button onClick={() => setStarted(false)} style={secondaryWideButtonStyle}>Back to menu</button>
          </main>
        )}
      </div>
    </div>
  );
}

function resultColor(result) {
  if (result === true) return "#16a34a";
  if (result === false) return "#dc2626";
  if (result === "skipped") return "#d97706";
  return "#64748b";
}

const cardStyle = {
  background: "white",
  borderRadius: "28px",
  padding: "32px",
  boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
};

const selectStyle = {
  width: "100%",
  border: "1px solid #cbd5e1",
  borderRadius: "14px",
  padding: "14px",
  fontSize: "18px",
  marginBottom: "24px",
};

const inputStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: "14px",
  padding: "14px",
  fontSize: "20px",
  flex: 1,
};

const primaryButtonStyle = {
  width: "100%",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "18px",
  padding: "18px 24px",
  fontSize: "20px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(37,99,235,0.25)",
};

const secondaryButtonStyle = {
  background: "#e2e8f0",
  color: "#0f172a",
  border: "none",
  borderRadius: "14px",
  padding: "12px 18px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};

const secondaryWideButtonStyle = {
  ...secondaryButtonStyle,
  width: "100%",
  padding: "16px 20px",
  fontSize: "18px",
};

const dangerButtonStyle = {
  ...secondaryWideButtonStyle,
  background: "#fee2e2",
  color: "#991b1b",
};
