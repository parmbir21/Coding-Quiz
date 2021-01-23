var questions = [
    {
        prompt: "What does HTML stand for?",
        options: ["hypertext Markup Link", "Hypertext Markup Language", "Hypertext Markdown Link", "Hypertext Markdown Language"],
        answer: "Hypertext Markup Language"
    },
    {
        prompt: "question 2",
        options: ["1", "2", "3", "4"],
        answer: "1"
    },
    {
        prompt: "question 3",
        options: ["1", "2", "3", "4"],
        answer: "1"
    },
    {
        prompt: "question 4",
        options: ["1", "2", "3", "4"],
        answer: "1"
    },
    {
        prompt: "question 5",
        options: ["1", "2", "3", "4"],
        answer: "1"
    }
];
var index = 0;
var seconds = 100;
var countdown;
$("#all-done").hide();
$("#quiz-box").hide();

//Console.log checks
console.log(questions[index].prompt)
console.log(questions[0].answer)
console.log(questions[3].options[2])
console.log(questions.length)


document.getElementById("start-button").addEventListener("click", function() {
  //Explanations and start button become hidden
  $("#start-quiz").hide();
  $("#quiz-box").show();
  //Start timer
  timer();
  //Replace question text with prompt from array
  generateQuestions();
});

//Countdown Timer (set timer to 100 once finished)
function timer() {
  countdown = setInterval(function() {
      seconds--;
      document.getElementById("quiz-time").textContent = "Score: " + seconds + " seconds";
      if (quizEnd()) {
         clearInterval(countdown);
      };
  },1000);
};

//Generate questions
function generateQuestions () {
  document.getElementById("question").textContent = questions[index].prompt;
  document.getElementById("option1").textContent = questions[index].options[0];
  document.getElementById("option2").textContent = questions[index].options[1];
  document.getElementById("option3").textContent = questions[index].options[2];
  document.getElementById("option4").textContent = questions[index].options[3];
};

//Checks to see if the text matches the answer (move to the next question)
var choice = document.getElementsByClassName("check");
for (var i = 0; i < choice.length; i++) {
  choice[i].addEventListener("click", function() {
    if (questions[index].answer === this.textContent) {
      document.getElementById("validation").textContent = "Correct";
    } else {
      //Decrease time/score if answer is incorrect
      seconds = seconds - 10;
      document.getElementById("validation").textContent = "Incorrect";
    };
    index++;
    generateQuestions();
    quizEnd();
  });
};

//Function to end quiz and display the score
function quizEnd() {
  if (index >= 4 || seconds <= 0) {
    $("#quiz-box").hide();
    $("#all-done").show();
    console.log(seconds);
    document.getElementById("final-score").innerHTML = seconds;
    clearInterval(countdown);
  };
};

//Storing score and user initials
document.getElementById("score-btn").addEventListener("click", function() {
  var userInitials = document.querySelector("#initials").value;
  var userScore = seconds;


  var user = {
    initials: userInitials,
    score: userScore
  };
  var highScores = localStorage.getItem("highScoreList");
  
  if (highScores == null) {
    localStorage.setItem("highScoreList", JSON.stringify([user]));
  } else {
    highScoreList = JSON.parse(highScores);
    highScoreList.push(user);
    localStorage.setItem("highScoreList", JSON.stringify([highScoreList]));
  }
});

