const lettersContainer = document.querySelector(".letters");
const wrongLettersEl = document.querySelector(".wrong-letters");
const notification = document.querySelector(".notification");
const wonNoti = document.querySelector(".won");
const looseNoti = document.querySelector(".loose");
const manParts = document.querySelectorAll(".man--part");
const btnAgains = document.querySelectorAll(".btn--again");

const dataWords = ["hello", "world", "programming", "apple"];
const selectedWord = dataWords[Math.round(Math.random() * 3)];
const correctLetters = [];
const wrongLetters = [];

let currentKey;

function renderLetters() {
	lettersContainer.innerHTML = selectedWord
		.split("")
		.map((letter) => {
			return `<div class="letter">${correctLetters.includes(letter) ? letter : " "}</div>`;
		})
		.join("\n");
}

function renderWrongLetters() {
	wrongLettersEl.innerText = wrongLetters.join(",");
}

function checkPressTwice(keyCode) {
	if (currentKey === keyCode) {
		notification.classList.add("show");
		setTimeout(() => {
			notification.classList.remove("show");
		}, 1000);
	}
}

function drawHangman() {
	manParts[wrongLetters.length - 1].style.display = "block";
}

window.addEventListener("keydown", function (e) {
	// prevent user press number
	if ((+e.key >= 0 && +e.key <= 9) || e.keyCode < 65 || e.keyCode > 90) return;
	const keyPress = e.key;
	//check if user press that key twice
	checkPressTwice(keyPress);
	currentKey = keyPress;
	//if the letter is correct
	if (selectedWord.includes(keyPress)) {
		correctLetters.push(keyPress);
		renderLetters();
	}
	//press the wrong one
	else if (!wrongLetters.includes(keyPress)) {
		wrongLetters.push(keyPress);
		renderWrongLetters();
		drawHangman();
		if (wrongLetters.length === 7) {
			looseNoti.style.display = "block";
		}
	}
	//check if user won
	if (lettersContainer.innerText.replace(/\n/g, "").length === selectedWord.length) {
		wonNoti.style.display = "block";
	}
});

btnAgains.forEach((btn) => {
	btn.addEventListener("click", function () {
		location.reload();
	});
});
renderLetters();
