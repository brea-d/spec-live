let canvas;
let video;
let videoX;
let videoY;

// let addCommentButtonX;
// let addCommentButtonY;
// let resetButtonX;
// let resetButtonY;

let overlaySpanX;
let overlaySpanY;

let smileQuestionSpanX;
let smileQuestionSpanY;
let smileQuestionSpeechInputX;
let smileQuestionSpeechInputY;

let smileQuestionAnswersFieldHeaderX;
let smileQuestionAnswersFieldHeaderY;
let smileQuestionAnswersFieldX;
let smileQuestionAnswersFieldY;

let lastQuestionAnswerFieldHeaderX;
let lastQuestionAnswerFieldHeaderY;
let lastQuestionAnswerFieldX;
let lastQuestionAnswerFieldY;

let smileQuestionAnswersFieldCounter = 0;
let vibeState = false; // "false" means we start with bad vibes

let fadeSmileQuestionAnswersFieldInAndOutInterval;

let speechRec;

let initialQuestions = [
    {'question' : "What made you smile today?",
    'localStorageKey' : 'smileQuestionAnswers'},
    {'question' : "What did you think of when you woke up today?",
    'localStorageKey' : 'wakeUpQuestionAnswers'},
    {'question' : "What were you doing one year ago from this moment?",
    'localStorageKey' : 'yearAgoQuestionAnswers'},
    {'question' : "What are you looking forward to this week?",
    'localStorageKey' : 'forwardQuestionAnswers'},
    {'question' : "If you were in a room with your past and future self, what would you say? What would you say and what would they say?",
    'localStorageKey' : 'pastFutureQuestionAnswers'},
    {'question' : "Who did you look up to five years ago? Do you still look up to them now?",
    'localStorageKey' : 'roleModelQuestionAnswers'},
    {'question' : "What's the most difficult decision that you've had to make?",
    'localStorageKey' : 'decisionQuestionAnswers'},
    {'question' : "What's the most meaningful thing to you right now?",
    'localStorageKey' : 'meaningQuestionAnswers'},
    {'question' : "If you had three wishes, what would they be?",
    'localStorageKey' : 'wishesQuestionAnswers'},
    {'question' : "What does your own personal happy place look like?",
    'localStorageKey' : 'happyPlaceQuestionAnswers'},
    {'question' : "What would you do if you had no fear?",
    'localStorageKey' : 'fearQuestionAnswers'},
    {'question' : "If you could see your life from a third-person perspective, what would surprise you the most?",
    'localStorageKey' : 'thirdPersonQuestionAnswers'},
    {'question' : "If you could ask your future self one question, what would it be, and why?",
    'localStorageKey' : 'futureQuestionAnswers'},
    {'question' : "What's the silliest thing you've ever done to impress someone you liked, and did it work?",
    'localStorageKey' : 'impressQuestionAnswers'},
    {'question' : "If you could communicate with any species on Earth other than humans, which would you choose and why?",
    'localStorageKey' : 'speciesQuestionAnswers'}
]

let smileQuestionAnswers = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
let currentQuestionIndex = 0; // Keeps track of the current question index

function speechRecEnded() {
    console.log('speechRecEnded called');
}

function speechRecError() {
    console.log('speechRecError called');
}


function preload() {
    // Load the custom image
    customImage = loadImage('assets/bg-test-1.png');

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);


    // canvas.parent('sketch-holder');

    setupVideo();
    // setupCommentButton();
    // setupResetButton();

    // https://editor.p5js.org/dano/sketches/T-XASCOsa
    // https://idmnyu.github.io/p5.js-speech/#examples
    speechRec = new p5.SpeechRec('en-US');
    // "continous mode" can't keep web (browser-)speech API alive. So we're restarting it manually in "gotEnd()"
    speechRec.continuous = false;
    speechRec.onResult = gotSpeech;
    speechRec.onEnd = gotEnd;
    speechRec.start();

    setupOverlay();
    setupNextOverlay();
    setupSmileQuestionSpan();
    setupSmileQuestionSpeechInput();
    setupSmileQuestionAnswersFieldHeader();
    setupSmileQuestionAnswersField();
    setupLastQuestionAnswerFieldHeader();
    setupLastQuestionAnswerField();
}

