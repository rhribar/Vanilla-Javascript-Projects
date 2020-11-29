const quizData = [
    {
        question: 'How old is Rok?',
        a: '10',
        b: '21',
        c: '26',
        d: '110',
        correct: 'b'
    }, {
        question: 'What is the most used programming language in 2019?',
        a: 'Java',
        b: 'C',
        c: 'JavaScript',
        d: 'Python',
        correct: 'c'
    }, {
        question: 'Who is the president of US?',
        a: 'Killary Clinton',
        b: 'Sleepy Joe',
        c: 'Orange Don',
        d: 'Tom "Glasses" Kirkman',
        correct: 'b'
    }, {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Helicopters Terminals Motorboats Lambos",
        d: "Hillary Tallary Mallary Larraly",
        correct: 'a'
    }
]

/*
question: 'How would you like Premium to help?',
        a: 'To job search with confidence and get hired.',
        b: 'To grow my network or manage my reputation.',
        c: 'To find leads more effectively.',
        d: 'To find and hire talent faster.',
        correct:
*/
const answersEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById('question');
const quiz = document.getElementById("quiz");
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;

    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {

    let answer = undefined;

    answersEls.forEach((answerEl) => {
        if(answerEl.checked) {
            answer =  answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answersEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    console.log(answer);
    if(answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
            <h2> You answered correctly ${score}/${quizData.length} questions. </h2> 
            <button onclick = "location.reload()">Reload</button>`;
        }
    } 
})