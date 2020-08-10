export { renderAllContent };
import { fetchQuestion, fetchQuestions } from "./fetchQuestions.js";
import { questionGrabber } from "./gameLoop.js";

const walkieTalkie = new Audio("audio/walkie-talkie.mp3");
const numberOfTries = document.querySelector(".score");
const totalNumberOfTries = document.querySelector(".total-score");

const renderAllContent = (question, turnCounter) => {
  renderWrongIframeContent(question);
  renderWholeErrorCode(question, turnCounter);
  renderCodeyStartingDialogue(question);
  renderGroundControlBeginning(question);
  codeyMoodShift("bored");
  developerTabClickable();
};
const renderWrongIframeContent = (question) => {
  const renderIFrameQuestion = document.querySelector(".iframe-display");
  renderIFrameQuestion.srcdoc = question.iframeWrong;
};

const renderCorrectIFrameContent = (question) => {
  const iframeDisplay = document.querySelector(".iframe-display");
  iframeDisplay.srcdoc = question.iframeCorrect;
};

const renderWholeErrorCode = (question, turnCounter) => {
  const codeBlock = document.querySelector(".question-code-block");
  while (codeBlock.firstChild) {
    codeBlock.firstChild.remove();
  }
  const beforeError = document.createElement("p");
  beforeError.innerText = `${question.beforeErrorCode}`;
  beforeError.addEventListener("click", () => {
    renderGroundControlHint(question);
    walkieTalkie.play();
    numberOfTries.innerHTML = Number(numberOfTries.innerHTML) + 1;
    totalNumberOfTries.innerHTML = Number(totalNumberOfTries.innerHTML) + 1;
  });
  codeBlock.appendChild(beforeError);
  const errorCode = document.createElement("p");
  errorCode.classList.add("error--block");
  errorCode.classList.remove("highlight--corrected");
  errorCode.innerHTML = `${question.errorCode}`;
  errorCode.addEventListener("click", () => {
    updateAllDisplays(question, turnCounter);
    numberOfTries.innerHTML = Number(numberOfTries.innerHTML) + 1;
    totalNumberOfTries.innerHTML = Number(totalNumberOfTries.innerHTML) + 1;
  });
  codeBlock.appendChild(errorCode);
  const afterError = document.createElement("p");
  afterError.innerText = `${question.afterErrorCode}`;
  afterError.addEventListener("click", () => {
    renderGroundControlHint(question);
    walkieTalkie.play();
    numberOfTries.innerHTML = Number(numberOfTries.innerHTML) + 1;
    totalNumberOfTries.innerHTML = Number(totalNumberOfTries.innerHTML) + 1;
  });
  codeBlock.appendChild(afterError);
  const fakeCode = document.querySelector(".overlay");
  fakeCode.innerHTML = `<pre>${question.beforeErrorCode}${question.errorCode}${question.afterErrorCode}</pre>`;
};

const updateAllDisplays = (question, turnCounter) => {
  renderGroundControlFinished(question, turnCounter);
  renderCorrectIFrameContent(question);
  renderCorrectCodeBlock(question);
  codeyMoodShift("surprised");
  renderCodeyEndingDialogue(question);
};

const renderCorrectedError = (question) => {
  const fakeCode = document.querySelector(".overlay");
  fakeCode.innerHTML = ``;
  fakeCode.innerHTML = `<pre>${question.beforeErrorCode}${question.correctedError}${question.afterErrorCode}</pre>`;
  const codeTag = document.querySelector(".error--block");
  codeTag.classList.add("highlight--corrected");
  codeTag.innerHTML = `${question.correctedError}`;
  codeTag.removeEventListener("click", () => {
    updateAllDisplays(question, turnCounter);
  });
};

const renderCorrectCodeBlock = (question) => {
  renderCorrectedError(question);
};

const renderCodeyEndingDialogue = (question) => {
  const pTag = document.querySelector(".codey-dialogue");
  // pTag.classList.add("typewriter-text");
  pTag.innerHTML = "";
  const text = `${question.codeyEndingDialogue}`;
  // pTag.innerHTML = text;
  let i = 0;
  typeWriter();
  function typeWriter() {
    on();
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
    if (i == text.length) {
      off();
    }
  }
};

const renderCodeyStartingDialogue = (question) => {
  const pTag = document.querySelector(".codey-dialogue");
  // pTag.classList.add("typewriter-text");
  pTag.innerHTML = "";
  const text = `${question.codeyStartingDialogue}`;
  // pTag.innerHTML = text;
  let i = 0;
  typeWriter();
  function typeWriter() {
    on();
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
    if (i == text.length) {
      off();
    }
  }
};

const renderGroundControlBeginning = (question) => {
  const pTag = document.querySelector(".ground-control-dialogue");
  pTag.innerHTML = "";
  const text = `${question.groundControlBeginningDialogue}`;
  // pTag.innerHTML = text;
  let i = 0;
  typeWriter();
  on();
  function typeWriter() {
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
  }
  if (i == text.length) {
    off();
  }
};

const renderGroundControlFinished = (question, turnCounter) => {
  const pTag = document.querySelector(".ground-control-dialogue");
  pTag.innerHTML = "";
  const text = `${question.groundControlCompletedDialogue}`;
  // pTag.innerHTML = text;
  let i = 0;
  typeWriter();
  function typeWriter() {
    on();
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
    if (i == text.length) {
      continueContainer.prepend(continueButton);
    }
    if (i == text.length) {
      off();
    }
  }
  const continueContainer = document.querySelector(".continue-button");
  const continueButton = document.createElement("button");
  continueButton.innerText = "Continue";
  continueButton.addEventListener("click", () => {
    numberOfTries.firstChild.remove();
    continueContainer.firstChild.remove();
    questionGrabber();
  });
};

const renderGroundControlHint = (question) => {
  const pTag = document.querySelector(".ground-control-dialogue");
  pTag.innerHTML = "";
  const text = `${question.hintText}`;
  let i = 0;
  typeWriter();
  function typeWriter() {
    on();
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }

    if (i == text.length) {
      off();
    }
  }
};

const developerTabClickable = () => {
  const sTag = document.querySelector(".developer-tab");
  sTag.innerText = `Developers`;
  const gTab = document.querySelector(".game-tab");
  gTab.innerText = `Codeys Game`;
  sTag.addEventListener("click", () => {
    renderDeveloperTab();
  });
};

const renderDeveloperTab = () => {
  const modal = document.getElementById("developer-modal");
  modal.style.display = "block";
  const sTag = document.getElementsByClassName("close-modal")[0];
  sTag.onclick = () => {
    modal.style.display = "none";
  };
};

const codeyMoodShift = (mood) => {
  const codeyImg = document.querySelector(".clippy-img");
  if (mood === "bored") {
    codeyImg.src = "./images/codeyboredloop1darker.gif";
  } else if (mood === "surprised") {
    codeyImg.src = "./images/codeysurprised1darker.gif";
  }
};

function on() {
  const overlay = document.querySelector(".overlay");
  const wholeCode = document.querySelector(".whole-code");
  wholeCode.style.display = "none";
  overlay.style.display = "block";
  overlay.style.zIndex = "2";
  console.log("ON");
}

function off() {
  const overlay = document.querySelector(".overlay");
  const wholeCode = document.querySelector(".whole-code");
  wholeCode.style.display = "block";
  overlay.style.zIndex = "-1";
  overlay.style.display = "none";
  console.log("OFF");
}