//function draw() {
//    // localStorage.clear();
//    if (vibeState == true) {
//        goodVibes();
//    } else {
//        badVibes();
//
//    }
//
//    
//}

// function addAbsoluteText() {

//     var absoluteText = document.createElement('div');
    
//     absoluteText.textContent = 'Instructional Text Here';
    
//     absoluteText.style.position = 'absolute';
//     // positioning
//     absoluteText.style.top = 'windowWidth/2';
//     absoluteText.style.left = 'windowHeight/2';
    
//     document.body.appendChild(absoluteText);
// }

function draw() {
    if (vibeState == true) {
        goodVibes();
    } else {
        badVibes();
    }
}






// After answering what made one smile
function goodVibes() {

    // //remove canvas
    // noCanvas();

    background(customImage);

        canvas.class(''); // remove greyscale class

    // Remove canvas
    canvas.style.display = 'none';

    document.getElementById('nextOverlaySpan').style.display = 'block';
    document.getElementById('smileQuestionAnswersField').style.display = 'block';
    document.getElementById('smileQuestionAnswersFieldHeader').style.display = 'block';
    // document.getElementById('resetButton').style.display = 'block';
    document.getElementById('lastQuestionAnswerFieldHeader').style.display = 'block';
    document.getElementById('lastQuestionAnswerField').style.display = 'block';

    // document.getElementById('addCommentButton').style.display = 'none';
    document.getElementById('overlaySpan').style.display = 'none';
    document.getElementById('smileQuestionSpan').style.display = 'none';
    document.getElementById('smileQuestionSpeechInput').style.display = 'none';

  //mirror the video capture
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, videoX, videoY);
  pop();
}

// Before answering what made one smile - greyscale
function badVibes() {
    // initial bg grey color
    background(50);
    canvas.class('greyscale');


    // document.getElementById('addCommentButton').style.display = 'block';
    document.getElementById('overlaySpan').style.display = 'block';
    document.getElementById('smileQuestionSpan').style.display = 'block';
    document.getElementById('smileQuestionSpeechInput').style.display = 'block';

    document.getElementById('smileQuestionAnswersField').style.display = 'none';
    document.getElementById('nextOverlaySpan').style.display = 'none';
    document.getElementById('smileQuestionAnswersFieldHeader').style.display = 'none';
    document.getElementById('lastQuestionAnswerField').style.display = 'none';
    // document.getElementById('resetButton').style.display = 'none';
    document.getElementById('lastQuestionAnswerFieldHeader').style.display = 'none';

//mirror the video capture
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, videoX, videoY);
  pop();
    
}

//webcam

function setupVideo() {
    video = createCapture(VIDEO);
    video.size(windowWidth/2.5, windowHeight/2.5);
    // video.size(1000, 562);
    video.hide();

    videoX = (windowWidth - video.width) / 2;
    videoY = (windowHeight - video.height) / 2;
    

    
    // css to center video responsively
    video.style('position', 'absolute');
    video.style('left', '50%');
    video.style('top', '50%');
    video.style('transform', 'translate(-50%, -50%)');
}

function setupOverlay() {
    overlaySpan = createSpan("Stark speaking to answer the question below. <br> Say 'reset' to clear your answer, <br> and 'submit' to submit your answer.");
    overlaySpanX = (windowWidth - overlaySpan.width) / 2;
    overlaySpanY = videoY + video.height - 600; // Move the overlay above the video
    overlaySpan.position(overlaySpanX, overlaySpanY);
    overlaySpan.id('overlaySpan');
}

