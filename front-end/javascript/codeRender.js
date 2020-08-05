export { renderAllContent };
import { fetchQuestion, fetchQuestions } from "./fetchQuestions.js";
import { questionGrabber } from "./gameLoop.js";

const walkieTalkie = new Audio("audio/walkie-talkie.mp3");

const renderAllContent = (question, turnCounter) => {
  renderWrongIframeContent(question);
  renderWholeErrorCode(question, turnCounter);
  renderCodeyStartingDialogue(question);
  renderGroundControlBeginning(question);
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
  });
  codeBlock.appendChild(beforeError);
  const errorCode = document.createElement("p");
  errorCode.classList.add("error--block");
  errorCode.classList.remove("highlight--corrected");
  errorCode.innerHTML = `${question.errorCode}`;
  errorCode.addEventListener("click", () => {
    updateAllDisplays(question, turnCounter);
    alert("you found bad code!");
  });
  codeBlock.appendChild(errorCode);
  const afterError = document.createElement("p");
  afterError.innerText = `${question.afterErrorCode}`;
  afterError.addEventListener("click", () => {
    renderGroundControlHint(question);
    walkieTalkie.play();
  });
  codeBlock.appendChild(afterError);
};

const updateAllDisplays = (question, turnCounter) => {
  renderGroundControlFinished(question, turnCounter);
  renderCorrectIFrameContent(question);
  renderCorrectCodeBlock(question);
  renderCodeyEndingDialogue(question);
};

const renderCorrectedError = (question) => {
  const codeTag = document.querySelector(".error--block");
  codeTag.classList.add("highlight--corrected");
  codeTag.innerHTML = `${question.correctedError}`;
};

const renderCorrectCodeBlock = (question) => {
  renderCorrectedError(question);
};
const renderCodeyEndingDialogue = (question) => {
  const pTag = document.querySelector(".codey-dialogue");
  pTag.innerHTML = "";
  const text = `${question.codeyEndingDialogue}`;
  let i = 0;
  typeWriter();
  function typeWriter() {
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
};
const renderCodeyStartingDialogue = (question) => {
  const pTag = document.querySelector(".codey-dialogue");
  pTag.innerHTML = "";
  const text = `${question.codeyStartingDialogue}`;
  let i = 0;
  typeWriter();
  function typeWriter() {
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
};

const renderGroundControlBeginning = (question) => {
  const pTag = document.querySelector(".ground-control-dialogue");
  pTag.innerHTML = "";
  const text = `${question.groundControlBeginningDialogue}`;
  let i = 0;
  typeWriter();
  function typeWriter() {
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
};

const renderGroundControlFinished = (question, turnCounter) => {
  const pTag = document.querySelector(".ground-control-dialogue");
  pTag.innerHTML = "";
  const text = `${question.groundControlCompletedDialogue}`;
  let i = 0;
  typeWriter();
  function typeWriter() {
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  const continueContainer = document.querySelector(".continue-button");
  const continueButton = document.createElement("button");
  continueButton.innerText = "continue";
  continueButton.addEventListener("click", () => {
    alert("Next Question!");
    console.log(turnCounter);
    continueContainer.firstChild.remove();
    questionGrabber();
  });
  continueContainer.prepend(continueButton);
};

const renderGroundControlHint = (question) => {
  const pTag = document.querySelector(".ground-control-dialogue");
  pTag.innerHTML = "";
  const text = `${question.hintText}`;
  let i = 0;
  typeWriter();
  function typeWriter() {
    if (i < text.length) {
      pTag.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
};
