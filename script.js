const questionList = document.getElementById('questionList');
const askQuestionForm = document.getElementById('askQuestionForm');
const titleInput = document.getElementById('title');
const questionInput = document.getElementById('question');
const responseSection = document.getElementById('responseSection');
const selectedQuestionTitle = document.getElementById('selectedQuestionTitle');
const selectedQuestionBody = document.getElementById('selectedQuestionBody');
const responseForm = document.getElementById('responseForm');
const responderNameInput = document.getElementById('responderName');
const commentInput = document.getElementById('comment');
const responseList = document.getElementById('responseList');
const resolveBtn = document.getElementById('resolveBtn');

let questions = [];

// Submit question form
askQuestionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const question = questionInput.value.trim();

    if (title && question) {
        const newQuestion = {
            id: Date.now(),
            title,
            question,
            responses: [],
            resolved: false
        };

        questions.push(newQuestion);
        renderQuestions();
        askQuestionForm.reset();
    }
});

// Render questions in the left pane
function renderQuestions() {
    questionList.innerHTML = '';
    questions.forEach((q) => {
        const li = document.createElement('li');
        li.textContent = q.title;
        li.addEventListener('click', () => displayQuestion(q.id));
        questionList.appendChild(li);
    });
}

// Display question and responses in the right pane
function displayQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);

    if (question) {
        selectedQuestionTitle.textContent = question.title;
        selectedQuestionBody.textContent = question.question;
        responseList.innerHTML = '';

        question.responses.forEach(res => {
            const li = document.createElement('li');
            li.textContent = `${res.name}: ${res.comment}`;
            responseList.appendChild(li);
        });

        responseSection.style.display = 'block';
        document.getElementById('questionForm').style.display = 'none';

        responseForm.onsubmit = (e) => {
            e.preventDefault();
            const name = responderNameInput.value.trim();
            const comment = commentInput.value.trim();

            if (name && comment) {
                question.responses.push({ name, comment });
                renderResponses(question);
                responseForm.reset();
            }
        };

        resolveBtn.onclick = () => resolveQuestion(questionId);
    }
}

// Render responses for a particular question
function renderResponses(question) {
    responseList.innerHTML = '';
    question.responses.forEach((res) => {
        const li = document.createElement('li');
        li.textContent = `${res.name}: ${res.comment}`;
        responseList.appendChild(li);
    });
}

// Resolve a question
function resolveQuestion(questionId) {
    questions = questions.filter(q => q.id !== questionId);
    renderQuestions();
    responseSection.style.display = 'none';
    document.getElementById('questionForm').style.display = 'block';
}
