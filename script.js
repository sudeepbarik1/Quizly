const questions = [
  { category: 'GEOGRAPHY', question: 'Which is the largest ocean on Earth?', answers: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'], correct: 2 },
  { category: 'SCIENCE', question: 'What is the chemical symbol for gold?', answers: ['Go', 'Gd', 'Au', 'Ag'], correct: 2 },
  { category: 'HISTORY', question: 'Which ancient civilization built Machu Picchu?', answers: ['Maya', 'Inca', 'Roman', 'Egyptian'], correct: 1 },
  { category: 'NATURE', question: 'What is the fastest land animal?', answers: ['Peregrine falcon', 'Cheetah', 'Lion', 'Pronghorn'], correct: 1 },
  { category: 'ARTS', question: 'Who painted the Mona Lisa?', answers: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Leonardo da Vinci'], correct: 3 },
  { category: 'SPACE', question: 'What is the largest planet in our solar system?', answers: ['Saturn', 'Jupiter', 'Neptune', 'Earth'], correct: 1 },
  { category: 'LITERATURE', question: 'Who wrote the play Romeo and Juliet?', answers: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Oscar Wilde'], correct: 1 },
  { category: 'FOOD', question: 'Sushi originated in which country?', answers: ['China', 'Thailand', 'Japan', 'South Korea'], correct: 2 },
  { category: 'TECHNOLOGY', question: 'What does “WWW” stand for?', answers: ['World Wide Web', 'Web World Wide', 'World Web Wire', 'Wide World Web'], correct: 0 },
  { category: 'SPORT', question: 'How many players are on a football (soccer) team on the field?', answers: ['9', '10', '11', '12'], correct: 2 }
];

const welcome = document.querySelector('#welcome-screen');
const quiz = document.querySelector('#quiz-screen');
const results = document.querySelector('#results-screen');
const category = document.querySelector('#category');
const questionText = document.querySelector('#question-text');
const answerList = document.querySelector('#answer-list');
const count = document.querySelector('#question-count');
const scoreDisplay = document.querySelector('#score-display');
const progress = document.querySelector('#progress-bar');
const feedback = document.querySelector('#feedback');
const next = document.querySelector('#next-button');
let current = 0, score = 0, answered = false;

function show(screen) { [welcome, quiz, results].forEach(s => s.classList.add('hidden')); screen.classList.remove('hidden'); }
function renderQuestion() {
  const item = questions[current]; answered = false;
  category.textContent = item.category; questionText.textContent = item.question;
  count.textContent = `Question ${current + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`; progress.style.width = `${((current + 1) / questions.length) * 100}%`;
  feedback.textContent = ''; feedback.className = 'feedback'; next.classList.add('hidden'); answerList.innerHTML = '';
  item.answers.forEach((answer, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'answer';
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${answer}</span>`;
    button.addEventListener('click', () => choose(index)); answerList.appendChild(button);
  });
}
function choose(index) {
  if (answered) return; answered = true;
  const item = questions[current], buttons = [...answerList.children];
  buttons.forEach(button => button.disabled = true); buttons[item.correct].classList.add('correct');
  if (index === item.correct) { score++; scoreDisplay.textContent = `Score: ${score}`; feedback.textContent = 'Correct — great job!'; feedback.classList.add('success'); }
  else { buttons[index].classList.add('wrong'); feedback.textContent = `Not quite. The answer is ${item.answers[item.correct]}.`; feedback.classList.add('error'); }
  next.textContent = current === questions.length - 1 ? 'See my results →' : 'Next question →'; next.classList.remove('hidden');
}
function finish() {
  const titles = score === 10 ? 'Perfect score!' : score >= 7 ? 'Nicely done!' : score >= 4 ? 'Good effort!' : 'Keep exploring!';
  document.querySelector('#result-title').textContent = titles; document.querySelector('#result-summary').textContent = `You got ${score} out of ${questions.length} right.`; document.querySelector('#final-score').textContent = score; show(results);
}
function start() { current = 0; score = 0; show(quiz); renderQuestion(); }
document.querySelector('#start-button').addEventListener('click', start);
document.querySelector('#play-again-button').addEventListener('click', start);
document.querySelector('#restart-top').addEventListener('click', start);
next.addEventListener('click', () => { current === questions.length - 1 ? finish() : (current++, renderQuestion()); });
