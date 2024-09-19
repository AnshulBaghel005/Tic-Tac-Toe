const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winnigPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function intiGame() {
  // by default player
  currentPlayer = "X";
  //starting me all div empty honge
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box,index)=> {
  box.innerText="";
  boxes[index].style.pointerEvents="all";
  box.classList=`box box${index+1}`;
  });
  //new game ko hide karne ka liye kiya hai
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

intiGame();
function  checkGameOver()
{
    let answer="";
    winnigPosition.forEach((position)=>{
        if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
            && (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]]) )
        {
            if(gameGrid[position[0]==="X"])
                {
                    answer="X";
                }
                else{
                    answer="0";
                }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none"
            })
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

        }
        
    });

    if(answer!=="")
        {
           gameInfo.innerText=`Winner Player - ${answer}`;
           newGameBtn.classList.add("active");
           return; 
        }
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            {
                fillCount++; 
            }
    })

    if(fillCount==9)
        {
            gameInfo.innerText="Game Tied !";
            newGameBtn.classList.add("active");
        }
   
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "0";
   
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currentPlayer} `;
}



function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents="none";
   
    //swap kar do turn ko
    swapTurn();
    //check karo kahi jeet toh  nahi gya hai;
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  })
});

newGameBtn.addEventListener("click",intiGame)