function setupNextOverlay() {
    nextOverlaySpan = createSpan("Say 'next' to move to the next question.");
    nextOverlaySpanX = (windowWidth - nextOverlaySpan.width) / 2;
    nextOverlaySpanY = videoY + video.height - 500; // Move the overlay above the video
    nextOverlaySpan.position(nextOverlaySpanX, nextOverlaySpanY);
    nextOverlaySpan.id('nextOverlaySpan');
}

function setupSmileQuestionSpan() {
    // Question - cycles through array
    smileQuestionSpan = createSpan(initialQuestions[currentQuestionIndex].question);
    smileQuestionSpanX = ((windowWidth - smileQuestionSpan.width) / 2) - 100;
    smileQuestionSpanY = videoY + video.height + 20; // 20 pixels below the video

    smileQuestionSpan.position(smileQuestionSpanX, smileQuestionSpanY);

    // align to middle
    smileQuestionSpan.style('display', 'block');
    smileQuestionSpan.style('margin', 'auto');
    smileQuestionSpan.id("smileQuestionSpan");
  }

  function updateSmileQuestionSpan() {
    smileQuestionSpan = document.getElementById('smileQuestionSpan');
    smileQuestionSpan.innerHTML = initialQuestions[currentQuestionIndex].question;
  }

function setupSmileQuestionSpeechInput() {
    // Answer input field next to question
    smileQuestionSpeechInput = createSpan("");
    smileQuestionSpeechInputX = smileQuestionSpanX + 40;
    smileQuestionSpeechInputY = smileQuestionSpanY + 100; // push it a bit lower
    smileQuestionSpeechInput.position(smileQuestionSpeechInputX, smileQuestionSpeechInputY);
    smileQuestionSpeechInput.id('smileQuestionSpeechInput');
    textAlign(CENTER);

}

function setupSmileQuestionAnswersFieldHeader() {
    smileQuestionAnswersFieldHeader = createSpan("Today's answers:")
    smileQuestionAnswersFieldHeaderX = smileQuestionSpanX - 70;
    smileQuestionAnswersFieldHeaderY = smileQuestionSpanY - 60;
    smileQuestionAnswersFieldHeader.position(smileQuestionAnswersFieldHeaderX, smileQuestionAnswersFieldHeaderY);
    smileQuestionAnswersFieldHeader.id('smileQuestionAnswersFieldHeader');
}

function setupSmileQuestionAnswersField() {
    // local storage - where the answers are stored
    // smileQuestionAnswers = JSON.parse(localStorage.getItem('smileQuestionAnswers')) || [];
    smileQuestionAnswersField = createSpan("");
    smileQuestionAnswersFieldX = smileQuestionAnswersFieldHeaderX + 1;
    smileQuestionAnswersFieldY = smileQuestionAnswersFieldHeaderY + 30;
    smileQuestionAnswersField.position(smileQuestionAnswersFieldX, smileQuestionAnswersFieldY);
    smileQuestionAnswersField.id('smileQuestionAnswersField');
}

function setupLastQuestionAnswerFieldHeader() {
    lastQuestionAnswerFieldHeader = createSpan("Your answer:")
    lastQuestionAnswerFieldHeaderX = smileQuestionAnswersFieldX;
    lastQuestionAnswerFieldHeaderY = smileQuestionAnswersFieldY + 50;
    lastQuestionAnswerFieldHeader.position(lastQuestionAnswerFieldHeaderX, lastQuestionAnswerFieldHeaderY);
    lastQuestionAnswerFieldHeader.id('lastQuestionAnswerFieldHeader');
}

function setupLastQuestionAnswerField() {
    lastQuestionAnswerField = createSpan("");
    lastQuestionAnswerFieldX = lastQuestionAnswerFieldHeaderX + 1;
    lastQuestionAnswerFieldY = lastQuestionAnswerFieldHeaderY + 30;
    lastQuestionAnswerField.position(lastQuestionAnswerFieldX, lastQuestionAnswerFieldY);
    lastQuestionAnswerField.id('lastQuestionAnswerField');
}

