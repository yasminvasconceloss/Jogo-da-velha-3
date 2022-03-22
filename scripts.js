/* Selecionar todas as divs (células) - All*/ 
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");
const restartButton2 = document.querySelector("[data-restart-buttono]");

let isCircleTurn;

/* combinacoes de vitoria */
const winningCombinations = [
  [0, 1, 2],  //horizontal//
  [3, 4, 5],  //horizontal//
  [6, 7, 8],  //horizontal//
  [0, 3, 6],               //vertical//
  [1, 4, 7],               //vertical//
  [2, 5, 8],               //vertical//
  [0, 4, 8],                         //diagonal//
  [2, 4, 6],                         //diagonal//
];

const startGame = () => {
  isCircleTurn = false;   //vez do x//

  for (const cell of cellElements) {
    cell.classList.remove("circle");  //limpa tudo ao clicar no botão de reiniciar//
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);   //reseta a aplicação//
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = alert("Empate!");
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? alert("O Venceu!")
      : alert("X Venceu!");
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {   //verificando se alguma combinação está preenchida com o CurrentPlayer//
    return combination.every((index) => {   //todas as combinações//
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {    //Checa se todas as células estão ocupadas - Empate//
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");  //se for a vez do circulo, adicionar o circulo//
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;   // vez do circulo//

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);


  // Verificar por empate
  const isDraw = checkForDraw();


  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {

    // Mudar símbolo
    swapTurns();   //mudar o turno// 
  }
};

startGame();
reiniciar.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);  //Reiniciar o jogo//



//Link de referência: https://www.youtube.com/watch?v=0EiX9c4vzRs&t=2s // 

