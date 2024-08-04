let userScore = 0;
let compScore = 0;
let tiescore = 0;

const choices = document.querySelectorAll(".choice");
const winner = document.querySelector("#winner");
const win_mssg = document.querySelector("#win");
const mssg_container = document.querySelector(".mssg_container");
const user_score = document.querySelector("#user");
const comp_score = document.querySelector("#comp");
const tie_score = document.querySelector("#tie");
const reset_btn = document.querySelector("#reset_btn");
const reset = document.querySelector("#reset");
const userChoice_display = document.querySelector("#user_choice");
const compChoice_display = document.querySelector("#comp_choice");
let comp_choice = "";
const startGame = document.getElementById("Start");
const mssg = document.getElementById("mssg");

let userValue = "";

async function ListenSpeech() {
  return new Promise((resolve, reject) => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResult = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      userValue = event.results[0][0].transcript;
        resolve();
     
    };
    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.log("Error occured :", event.error);
      reject(event.error);
    };
  });
}

let uservalueLowercase;
if(userValue==="Rock."){
    uservalueLowercase="rock";
}
if (userValue==="Paper."){
    uservalueLowercase="paper"
}
if(userValue==="Scissor."){
    uservalueLowercase="scissor"
}

const checkValue =()=>{
    if (uservalueLowercase!=="rock" || uservalueLowercase!=="paper" || uservalueLowercase!=="scisor" ) {
        alert("please speak valid words");
      } else {
        console.log(userValue);
    }
}


const check = () => {
    console.log(uservalueLowercase);
  playgame(uservalueLowercase);
  reset.classList.remove("hide");
  resetbtn();
};

startGame.addEventListener("click", async function () {
  try {
    await ListenSpeech();
    checkValue();
    check();
  } catch (error) {}
});

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    let userChoice = choice.getAttribute("id");
    playgame(userChoice);
    reset.classList.remove("hide");
    resetbtn();
  });
});

const playgame = (userchoice) => {
  const compchoice = genCompChoice();
  if (userchoice === compchoice) {
    tiescore++;
    tie();
  } else {
    let userWin = true;
    if (userchoice === "rock") {
      if (compchoice === "paper") {
        userWin = false;
      } 
       else {
        userWin = true;
      }
    } else if (userchoice =="paper") {
      if (compchoice === "scissor") {
        userWin = false;
      } 
       else {
        userWin = true;
      }
    } else {
      if (compchoice === "rock") {
        userWin = false;
      }  else {
        userWin = true;
      }
    }
    showWinner(userWin);
  }
};

const resetbtn = () => {
  reset_btn.addEventListener("click", () => {
    winner.classList.add("hide");
    reset.classList.add("hide");
    mssg_container.classList.remove("hide");
    userScore = 0;
    compScore = 0;
    tiescore = 0;
    user_score.innerText = userScore;
    comp_score.innerText = compScore;
    tie_score.innerText = tiescore;
  });
};

const showWinner = (userwin) => {
  if (userwin) {
    userScore++;
    userWin1();
  } else {
    compScore++;
    compWin();
  }
};

const genCompChoice = () => {
  const option = ["rock", "paper", "scissor"];
  const reIdx = Math.floor(Math.random() * 3);
  comp_choice = option[reIdx];
  return option[reIdx];
};

const userWin1 = () => {
  mssg_container.classList.add("hide");
  winner.classList.remove("hide");
  win_mssg.classList.add("userwin");
  win_mssg.classList.remove("tie");
  win_mssg.classList.remove("compwin");
  user_score.innerText = userScore;
  win_mssg.innerText = "Congratulation You Won !!";
};
const compWin = () => {
  mssg_container.classList.add("hide");
  winner.classList.remove("hide");
  win_mssg.classList.add("compwin");
  win_mssg.classList.remove("userwin");
  win_mssg.classList.remove("tie");
  comp_score.innerText = compScore;
  win_mssg.innerText = "Oops Computer Won the game";
};
const tie = () => {
  mssg_container.classList.add("hide");
  win_mssg.classList.remove("userwin");
  win_mssg.classList.remove("compwin");
  winner.classList.remove("hide");
  win_mssg.classList.add("tie");
  win_mssg.innerText = "Tie game !!!";
  tie_score.innerText = tiescore;
};
