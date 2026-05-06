import React, { useMemo, useState } from "react";

const PI_DIGITS = "314159265358979323846264338327950288419716939937510";

const exerciseSets = [
  {
    id: "version-1",
    title: "Version 1",
    description: "Linear systems, quadratic equations, root and power equations.",
    exercises: [
      {
        type: "system",
        title: "Question 1",
        question: String.raw`Solve the system:
\[
2x + y = 7
\]
\[
x - y = 1
\]`,
        fields: ["x", "y"],
        answers: [8 / 3, 5 / 3],
        solution: String.raw`From \(x-y=1\), we get \(x=y+1\).
Substitute into \(2x+y=7\):
\[
2(y+1)+y=7
\]
\[
3y+2=7
\]
\[
y=\frac{5}{3}
\]
Then:
\[
x=y+1=\frac{8}{3}
\]`,
      },
      {
        type: "system",
        title: "Question 2",
        question: String.raw`A shop sells pens and notebooks.

2 pens and 1 notebook cost 7 CHF.
1 pen and 1 notebook cost 4 CHF.

Let \(x\) be the price of one pen and \(y\) the price of one notebook.
Find \(x\) and \(y\).`,
        fields: ["x", "y"],
        answers: [3, 1],
        solution: String.raw`The equations are:
\[
2x+y=7
\]
\[
x+y=4
\]
Subtract the second equation from the first:
\[
x=3
\]
Then:
\[
3+y=4 \Rightarrow y=1
\]`,
      },
      {
        type: "multi",
        title: "Question 3",
        question: String.raw`Solve:
\[
x^2 - 5x + 6 = 0
\]`,
        fields: ["x₁", "x₂"],
        answers: [2, 3],
        solution: String.raw`Factorise:
\[
x^2 - 5x + 6 = (x-2)(x-3)
\]
So:
\[
x=2 \quad \text{or} \quad x=3
\]`,
      },
      {
        type: "multi",
        title: "Question 4",
        question: String.raw`Solve:
\[
2x(x-2)+10 = x(x+3)
\]`,
        fields: ["x₁", "x₂"],
        answers: [2, 5],
        solution: String.raw`Expand both sides:
\[
2x^2-4x+10 = x^2+3x
\]
Bring everything to one side:
\[
x^2-7x+10=0
\]
Factorise:
\[
(x-2)(x-5)=0
\]
Therefore:
\[
x=2 \quad \text{or} \quad x=5
\]`,
      },
      {
        type: "single",
        title: "Question 5",
        question: String.raw`Solve:
\[
\sqrt{x+7}=4
\]`,
        fields: ["x"],
        answers: [9],
        solution: String.raw`Square both sides:
\[
x+7=16
\]
So:
\[
x=9
\]
Check:
\[
\sqrt{9+7}=4
\]`,
      },
      {
        type: "single",
        title: "Question 6",
        question: String.raw`Solve:
\[
2^x=16
\]`,
        fields: ["x"],
        answers: [4],
        solution: String.raw`Write 16 as a power of 2:
\[
16=2^4
\]
So:
\[
2^x=2^4
\]
Therefore:
\[
x=4
\]`,
      },
    ],
  },
];

