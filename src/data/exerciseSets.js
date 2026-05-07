export const exerciseSets = [
  {
    id: "version-1",
    title: "Version 1",
    description: "Introductory algebra practice.",
    exercises: [
      {
        type: "system",
        title: "Question 1",
        instruction: "Solve the system.",
        question: String.raw`\begin{aligned}2x + y &= 7 \\ x - y &= 1\end{aligned}`,
        fields: ["x", "y"],
        answers: [8 / 3, 5 / 3],
        solution: String.raw`
\begin{aligned}
2x+y &= 7 \\
x-y &= 1 \\
\text{Add the equations:}\quad 3x &= 8 \\
x &= \frac{8}{3} \\
\frac{8}{3}-y &= 1 \\
y &= \frac{5}{3}
\end{aligned}
`,
      },
      {
        type: "system",
        title: "Question 2",
        instruction:
          "A shop sells pens and notebooks. 2 pens and 1 notebook cost 7 CHF. 1 pen and 1 notebook cost 4 CHF. Let x be the price of a pen and y the price of a notebook.",
        question: String.raw`\begin{aligned}2x + y &= 7 \\ x + y &= 4\end{aligned}`,
        fields: ["x", "y"],
        answers: [3, 1],
        solution: String.raw`
\begin{aligned}
2x+y &= 7 \\
x+y &= 4 \\
\text{Subtract:}\quad x &= 3 \\
3+y &= 4 \\
y &= 1
\end{aligned}
`,
      },
      {
        type: "multi",
        title: "Question 3",
        instruction: "Solve the quadratic equation.",
        question: String.raw`x^2 - 5x + 6 = 0`,
        fields: ["x₁", "x₂"],
        answers: [2, 3],
        solution: String.raw`
\begin{aligned}
x^2-5x+6 &= 0 \\
(x-2)(x-3) &= 0 \\
x &= 2 \quad \text{or} \quad x=3
\end{aligned}
`,
      },
      {
        type: "multi",
        title: "Question 4",
        instruction: "Expand first, then solve the quadratic equation.",
        question: String.raw`2x(x-2)+10 = x(x+3)`,
        fields: ["x₁", "x₂"],
        answers: [2, 5],
        solution: String.raw`
\begin{aligned}
2x(x-2)+10 &= x(x+3) \\
2x^2-4x+10 &= x^2+3x \\
x^2-7x+10 &= 0 \\
(x-2)(x-5) &= 0 \\
x &= 2 \quad \text{or} \quad x=5
\end{aligned}
`,
      },
      {
        type: "single",
        title: "Question 5",
        instruction: "Solve the root equation.",
        question: String.raw`\sqrt{x+7}=4`,
        fields: ["x"],
        answers: [9],
        solution: String.raw`
\begin{aligned}
\sqrt{x+7} &= 4 \\
x+7 &= 16 \\
x &= 9
\end{aligned}
`,
      },
      {
        type: "single",
        title: "Question 6",
        instruction: "Solve the power equation.",
        question: String.raw`2^x = 16`,
        fields: ["x"],
        answers: [4],
        solution: String.raw`
\begin{aligned}
2^x &= 16 \\
2^x &= 2^4 \\
x &= 4
\end{aligned}
`,
      },
    ],
  },

  {
    id: "version-2",
    title: "Version 2",
    description: "Slightly harder algebra practice.",
    exercises: [
      {
        type: "system",
        title: "Question 1",
        instruction: "Solve the system.",
        question: String.raw`\begin{aligned}3x + y &= 11 \\ x - y &= 1\end{aligned}`,
        fields: ["x", "y"],
        answers: [3, 2],
        solution: String.raw`\begin{aligned}3x+y&=11\\x-y&=1\\4x&=12\\x&=3\\3-y&=1\\y&=2\end{aligned}`,
      },
      {
        type: "system",
        title: "Question 2",
        instruction:
          "A cinema sells adult tickets and student tickets. 1 adult ticket and 2 student tickets cost 24 CHF. 2 adult tickets and 1 student ticket cost 27 CHF. Let x be the price of an adult ticket and y the price of a student ticket.",
        question: String.raw`\begin{aligned}x + 2y &= 24 \\ 2x + y &= 27\end{aligned}`,
        fields: ["x", "y"],
        answers: [10, 7],
        solution: String.raw`\begin{aligned}x+2y&=24\\2x+y&=27\\2x+4y&=48\\2x+y&=27\\3y&=21\\y&=7\\x+14&=24\\x&=10\end{aligned}`,
      },
      {
        type: "multi",
        title: "Question 3",
        instruction: "Solve the quadratic equation.",
        question: String.raw`x^2 + 3x - 10 = 0`,
        fields: ["x₁", "x₂"],
        answers: [2, -5],
        solution: String.raw`\begin{aligned}x^2+3x-10&=0\\(x-2)(x+5)&=0\\x&=2\quad\text{or}\quad x=-5\end{aligned}`,
      },
      {
        type: "multi",
        title: "Question 4",
        instruction: "Expand first, then solve the quadratic equation.",
        question: String.raw`x(3x+3)+14 = 2x(x-3)`,
        fields: ["x₁", "x₂"],
        answers: [-7, -2],
        solution: String.raw`\begin{aligned}3x^2+3x+14&=2x^2-6x\\x^2+9x+14&=0\\(x+7)(x+2)&=0\\x&=-7\quad\text{or}\quad x=-2\end{aligned}`,
      },
      {
        type: "multi",
        title: "Question 5",
        instruction: "Solve the root equation.",
        question: String.raw`\sqrt{x^2+9}-3=2`,
        fields: ["x₁", "x₂"],
        answers: [4, -4],
        solution: String.raw`\begin{aligned}\sqrt{x^2+9}-3&=2\\\sqrt{x^2+9}&=5\\x^2+9&=25\\x^2&=16\\x&=4\quad\text{or}\quad x=-4\end{aligned}`,
      },
      {
        type: "single",
        title: "Question 6",
        instruction: "Solve the power equation.",
        question: String.raw`3^x - 3^2 = 18`,
        fields: ["x"],
        answers: [3],
        solution: String.raw`\begin{aligned}3^x-3^2&=18\\3^x-9&=18\\3^x&=27\\3^x&=3^3\\x&=3\end{aligned}`,
      },
    ],
  },

{
  id: "version-3",
  title: "Version 3",
  description: "Intermediate algebra practice.",
  exercises: [
    {
      type: "system",
      title: "Question 1",
      instruction: "Solve the system.",
      question: String.raw`\begin{aligned}3x - 2y &= 8 \\ x + y &= 6\end{aligned}`,
      fields: ["x", "y"],
      answers: [4, 2],
      solution: String.raw`\begin{aligned}
3x-2y&=8\\
x+y&=6\\
x&=6-y\\
3(6-y)-2y&=8\\
18-5y&=8\\
-5y&=-10\\
y&=2\\
x+2&=6\\
x&=4
\end{aligned}`,
    },
    {
      type: "system",
      title: "Question 2",
      instruction:
        "A theatre sold 12 tickets. Adult tickets cost 10 CHF and child tickets cost 5 CHF. The total income was 85 CHF. Let x be the number of adult tickets and y the number of child tickets.",
      question: String.raw`\begin{aligned}x + y &= 12 \\ 10x + 5y &= 85\end{aligned}`,
      fields: ["x", "y"],
      answers: [5, 7],
      solution: String.raw`\begin{aligned}
x+y&=12\\
10x+5y&=85\\
5x+5y&=60\\
10x+5y&=85\\
5x&=25\\
x&=5\\
5+y&=12\\
y&=7
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 3",
      instruction: "Solve the quadratic equation.",
      question: String.raw`x^2 - 7x + 12 = 0`,
      fields: ["x₁", "x₂"],
      answers: [3, 4],
      solution: String.raw`\begin{aligned}
x^2-7x+12&=0\\
(x-3)(x-4)&=0\\
x&=3\quad\text{or}\quad x=4
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 4",
      instruction: "Expand first, then solve the quadratic equation.",
      question: String.raw`(x+7)(x-3)+24 = 2x(x+3)`,
      fields: ["x₁", "x₂"],
      answers: [-3, 1],
      solution: String.raw`\begin{aligned}
(x+7)(x-3)+24&=2x(x+3)\\
x^2+4x-21+24&=2x^2+6x\\
x^2+4x+3&=2x^2+6x\\
0&=x^2+2x-3\\
0&=(x+3)(x-1)\\
x&=-3\quad\text{or}\quad x=1
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 5",
      instruction: "Solve the root equation. Round to 2 decimal places if necessary.",
      question: String.raw`\sqrt{2x+5}+1=x`,
      fields: ["x"],
      answers: [2 + 2 * Math.sqrt(2)],
      solution: String.raw`\begin{aligned}
\sqrt{2x+5}+1&=x\\
\sqrt{2x+5}&=x-1\\
2x+5&=(x-1)^2\\
2x+5&=x^2-2x+1\\
0&=x^2-4x-4\\
x&=2\pm2\sqrt{2}\\
x&=2+2\sqrt{2}\approx4.83
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 6",
      instruction: "Solve the power equation.",
      question: String.raw`4^{x+1}=32`,
      fields: ["x"],
      answers: [1.5],
      solution: String.raw`\begin{aligned}
4^{x+1}&=32\\
(2^2)^{x+1}&=2^5\\
2^{2x+2}&=2^5\\
2x+2&=5\\
x&=\frac{3}{2}=1.5
\end{aligned}`,
    },
  ],
},
{
  id: "version-4",
  title: "Version 4",
  description: "Intermediate algebra with negative numbers.",
  exercises: [
    {
      type: "system",
      title: "Question 1",
      instruction: "Solve the system.",
      question: String.raw`\begin{aligned}2x - y &= 9 \\ x + 3y &= 1\end{aligned}`,
      fields: ["x", "y"],
      answers: [4, -1],
      solution: String.raw`\begin{aligned}
2x-y&=9\\
x+3y&=1\\
y&=2x-9\\
x+3(2x-9)&=1\\
7x-27&=1\\
7x&=28\\
x&=4\\
y&=2\cdot4-9=-1
\end{aligned}`,
    },
    {
      type: "system",
      title: "Question 2",
      instruction:
        "At a school event, 2 sandwiches and 3 drinks cost 31 CHF. 1 sandwich and 2 drinks cost 18 CHF. Let x be the price of a sandwich and y the price of a drink.",
      question: String.raw`\begin{aligned}2x + 3y &= 31 \\ x + 2y &= 18\end{aligned}`,
      fields: ["x", "y"],
      answers: [8, 5],
      solution: String.raw`\begin{aligned}
2x+3y&=31\\
x+2y&=18\\
2x+4y&=36\\
2x+3y&=31\\
y&=5\\
x+2\cdot5&=18\\
x&=8
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 3",
      instruction: "Solve the quadratic equation.",
      question: String.raw`2x^2 - 5x - 3 = 0`,
      fields: ["x₁", "x₂"],
      answers: [3, -0.5],
      solution: String.raw`\begin{aligned}
2x^2-5x-3&=0\\
(2x+1)(x-3)&=0\\
x&=-\frac12\quad\text{or}\quad x=3
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 4",
      instruction: "Expand first, then solve the quadratic equation.",
      question: String.raw`(x+3)^2 = 2(x+7)`,
      fields: ["x₁", "x₂"],
      answers: [-5, 1],
      solution: String.raw`\begin{aligned}
(x+3)^2&=2(x+7)\\
x^2+6x+9&=2x+14\\
x^2+4x-5&=0\\
(x+5)(x-1)&=0\\
x&=-5\quad\text{or}\quad x=1
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 5",
      instruction: "Solve the root equation.",
      question: String.raw`\sqrt{x^2-4x+13}=x+1`,
      fields: ["x"],
      answers: [2],
      solution: String.raw`\begin{aligned}
\sqrt{x^2-4x+13}&=x+1\\
x^2-4x+13&=(x+1)^2\\
x^2-4x+13&=x^2+2x+1\\
12&=6x\\
x&=2
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 6",
      instruction: "Solve the power equation.",
      question: String.raw`2\cdot5^{x-1}-7=43`,
      fields: ["x"],
      answers: [3],
      solution: String.raw`\begin{aligned}
2\cdot5^{x-1}-7&=43\\
2\cdot5^{x-1}&=50\\
5^{x-1}&=25\\
5^{x-1}&=5^2\\
x-1&=2\\
x&=3
\end{aligned}`,
    },
  ],
},
{
  id: "version-5",
  title: "Version 5",
  description: "More challenging algebra practice.",
  exercises: [
    {
      type: "system",
      title: "Question 1",
      instruction: "Solve the system.",
      question: String.raw`\begin{aligned}x + y &= 3 \\ 2x - y &= -9\end{aligned}`,
      fields: ["x", "y"],
      answers: [-2, 5],
      solution: String.raw`\begin{aligned}
x+y&=3\\
2x-y&=-9\\
3x&=-6\\
x&=-2\\
-2+y&=3\\
y&=5
\end{aligned}`,
    },
    {
      type: "system",
      title: "Question 2",
      instruction:
        "The sum of two numbers is 18. The difference between the larger number and the smaller number is 4. Let x be the larger number and y the smaller number.",
      question: String.raw`\begin{aligned}x + y &= 18 \\ x - y &= 4\end{aligned}`,
      fields: ["x", "y"],
      answers: [11, 7],
      solution: String.raw`\begin{aligned}
x+y&=18\\
x-y&=4\\
2x&=22\\
x&=11\\
11+y&=18\\
y&=7
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 3",
      instruction: "Solve the quadratic equation.",
      question: String.raw`x^2 + x - 20 = 0`,
      fields: ["x₁", "x₂"],
      answers: [4, -5],
      solution: String.raw`\begin{aligned}
x^2+x-20&=0\\
(x-4)(x+5)&=0\\
x&=4\quad\text{or}\quad x=-5
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 4",
      instruction: "Expand first, then solve the quadratic equation.",
      question: String.raw`x(5x-1)=3(x+2)(x-2)+18`,
      fields: ["x₁", "x₂"],
      answers: [-1.5, 2],
      solution: String.raw`\begin{aligned}
x(5x-1)&=3(x+2)(x-2)+18\\
5x^2-x&=3(x^2-4)+18\\
5x^2-x&=3x^2+6\\
2x^2-x-6&=0\\
(2x+3)(x-2)&=0\\
x&=-\frac32\quad\text{or}\quad x=2
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 5",
      instruction: "Solve the root equation. Round to 2 decimal places if necessary.",
      question: String.raw`\sqrt{3x+10}=x-2`,
      fields: ["x"],
      answers: [(7 + Math.sqrt(73)) / 2],
      solution: String.raw`\begin{aligned}
\sqrt{3x+10}&=x-2\\
3x+10&=(x-2)^2\\
3x+10&=x^2-4x+4\\
0&=x^2-7x-6\\
x&=\frac{7\pm\sqrt{73}}{2}\\
x&=\frac{7+\sqrt{73}}{2}\approx7.77
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 6",
      instruction: "Solve the power equation. Round to 2 decimal places if necessary.",
      question: String.raw`e^{2x-1}+4=13`,
      fields: ["x"],
      answers: [(Math.log(9) + 1) / 2],
      solution: String.raw`\begin{aligned}
e^{2x-1}+4&=13\\
e^{2x-1}&=9\\
2x-1&=\ln(9)\\
2x&=\ln(9)+1\\
x&=\frac{\ln(9)+1}{2}\approx1.60
\end{aligned}`,
    },
  ],
},
{
  id: "version-6",
  title: "Version 6",
  description: "Mixed algebra practice with fractions.",
  exercises: [
    {
      type: "system",
      title: "Question 1",
      instruction: "Solve the system.",
      question: String.raw`\begin{aligned}4x + 2y &= 8 \\ 2x - y &= -2\end{aligned}`,
      fields: ["x", "y"],
      answers: [0.5, 3],
      solution: String.raw`\begin{aligned}
4x+2y&=8\\
2x-y&=-2\\
4x-2y&=-4\\
8x&=4\\
x&=\frac12\\
2\cdot\frac12-y&=-2\\
1-y&=-2\\
y&=3
\end{aligned}`,
    },
    {
      type: "system",
      title: "Question 2",
      instruction:
        "A restaurant sells burgers and drinks. 3 burgers and 2 drinks cost 22 CHF. 2 burgers and 5 drinks cost 22 CHF. Let x be the price of a burger and y the price of a drink.",
      question: String.raw`\begin{aligned}3x + 2y &= 22 \\ 2x + 5y &= 22\end{aligned}`,
      fields: ["x", "y"],
      answers: [6, 2],
      solution: String.raw`\begin{aligned}
3x+2y&=22\\
2x+5y&=22\\
15x+10y&=110\\
4x+10y&=44\\
11x&=66\\
x&=6\\
3\cdot6+2y&=22\\
2y&=4\\
y&=2
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 3",
      instruction: "Solve the quadratic equation.",
      question: String.raw`3x^2 - 8x + 4 = 0`,
      fields: ["x₁", "x₂"],
      answers: [2, 2 / 3],
      solution: String.raw`\begin{aligned}
3x^2-8x+4&=0\\
(3x-2)(x-2)&=0\\
x&=\frac23\quad\text{or}\quad x=2
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 4",
      instruction: "Expand first, then solve the quadratic equation. Round to 2 decimal places if necessary.",
      question: String.raw`(x+2)^2-(x+2)(3-2x)=-4`,
      fields: ["x₁", "x₂"],
      answers: [-1, -2 / 3],
      solution: String.raw`\begin{aligned}
(x+2)^2-(x+2)(3-2x)&=-4\\
x^2+4x+4-(-2x^2-x+6)&=-4\\
3x^2+5x-2&=-4\\
3x^2+5x+2&=0\\
(3x+2)(x+1)&=0\\
x&=-\frac23\quad\text{or}\quad x=-1
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 5",
      instruction: "Solve the root equation.",
      question: String.raw`\sqrt{x+10}=x-2`,
      fields: ["x"],
      answers: [6],
      solution: String.raw`\begin{aligned}
\sqrt{x+10}&=x-2\\
x+10&=(x-2)^2\\
x+10&=x^2-4x+4\\
0&=x^2-5x-6\\
0&=(x-6)(x+1)\\
x&=6
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 6",
      instruction: "Solve the power equation.",
      question: String.raw`3^{x+1}=81`,
      fields: ["x"],
      answers: [3],
      solution: String.raw`\begin{aligned}
3^{x+1}&=81\\
3^{x+1}&=3^4\\
x+1&=4\\
x&=3
\end{aligned}`,
    },
  ],
},
{
  id: "version-7",
  title: "Version 7",
  description: "Advanced mixed algebra practice.",
  exercises: [
    {
      type: "system",
      title: "Question 1",
      instruction: "Solve the system.",
      question: String.raw`\begin{aligned}2x - y &= 6 \\ 4x + 3y &= 7\end{aligned}`,
      fields: ["x", "y"],
      answers: [2.5, -1],
      solution: String.raw`\begin{aligned}
2x-y&=6\\
4x+3y&=7\\
y&=2x-6\\
4x+3(2x-6)&=7\\
10x-18&=7\\
10x&=25\\
x&=2.5\\
y&=2(2.5)-6=-1
\end{aligned}`,
    },
    {
      type: "system",
      title: "Question 2",
      instruction:
        "A teacher buys 20 items: rulers and erasers. A ruler costs 3 CHF and an eraser costs 1 CHF. The total cost is 44 CHF. Let x be the number of rulers and y the number of erasers.",
      question: String.raw`\begin{aligned}x + y &= 20 \\ 3x + y &= 44\end{aligned}`,
      fields: ["x", "y"],
      answers: [12, 8],
      solution: String.raw`\begin{aligned}
x+y&=20\\
3x+y&=44\\
2x&=24\\
x&=12\\
12+y&=20\\
y&=8
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 3",
      instruction: "Solve the quadratic equation.",
      question: String.raw`4x^2 - 13x + 3 = 0`,
      fields: ["x₁", "x₂"],
      answers: [3, 0.25],
      solution: String.raw`\begin{aligned}
4x^2-13x+3&=0\\
(4x-1)(x-3)&=0\\
x&=\frac14\quad\text{or}\quad x=3
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 4",
      instruction: "Expand first, then solve the quadratic equation.",
      question: String.raw`(x-5)(2x+5)+5x+8=(x+2)^2`,
      fields: ["x₁", "x₂"],
      answers: [-3, 7],
      solution: String.raw`\begin{aligned}
(x-5)(2x+5)+5x+8&=(x+2)^2\\
2x^2-5x-25+5x+8&=x^2+4x+4\\
2x^2-17&=x^2+4x+4\\
x^2-4x-21&=0\\
(x-7)(x+3)&=0\\
x&=7\quad\text{or}\quad x=-3
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 5",
      instruction: "Solve the root equation.",
      question: String.raw`\sqrt{5x+1}=x-1`,
      fields: ["x"],
      answers: [7],
      solution: String.raw`\begin{aligned}
\sqrt{5x+1}&=x-1\\
5x+1&=(x-1)^2\\
5x+1&=x^2-2x+1\\
0&=x^2-7x\\
0&=x(x-7)\\
x&=7
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 6",
      instruction: "Solve the power equation.",
      question: String.raw`5^{2x-1}=125`,
      fields: ["x"],
      answers: [2],
      solution: String.raw`\begin{aligned}
5^{2x-1}&=125\\
5^{2x-1}&=5^3\\
2x-1&=3\\
2x&=4\\
x&=2
\end{aligned}`,
    },
  ],
},
{
  id: "version-8",
  title: "Version 8",
  description: "Most challenging mixed algebra practice.",
  exercises: [
    {
      type: "system",
      title: "Question 1",
      instruction: "Solve the system.",
      question: String.raw`\begin{aligned}3x + 2y &= 5 \\ x + y &= 3\end{aligned}`,
      fields: ["x", "y"],
      answers: [-1, 4],
      solution: String.raw`\begin{aligned}
3x+2y&=5\\
x+y&=3\\
2x+2y&=6\\
x&=-1\\
-1+y&=3\\
y&=4
\end{aligned}`,
    },
    {
      type: "system",
      title: "Question 2",
      instruction:
        "A sports club has 30 members. There are adults and juniors. Each adult pays 3 CHF and each junior pays 2 CHF. Altogether they pay 70 CHF. Let x be the number of adults and y the number of juniors.",
      question: String.raw`\begin{aligned}x + y &= 30 \\ 3x + 2y &= 70\end{aligned}`,
      fields: ["x", "y"],
      answers: [10, 20],
      solution: String.raw`\begin{aligned}
x+y&=30\\
3x+2y&=70\\
2x+2y&=60\\
x&=10\\
10+y&=30\\
y&=20
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 3",
      instruction: "Solve the quadratic equation.",
      question: String.raw`2x^2 + x - 15 = 0`,
      fields: ["x₁", "x₂"],
      answers: [2.5, -3],
      solution: String.raw`\begin{aligned}
2x^2+x-15&=0\\
(2x-5)(x+3)&=0\\
x&=\frac52\quad\text{or}\quad x=-3
\end{aligned}`,
    },
    {
      type: "multi",
      title: "Question 4",
      instruction: "Expand first, then solve the quadratic equation.",
      question: String.raw`(x-4)^2+(x-2)(x+6)=7x+10`,
      fields: ["x₁", "x₂"],
      answers: [-0.5, 6],
      solution: String.raw`\begin{aligned}
(x-4)^2+(x-2)(x+6)&=7x+10\\
x^2-8x+16+x^2+4x-12&=7x+10\\
2x^2-4x+4&=7x+10\\
2x^2-11x-6&=0\\
(2x+1)(x-6)&=0\\
x&=-\frac12\quad\text{or}\quad x=6
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 5",
      instruction: "Solve the root equation.",
      question: String.raw`\sqrt{x^2+2x+10}=x+4`,
      fields: ["x"],
      answers: [-1],
      solution: String.raw`\begin{aligned}
\sqrt{x^2+2x+10}&=x+4\\
x^2+2x+10&=(x+4)^2\\
x^2+2x+10&=x^2+8x+16\\
-6x&=6\\
x&=-1
\end{aligned}`,
    },
    {
      type: "single",
      title: "Question 6",
      instruction: "Solve the power equation.",
      question: String.raw`2^{3x-1}=32`,
      fields: ["x"],
      answers: [2],
      solution: String.raw`\begin{aligned}
2^{3x-1}&=32\\
2^{3x-1}&=2^5\\
3x-1&=5\\
3x&=6\\
x&=2
\end{aligned}`,
    },
  ],
},
];