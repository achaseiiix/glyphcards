
const MAX_QUESTIONS = 5;
const GEM_TAP_RATE = 16;
let questionNum;
let yellowYolks;
let multiplier;
let gems;
let avgSpeed;

function restart() {
    questionNum = 0;
    yellowYolks = 0;
    multiplier = 1;
    gems = 0;
    avgSpeed = 900;
    refreshText();
}

function refreshText() {
    let promptText;
    let promptBox = document.getElementById("promptBox");
    let responseInput = document.getElementById("response");

    switch (questionNum) {
        case 0:
            promptText = "How many yellow yolks do you already have for the egg?";
            break;
        case 1:
            yellowYolks = getInput(responseInput);
            promptText = "What multiplier is the egg boosted at?";

            break;
        case 2:
            multiplier = getInput(responseInput);
            promptText = "How many gems do you already have (red + blue)?";
            break;
        case 3:
            gems = getInput(responseInput);
            promptText = "What is your average tap speed per minute?";
            break;
        case 4:
            avgSpeed = getInput(responseInput);
            gemsAway = (1000 - yellowYolks) * 100 / multiplier - gems;
            tapsAway = gemsAway * GEM_TAP_RATE;
            timeAway = tapsAway / avgSpeed;
            formattedTime = convertMinutesToString(timeAway);
            promptText = `You are ${gemsAway.toLocaleString()} gems away. This should take ${tapsAway.toLocaleString()} taps or ${formattedTime}.`
            break;
        case 6:
            restart()
            break;
    }

    promptBox.textContent = promptText;
}

function convertMinutesToString(minutes) {
    // Calculate hours and remaining minutes
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = Math.round(minutes % 60);
  
    // Build the string
    var result = hours + " hours " + remainingMinutes + " minutes";
  
    return result;
  }

function getInput(inputBox) {
    result = inputBox.value;
    inputBox.value = '';
    return result;
}

function next() {
    questionNum += 1;

    refreshText();
}

restart()