function normaliseMathText(text) {
  return text
    .replaceAll("\\[", "")
    .replaceAll("\\]", "")
    .replaceAll("\\(", "")
    .replaceAll("\\)", "")
    .replaceAll("\\frac{", "")
    .replaceAll("}{", "/")
    .replaceAll("}", "")
    .replaceAll("\\sqrt", "√")
    .replaceAll("\\quad", "   ")
    .replaceAll("\\text", "")
    .replaceAll("\\Rightarrow", "⇒")
    .replaceAll("\\", "");
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

function makeResultText(setTitle, results) {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB");
  const compact = results.map((result) => (result === true ? "1" : "0")).join(",");
  const plainCheck = `${setTitle}|${date}|${time}|${compact}`;
  const encrypted = piEncrypt(plainCheck);

  const lines = [
    "Math Trainer Results",
    "====================",
    "",
    `Date: ${date}`,
    `Time: ${time}`,
    `Exercise set: ${setTitle}`,
    "",
    "Summary:",
    ...results.map((result, index) => `Question ${index + 1}: ${result ? "yes" : "no"}`),
    "",
    "Encrypted check line:",
    `MATHCHECK: ${encrypted}`,
    "",
    "Plain result format:",
    "yes = correct, no = wrong",
  ];

  return lines.join("\n");
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const currentExercise = selectedSet.exercises[currentIndex];
  const finished = started && currentIndex >= selectedSet.exercises.length;

  function startSet() {
    setStarted(true);
    setCurrentIndex(0);
    setAttempts(0);
    setInputs({});
    setResults([]);
    setFeedback("");
    setShowHelp(false);
  }

  function updateInput(field, value) {
    setInputs((old) => ({ ...old, [field]: value }));
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
      setResults((old) => [...old, true]);
      setFeedback("Correct!");
      setTimeout(() => nextExercise(), 650);
      return;
    }

    if (attempts === 0) {
      setAttempts(1);
      setFeedback("Try again, your answer is wrong.");
      setInputs({});
      return;
    }

    setResults((old) => [...old, false]);
    setFeedback("The solution is shown below. Moving to the next question...");
    setShowHelp(true);
    setTimeout(() => nextExercise(), 1800);
  }

  function nextExercise() {
    setCurrentIndex((old) => old + 1);
    setAttempts(0);
    setInputs({});
    setFeedback("");
    setShowHelp(false);
  }

  function downloadResults() {
    const content = makeResultText(selectedSet.title, results);
    const today = new Date().toISOString().slice(0, 10);
    const safeTitle = selectedSet.title.toLowerCase().replaceAll(" ", "-");
    downloadTextFile(`math-results-${safeTitle}-${today}.txt`, content);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Algebra Trainer</h1>
          <p className="text-slate-600 mt-2">Practise algebra and download your result file.</p>
        </header>

        {!started && (
          <main className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Choose an exercise set</h2>
            <select
              className="w-full border rounded-xl p-3 text-lg mb-6"
              value={selectedSetId}
              onChange={(event) => setSelectedSetId(event.target.value)}
            >
              {exerciseSets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.title}
                </option>
              ))}
            </select>

            <div className="border rounded-2xl p-5 mb-6 bg-slate-50">
              <h3 className="text-xl font-semibold">{selectedSet.title}</h3>
              <p className="text-slate-600 mt-1">{selectedSet.description}</p>
            </div>

            <button
              onClick={startSet}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-4 text-lg font-bold shadow"
            >
              Start
            </button>
          </main>
        )}

        {started && !finished && (
          <main className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-5 gap-4">
              <div>
                <p className="text-sm text-slate-500">{selectedSet.title}</p>
                <h2 className="text-2xl font-bold">
                  Question {currentIndex + 1} of {selectedSet.exercises.length}
                </h2>
              </div>
              <button
                onClick={() => setShowHelp((old) => !old)}
                className="bg-slate-200 hover:bg-slate-300 rounded-xl px-4 py-2 font-semibold"
              >
                Help
              </button>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 mb-8">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${(currentIndex / selectedSet.exercises.length) * 100}%` }}
              />
            </div>

            <section className="bg-slate-50 rounded-2xl p-6 mb-6 whitespace-pre-line text-xl leading-relaxed">
              {normaliseMathText(currentExercise.question)}
            </section>

            <section className="grid gap-4 mb-6">
              {currentExercise.fields.map((field) => (
                <label key={field} className="flex items-center gap-4 text-lg">
                  <span className="w-12 font-bold">{field} =</span>
                  <input
                    className="border rounded-xl p-3 text-lg flex-1"
                    value={inputs[field] || ""}
                    onChange={(event) => updateInput(field, event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") continueExercise();
                    }}
                    autoFocus={field === currentExercise.fields[0]}
                  />
                </label>
              ))}
            </section>

            {feedback && (
              <p
                className={`font-bold mb-6 ${
                  feedback.includes("Correct") ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            )}

            {showHelp && (
              <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 whitespace-pre-line">
                <h3 className="font-bold text-lg mb-2">Worked solution</h3>
                <p>{normaliseMathText(currentExercise.solution)}</p>
              </section>
            )}

            <button
              onClick={continueExercise}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-4 text-lg font-bold shadow"
            >
              Continue
            </button>
          </main>
        )}

        {finished && (
          <main className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-2">Summary</h2>
            <p className="text-slate-600 mb-6">
              Score: {results.filter(Boolean).length} / {results.length}
            </p>

            <div className="grid gap-3 mb-8">
              {results.map((result, index) => (
                <div key={index} className="flex justify-between border rounded-xl p-4 bg-slate-50">
                  <span>Question {index + 1}</span>
                  <span className={result ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {result ? "yes" : "no"}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={downloadResults}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-4 text-lg font-bold shadow mb-4"
            >
              Download results
            </button>

            <button
              onClick={() => setStarted(false)}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl px-6 py-4 text-lg font-bold"
            >
              Back to menu
            </button>
          </main>
        )}
      </div>
    </div>
  );
}
