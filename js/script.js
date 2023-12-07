const questions = [
    {
        question: 'Complete a frase: "___ patinhos foram passear"',
        answers: [
            {text: "Xuxa", correct: false},
            {text: "Cinco", correct: true},
            {text: "Três", correct: false},
            {text: "Dezenove", correct: false},
        ]
    },
    {
        question: "O que significa BC ?",
        answers: [
            {text: "Bambu Chileno", correct: false},
            {text: "Banco Central", correct: false},
            {text: "Before Christ", correct: false},
            {text: "Braço Curto", correct: true},
        ]
    },
    {
        question: "Tumbalacatumba tumba tá, quando o relógio bate à uma: ",
        answers: [
            {text: "Todas as caveiras jogam xadrez", correct: false},
            {text: "Todas as caveiras imitam chinês", correct: false},
            {text: "Todas as caveiras saem da tumba", correct: true},
            {text: "Todas as caveiras comem biscoito", correct: false},
        ]
    },
    {
        question: "Qual desses não é um personagem da biblia",
        answers: [
            {text: "João", correct: false},
            {text: "Compré", correct: true},
            {text: "Jesus", correct: false},
            {text: "Lasaro", correct: false},
        ]
    },
    {
        question: "Quantas saias de filó a barata tem?",
        answers: [
            {text: "Sete", correct: false},
            {text: "Quarenta", correct: false},
            {text: "Uma só", correct: true},
            {text: "Nenhuma", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Sua pontuação é ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Jogue outra vez!";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();