//test 

function addCommentHandler() {
    if (fadeSmileQuestionAnswersFieldInAndOutInterval) {
        clearInterval(fadeSmileQuestionAnswersFieldInAndOutInterval);
    }

    let smileQuestionAnswer = document.getElementById('smileQuestionSpeechInput').innerHTML.trim();
    if (smileQuestionAnswer === '') {
        alert('Please enter a comment');
        return;
    }

    document.getElementById('lastQuestionAnswerField').innerHTML = smileQuestionAnswer;

    toggleVibeState();

    document.getElementById('smileQuestionSpeechInput').innerHTML = "";

    // Add the new comment to the array
    // smileQuestionAnswers.push({ question: initialQuestions[currentQuestionIndex], answer: smileQuestionAnswer });
    // smileQuestionAnswers.push(smileQuestionAnswer);

    // console.log(smileQuestionAnswers[0]);
    // console.log(smileQuestionAnswers[0]);

    // console.log(smileQuestionAnswers[initialQuestions[currentQuestionIndex].localStorageKey]);

    // Save the updated comments back to local storage
    // localStorage.setItem('smileQuestionAnswers', JSON.stringify(smileQuestionAnswers));
    smileQuestionAnswers[currentQuestionIndex] = JSON.parse(localStorage.getItem(initialQuestions[currentQuestionIndex].localStorageKey)) || [];
    smileQuestionAnswers[currentQuestionIndex].push(smileQuestionAnswer);
    smileQuestionAnswers[currentQuestionIndex] = shuffle(smileQuestionAnswers[currentQuestionIndex]);
    localStorage.setItem(initialQuestions[currentQuestionIndex].localStorageKey, JSON.stringify(smileQuestionAnswers[currentQuestionIndex]));
    // localStorage.setItem(initialQuestions[currentQuestionIndex].localStorageKey, JSON.stringify(smileQuestionAnswers));

    if (smileQuestionAnswers[currentQuestionIndex].length >= 2) {
        fadeSmileQuestionAnswersFieldInAndOut();
        fadeSmileQuestionAnswersFieldInAndOutInterval = setInterval(fadeSmileQuestionAnswersFieldInAndOut, 5000);
    } else {
        showSingleAnswerInSmileQuestionAnswersField();
    }
}

function resetHandler() {
    toggleVibeState();
    currentQuestionIndex = (currentQuestionIndex + 1) % initialQuestions.length;
    let currentQuestion = initialQuestions[currentQuestionIndex];
    smileQuestionSpan.html(currentQuestion);
    showCorrespondingAnswer(currentQuestion);
}

function showCorrespondingAnswer(question) {
    let answer = smileQuestionAnswers.find(item => item.question === question);
    if (answer) {
        document.getElementById('lastQuestionAnswerField').innerHTML = answer.answer;
    } else {
        document.getElementById('lastQuestionAnswerField').innerHTML = "";
    }
}


//test

function toggleVibeState() {
    vibeState = (!vibeState);
}

// Call this function with "setInterval", e.g., "setInterval(fadeSmileQuestionAnswersFieldInAndOut, 5000);"
// after "setupSmileQuestionAnswersField()" has been called
function fadeSmileQuestionAnswersFieldInAndOut() {
    // Display each comment in the comments section
    let smileQuestionAnswersField = document.getElementById('smileQuestionAnswersField');
    smileQuestionAnswersField.setAttribute("class", "text-fade");
    answersToCurrentQuestion = JSON.parse(localStorage.getItem(initialQuestions[currentQuestionIndex].localStorageKey));
    if (answersToCurrentQuestion && answersToCurrentQuestion.length > 0) {
        setTimeout(() => {
            smileQuestionAnswersField.innerHTML = answersToCurrentQuestion[smileQuestionAnswersFieldCounter];
            smileQuestionAnswersField.setAttribute("class", "text-show");
        }, 1000)
    }

    smileQuestionAnswersFieldCounter++;

    if (smileQuestionAnswersFieldCounter >= smileQuestionAnswers[currentQuestionIndex].length) {
        smileQuestionAnswersFieldCounter = 0;
    }
}

