// define variables
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const x_div = document.getElementById("x");
const o_div = document.getElementById("o");


// click function
x_div.addEventListener('click', function() {
        console.log("x");
})
o_div.addEventListener('click', function () {
    console.log("o");
})