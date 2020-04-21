function game() {
    const gameArea = document.getElementById('gameArea');

    gameArea.innerHTML = `<div class="jumbotron d-flex flex-column text-center justify-content-center">
<div id="msg"></div>
                    <p class="lead">Guess this word!</p>
                    <h1 class="display-4" id="mainWord">${gameStatus.scrambledWord}</h1>
                    <hr class="my-4">

                    <div class="d-flex flex-column justify-content-center p-4">
                        <div class="btn-group-vertical">
                            <input type="text" class="form-control btn-outline-light" placeholder="type here..." id="guessInput" autocapitalize="off" 
    autocomplete="off"
    spellcheck="false" 
    autocorrect="off">
                            <div class="btn-group">
                                <a class="btn btn-success btn-lg" onclick="guess()" id="guessBtn" role="button">Guess
                            <span id="guessLeft" class="badge badge-light">0</span>
                            </a>
                                <a class="btn btn-outline-warning btn-lg" onclick="skip()" id="skipBtn" role="button">Skip
                            <span id="skipLeft" class="badge badge-warning">0</span>
                            </a>
                            </div>

                            <div class="btn-group">
                                <a class="btn btn-outline-danger" id="endBtn" href="#" role="button">End
                            <span id="score" class="badge badge-light">0 Score</span>
                            </a>
                                <a class="btn btn-outline-primary" href="#" id="helpBtn" role="button">Help</a>
                            </div>
                        </div>
                    </div>
                </div>`;

    return start();
}


const defaultWords = ['Keen', 'Land', 'Lay', 'Limb', 'Maintain', 'Marsh', 'Mate', 'Migration', 'Movement', 'Names', 'Nature', 'Nest', 'Notice', 'Nuisance', 'Observation', 'Order', 'Ornithology', 'Peck', 'Perch', 'Pet', 'Photograph', 'Population', 'Predator', ' Professional', 'Quantity', 'Quest', 'Quick', 'Quiet', 'Range', 'Raptor', 'Rodent', 'Roost', 'Seasonal', 'Seeds', 'Sentinel', 'Shoot', 'Size', 'Soar', 'Song', 'Songbird', 'Speed', 'Squirrel', 'Streak', 'Survive', 'Tally', 'Talon', 'Tame', 'Temperature', 'Thermals', 'Track', 'Tree', 'Types', 'Universal', 'Vegetables', 'Vocal', 'Vulture', 'Wade', 'Watch', 'Water', 'Waterflow', 'Weather', 'Wild', 'Wildlife', 'Window', 'Wing', 'Wound']

const gameStatus = {
    active: false,
    passes: 0,
    strikes: 0,
    currentWord: null,
    gameWords: [],
    scores: 0,
    scrambledWord: "I am SCRAMBLE"
}

const guessBtn = document.getElementById('guessBtn');
const helpBtn = document.getElementById('helpBtn');
const skipBtn = document.getElementById('skipBtn');
const endBtn = document.getElementById('endBtn');
const guessInput = document.getElementById('guessInput');
const guessLeft = document.getElementById('guessLeft');
const skipLeft = document.getElementById('skipLeft');
const mainWord = document.getElementById('mainWord');
const score = document.getElementById('score');
const msg = document.getElementById('msg');


function shuffle(src) {
    const copy = [...src]

    const length = copy.length
    for (let i = 0; i < length; i++) {
        const x = copy[i]
        const y = Math.floor(Math.random() * length)
        const z = copy[y]
        copy[i] = z
        copy[y] = x
    }

    if (typeof src === 'string') {
        return copy.join('')
    }

    return copy
}


function start() {
    if (!gameStatus.active) {

        var msg = document.getElementById('msg');
        msg.innerHTML = `<div class="alert alert-success" role="alert">
                            Game Started! Good Luck!
                        </div>`;

        setTimeout(function () {
            msg.innerHTML = ``
        }, 3000);


        gameStatus.active = true;
        gameStatus.scores = 0;
        gameStatus.strikes = 3;
        gameStatus.passes = 2;
        var setUpWords = defaultWords.slice(0, 33);
        gameStatus.gameWords = shuffle(setUpWords);
        return scramble();

    } else {
        var msg = document.getElementById('msg');
        msg.innerHTML = `<div class="alert alert-danger" role="alert">
  Game already running!
</div>`

        setTimeout(function () {
            msg.innerHTML = ``
        }, 3000);


    }
}

