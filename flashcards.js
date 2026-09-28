let flashcards = [

];

let currentIndex = 0;
let showingAnswer = false;

const cardQuestion = document.getElementById('card-question');
const cardAnswer = document.getElementById('card-answer');
const flashcardBox = document.getElementById('flashcard');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const flipBtn = document.getElementById('flip-btn');
const addCardBtn = document.querySelector('.add-card-btn');

function displayCard() {
    if (flashcards.length === 0) {
        cardQuestion.textContent = "No flashcards available. Add one!";
        cardAnswer.textContent = "";
        return;
    }

    showingAnswer = false;
    cardQuestion.style.display = "block";
    cardAnswer.style.display = "none";

    cardQuestion.textContent = flashcards[currentIndex].question;
    cardAnswer.textContent = flashcards[currentIndex].answer;
}


nextBtn.addEventListener('click', () => {
    if (flashcards.length === 0) return;
    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard();
});

prevBtn.addEventListener('click', () => {
    if (flashcards.length === 0) return;
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayCard();
});

flipBtn.addEventListener('click', flipCard);
flashcardBox.addEventListener('click', flipCard);

addCardBtn.addEventListener('click', () => {
    const q = prompt("Enter the question:");
    if (!q || q.trim() === "") return;

    const a = prompt("Enter the answer:");
    if (!a || a.trim() === "") return;

    flashcards.push({ question: q, answer: a });
    currentIndex = flashcards.length - 1;
    displayCard();
});

displayCard();
const menuContainer = document.querySelector('.card-menu-container');
const optionsBtn = document.querySelector('.card-options-btn');
const editQBtn = document.querySelector('.edit-q-btn');
const editABtn = document.querySelector('.edit-a-btn');
const deleteCardBtn = document.querySelector('.delete-card-btn');

function displayCard() {
    if (flashcards.length === 0) {
        cardQuestion.textContent = "No flashcards available. Add one!";
        cardAnswer.textContent = "";
        return;
    }

    showingAnswer = false;
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');

    if (cardFront) cardFront.style.display = "block";
    if (cardBack) cardBack.style.display = "none";

    cardQuestion.textContent = flashcards[currentIndex].question;
    cardAnswer.textContent = flashcards[currentIndex].answer;
}

function flipCard() {
    if (flashcards.length === 0) return;

    showingAnswer = !showingAnswer;
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');

    if (showingAnswer) {
        if (cardFront) cardFront.style.display = "none";
        if (cardBack) cardBack.style.display = "block";
    } else {
        if (cardFront) cardFront.style.display = "block";
        if (cardBack) cardBack.style.display = "none";
    }
}


if (optionsBtn) {
    optionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menuContainer.classList.toggle('active');
    });
}

window.addEventListener('click', () => {
    if (menuContainer) {
        menuContainer.classList.remove('active');
    }
});
if (editQBtn) {
    editQBtn.addEventListener('click', () => {
        if (flashcards.length === 0) return;
        const newQ = prompt("Edit question:", flashcards[currentIndex].question);
        if (newQ && newQ.trim() !== "") {
            flashcards[currentIndex].question = newQ;
            displayCard();
        }
    });
}


if (editABtn) {
    editABtn.addEventListener('click', () => {
        if (flashcards.length === 0) return;
        const newA = prompt("Edit answer:", flashcards[currentIndex].answer);
        if (newA && newA.trim() !== "") {
            flashcards[currentIndex].answer = newA;
            displayCard();
        }
    });
}
if (deleteCardBtn) {
    deleteCardBtn.addEventListener('click', () => {
        if (flashcards.length === 0) return;
        flashcards.splice(currentIndex, 1);
        if (currentIndex >= flashcards.length && currentIndex > 0) {
            currentIndex--;
        }
        displayCard();
    });
}