function showSingleAnswerInSmileQuestionAnswersField() {
    let smileQuestionAnswersField = document.getElementById('smileQuestionAnswersField');
    smileQuestionAnswersField.innerHTML = smileQuestionAnswers[currentQuestionIndex][0];
}

// From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

// Speech recognized event3
// Speech recognized event3
console.log('gotSpeech function defined:');
function gotSpeech() {
    console.log('gotSpeech called');
    // Something is there
    // Get it as a string, you can also get JSON with more info
    if (speechRec.resultValue) {
        let said = speechRec.resultString;

        console.log(`said: ${said}`);

        if (said == 'reset') {
            console.log('reset called');
            resetSmileQuestionSpeechInput();
            // reset timer for user activity
            // resetTimer();
        } else if (said == 'submit') {
            console.log('submit called');
            addCommentHandler();
            // resetTimer();
        } else if (said == 'next') {
            console.log('next called');
            handleNextCommand();
            // resetTimer();
        //} else if (said == 'start') {
        //    console.log('start called');
        //    // hide overlay  'start' is said
        //    // resetTimer();
        //    hideOverlay();
        } else {
            console.log(`said: ${said}`);
            updateSmileQuestionSpeechInput(said);
        }
    }
}

function gotEnd() {
    console.log("Speech rec ended. Restarting...");
    // Restart immediately
    speechRec.start();
}

function updateSmileQuestionSpeechInput(said) {
    current_input = document.getElementById('smileQuestionSpeechInput').innerHTML;
    if (!current_input && said) {
        document.getElementById('smileQuestionSpeechInput').innerHTML = said;
    }
}

function resetSmileQuestionSpeechInput() {
    document.getElementById('smileQuestionSpeechInput').innerHTML = "";
}

function handleNextCommand() {
    currentQuestionIndex += 1;
    if (currentQuestionIndex >= initialQuestions.length) {
        currentQuestionIndex = 0;
    }
    updateSmileQuestionSpan();
    resetSmileQuestionSpeechInput();
    toggleVibeState();
}

// Set the timer for 10 minutes (600000 milliseconds)
// var timer = setTimeout(function() {
//     // Show the overlay
//     showOverlay();
// }, 600000);
// 
// // Event listener for user activity
// function resetTimer() {
//     clearTimeout(timer);
//     timer = setTimeout(function() {
//         // Show the overlay
//         showOverlay();
//     }, 600000);
// }

// show instructions overlay
function showOverlay() {
    // Create the overlay element
    var overlay = document.createElement('instructions');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    // Add content to the overlay
    var content = document.createElement('instructions');
    content.style.backgroundColor = '#FFF9F7';
    content.style.padding = '30px';
    content.style.borderRadius = '30px';
    content.style.fontFamily = 'omnium-tagline';
    content.style.fontSize = '30px';
    content.style.color = 'dark grey';
    content.innerHTML = 'Welcome, enter this realm of mirrors and begin your reflection experience here <br><br> Start by carefully placing your head inside the box and adjust your chair if needed <br> A question will appear on screen and you can answer it by speaking freely <br><br> You can navigate the interface with the following commands <br>*reset* = clear your answer <br>*submit = submit your answer <br>*next* = move to the next question<br><br> When you are ready, say *start* to begin.';

    overlay.appendChild(content);

    overlay.classList.add('overlay');

   

    // Append the overlay to the document body
    document.body.appendChild(overlay);
}

// hide instructions overlay
function hideOverlay() {
    var overlay = document.querySelector('.overlay');
    if (overlay) {
        // Check if overlay exists before removing it
        document.body.removeChild(overlay);
    } else {
        // Handle case where overlay does not exist
        console.warn('No overlay element found to remove');
    }
}




