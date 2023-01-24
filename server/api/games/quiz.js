import fetch from "node-fetch"
import { showError } from '../../utils.js';

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

async function getQuiz(req, res) {
  try {
    let resf = await fetch("https://the-trivia-api.com/api/questions?tags=animals");
    let data = await resf.json();
    let correct = data[0].correctAnswer;
    let answers = data[0].incorrectAnswers;
    answers.push(correct);
    shuffle(answers);
    let question = data[0].question;
    data = { question, answers, correct }
    res.json({ success: true, data });
  } catch (e) {
    showError(res);
  }
}

export default { getQuiz };