function scramble() {
    if (gameStatus.gameWords.length > 0) {
        gameStatus.currentWord = gameStatus.gameWords[0];
        gameStatus.scrambledWord = shuffle(gameStatus.currentWord);

        const mainWord = document.getElementById('mainWord');
        mainWord.textContent = gameStatus.scrambledWord.toUpperCase();
    } else {

        return gameOver();


    }
}

function update() {
    const guessLeft = document.getElementById('guessLeft');
    const skipLeft = document.getElementById('skipLeft');
    const score = document.getElementById('score');

    guessLeft.textContent = gameStatus.strikes + ' Left';
    skipLeft.textContent = gameStatus.passes + ' Left';
    score.textContent = gameStatus.scores + ' Scores';
}

function guess() {
    const guessInput = document.getElementById('guessInput');
    if (gameStatus.active) {
        if (guessInput.value === "" || guessInput.value === null) {
            var msg = document.getElementById('msg');
            msg.innerHTML = `<div class="alert alert-danger" role="alert">
                            Please type something! click on help if you are stuck!
                        </div>`;


            setTimeout(function () {
                guessInput.value = ``;
            }, 100);

            setTimeout(function () {
                msg.innerHTML = ``;
            }, 3000);


        } else {
            if (gameStatus.strikes >= 0 && gameStatus.gameWords.length >= 1) {
                if (guessInput.value.toUpperCase() === gameStatus.currentWord.toUpperCase()) {
                    var msg = document.getElementById('msg');
                    msg.innerHTML = `<div class="alert alert-success" role="alert">
                            Good Job!
                        </div>`;
                    setTimeout(function () {
                        guessInput.value = ``;
                    }, 100);
                    setTimeout(function () {
                        msg.innerHTML = ``
                    }, 3000);
                    gameStatus.scores++;
                    gameStatus.gameWords.shift();
                    return scramble()
                } else {
                    var msg = document.getElementById('msg');
                    msg.innerHTML = `<div class="alert alert-danger" role="alert">
                            Wrong! Try Again...
                        </div>`;
                    gameStatus.strikes--;

                    setTimeout(function () {
                        guessInput.value = ``;
                    }, 100);
                }
            } else {
                return gameOver();
            }
        }
    } else {
        var msg = document.getElementById('msg');
        msg.innerHTML = `<div class="alert alert-danger" role="alert">
                            Start the Game firt!
                        </div>`;






        setTimeout(function () {
            msg.innerHTML = ``;
        }, 3000);




    }
}






setInterval(function () {
    if (gameStatus.active) {
        return update();
    }
}, 10);









function skip() {
    if (gameStatus.active) {
        if (gameStatus.passes >= 1 && gameStatus.gameWords.length >= 1) {
            var msg = document.getElementById('msg');
            msg.innerHTML = `<div class="alert alert-success" role="alert">
                            Skipped word!
                        </div>`;

            gameStatus.passes--;
            gameStatus.gameWords.shift();
            setTimeout(function () {
                msg.innerHTML = ``;
            }, 3000);

            return scramble()
        } else {
            var msg = document.getElementById('msg');
            msg.innerHTML = `<div class="alert alert-danger" role="alert">
                            Out of Passes!
                        </div>`;
        }
    } else {
        var msg = document.getElementById('msg');
        msg.innerHTML = `<div class="alert alert-danger" role="alert">
                            Start the Game firt!
                        </div>`;
        setTimeout(function () {
            msg.innerHTML = ``;
        }, 3000);
    }
}


function gameOver() {
    gameStatus.active == false;
    var msg = document.getElementById('msg');
    msg.innerHTML = `<div class="alert alert-danger" role="alert">
                            Game Over!<hr>
                        Your Final Score is ${gameStatus.scores}.<hr>
redirecting to Home page in 15 sec...
                        </div>`;

    gameStatus.active = false;
    gameStatus.scores = 0;
    gameStatus.strikes = 0;
    gameStatus.passes = 0;
    gameStatus.currentWord = null;
    gameStatus.scrambledWord = "I 'll be Scrambled"
    gameStatus.gameWords = []

    setTimeout(function () {
        window.open("index.html", "_self");
    }, 15000);
}
