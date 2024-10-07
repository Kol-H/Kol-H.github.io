//sleep function
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

//get necessary elements
var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");
var computerChoice = document.getElementById("computer-choice");
var results = document.getElementById("play-results");
var play = document.getElementById("play");
var reset = document.getElementById("reset");
var scores = document.getElementById("scores");

// scores, throws & "thinking" vars
var userThrow, computerThrow;
var wins = 0, losses = 0, ties = 0;
const thinkTime = 3000, thinkInterval = 500;


play.addEventListener("click", newGame);
reset.addEventListener("click", resetPage);


/* set/reset playspace */ 
function newGame() {
    //unset all throws & images
    rock.style["outline"] = "none";
    paper.style["outline"] = "none";
    scissors.style["outline"] = "none";
    userThrow = "";

    computerThrow = "";
    computerChoice.src = "images/question-mark.PNG";

    results.textContent = "Results: ";
    play.style.display = "none";

    //add click event listeners to images
    rock.addEventListener("click", uThrow);
    paper.addEventListener("click", uThrow);
    scissors.addEventListener("click", uThrow);
}

/* user makes their choice */
function uThrow(event) { 
    //put choice into userThrow
    var choice = event.currentTarget;
    userThrow = choice.title;
    choice.style.outline = "3px solid blue";

    //make images unclickable
    rock.removeEventListener("click", uThrow);
    paper.removeEventListener("click", uThrow);
    scissors.removeEventListener("click", uThrow);

    cThink(thinkTime,thinkInterval);
}

/* computer "thinks:" shuffle between rock, paper, scissors */ 
async function cThink(thinkTime, thinkInterval) {
    const shuffleInterval = thinkInterval/3;

    for (var i = 0; i < thinkTime; i += thinkInterval) {
        computerChoice.src = "images/rock.PNG";
        await sleep(shuffleInterval);

        computerChoice.src = "images/paper.PNG";
        await sleep(shuffleInterval);

        computerChoice.src = "images/scissors.PNG";
        await sleep(shuffleInterval);
    }

    cThrow();
}

/* computer makes its choice */
function cThrow() {
    const c = Math.floor(Math.random() * 3) + 1;

    //get choice based on random num c
    switch (c) {
        case 1:
            computerThrow = "rock";
            computerChoice.src = "images/rock.PNG";
            break;
        case 2:
            computerThrow = "paper";
            computerChoice.src = "images/paper.PNG";
            break;
        case 3:
            computerThrow = "scissors";
            computerChoice.src = "images/scissors.PNG";
            break;
    }
    
    //print results and add to respective score count
    if (userThrow == computerThrow){
        results.textContent = "Results: It's a tie!";
        ties++;
    } else if ((userThrow == "rock" && computerThrow == "scissors") 
        ||  (userThrow == "paper" && computerThrow == "rock") 
        ||  (userThrow == "scissors" && computerThrow == "paper")) {
        results.textContent = "Results: You win!";
        wins++;
    } else {
        results.textContent = "Results: You lose.";
        losses++;
    }
    scores.innerHTML = "Total wins: " + wins + "<br>Total losses: " + losses + "<br>Total ties: " + ties;

    // play button reappears
    play.textContent = "Play again";
    play.style.display = "inherit";
}

/* reset page */
function resetPage() {
    location.reload();
}