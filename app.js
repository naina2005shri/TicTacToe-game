let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let newbtn = document.querySelector("#new-button");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");

let turnO = true;//playerX, playerO
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const resetGame = () => {
    turnO = true;
    count=0;
   enableBoxes();
    msgContainer.classList.add("hide");


};



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) { // player O ki turn h
            box.innerText = "O";
            box.style.color = "purple";
            turnO = false;
        }
        else { //player X ki turn h
            box.innerText = "X";
            box.style.color = "red";
            turnO = true;
        }

        box.disabled =true; //not  write the box again and again once fill it then it confirm it 
        count++;

        let isWinner = checkWinner();
        if(isWinner){

            return; //stop if someone won
        }
        //check for draw

        if(count === 9 && !isWinner){
            gameDraw();
        }
        
    });
});

const gameDraw =()=>{
    msg.innerText = "Game was a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
   
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }

};
const enableBoxes = () =>{
    for (let box of boxes){
        box.disabled= false;
        box.innerText = "";
        box.computedStyleMap.color = ""; // reset color too
    }

};




const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};
newbtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click" , resetGame);



