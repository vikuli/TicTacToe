const mainBox = document.querySelector(".main-box");
const box = document.getElementsByClassName("box");
const boxes = document.querySelectorAll(".box");
const overlay = document.querySelector(".overlay");
const resultWindow = document.querySelector(".result-window");
const winnerContent = document.querySelector(".winner-content");
const moveCount = document.querySelector(".move-count");
const button = document.querySelector(".button");
const rsschool = document.querySelector(".rsschool");
const overlayTable = document.querySelector(".overlay-table");
const resultTable = document.querySelector(".results-table");
const whoWinner = document.querySelectorAll(".who-winner");
const audio = document.querySelector('.audio')
let move = 0;
let result = "";
let arr = [];

mainBox.addEventListener("click", (e) => {
  if (move == 8) {
    if ((e.target = box)) {
      if (e.target.innerHTML == "") {
        e.target.innerHTML = "X";
        audio.play()
        move++;
        checkNobody();
      }
    }
  } else {
    if ((e.target = box)) {
      if (e.target.innerHTML == "") {
        move % 2 === 0
          ? (e.target.innerHTML = "X")
          : (e.target.innerHTML = "O");
          audio.play()
        move++;
        check();
      }
    }
  }
});

const check = () => {
  const arrWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < arrWin.length; i++) {
    if (
      box[arrWin[i][0]].innerHTML == "X" &&
      box[arrWin[i][1]].innerHTML == "X" &&
      box[arrWin[i][2]].innerHTML == "X"
    ) {
      result = "Tic";
      box[arrWin[i][0]].style.color = "red";
      box[arrWin[i][1]].style.color = "red";
      box[arrWin[i][2]].style.color = "red";
      prepareResult(result);
    } else if (
      box[arrWin[i][0]].innerHTML == "O" &&
      box[arrWin[i][1]].innerHTML == "O" &&
      box[arrWin[i][2]].innerHTML == "O"
    ) {
      result = "Tac";
      box[arrWin[i][0]].style.color = "red";
      box[arrWin[i][1]].style.color = "red";
      box[arrWin[i][2]].style.color = "red";
      prepareResult(result);
    }
  }
};

const checkNobody = () => {
  const arrWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < arrWin.length; i++) {
    if (
      box[arrWin[i][0]].innerHTML == "X" &&
      box[arrWin[i][1]].innerHTML == "X" &&
      box[arrWin[i][2]].innerHTML == "X"
    ) {
      result = "Tic";
      box[arrWin[i][0]].style.color = "red";
      box[arrWin[i][1]].style.color = "red";
      box[arrWin[i][2]].style.color = "red";
      prepareResult(result);
      break;
    } else if (i == arrWin.length - 1) {
      result = "Nobody";
      prepareResult(result);
    }
  }
};

const prepareResult = (winner) => {
  winnerContent.innerHTML = `${winner} win!`;
  moveCount.innerHTML = `Number of moves: ${move}`;
  overlay.style.top = "0";
  rsschool.style.opacity = "0.2";

  if (JSON.parse(localStorage.getItem("result")) != null) {
    if (JSON.parse(localStorage.getItem("result")).length > 9) {
      let a = JSON.parse(localStorage.getItem("result"));
      a.splice(0, 1);
      arr = a;
      arr.push(winner);
      localStorage.setItem("result", JSON.stringify(arr));
    } else {
      arr = JSON.parse(localStorage.getItem("result"));
      arr.push(winner);
      localStorage.setItem("result", JSON.stringify(arr));
    }
  } else {
    arr.push(winner);
    localStorage.setItem("result", JSON.stringify(arr));
  }
};

const closeOverlay = () => {
  rsschool.style.opacity = "1";
  overlay.style.top = "-100vw";
  location.reload();
};

button.addEventListener("click", closeOverlay);

const openCloseTable = () => {
  overlayTable.classList.toggle("overlay-table-open");
  resultTable.classList.toggle("results-table-open");
};

resultTable.addEventListener("click", openCloseTable);

whoWinner.forEach((element, index) => {
  if (
    JSON.parse(localStorage.getItem("result"))[index] != undefined &&
    JSON.parse(localStorage.getItem("result"))[index] != null
  ) {
    let i = index + 1;
    element.innerHTML = `${i}. ${
      JSON.parse(localStorage.getItem("result"))[index]
    } win!`;
  }
});
