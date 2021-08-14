
(function(){
    function buildQuiz(){
      var output = [];
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
          var answers = [];
          for(lett in currentQuestion.answers){//creates radio for each answer
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" id="question${questionNumber}" value="${lett}" required>
                ${lett} :
                ${currentQuestion.answers[lett]}
              </label>`
            );
          }
  
          output.push( //adds to output
            `<div class="slide">
            <div class="image"> ${currentQuestion.image} </div>
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
      quizContainer.innerHTML = output.join(""); //displays the output
    }
  
    function showResults(){
      var statement = "question" + num;
      var quest = document.querySelector("input[name=" + statement + "]:checked");
      if(quest == null && !(currentSlide == 0)){
        alert("Please make a selection before proceeding.");
      }
      if(!(quest == null)){
  
      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll(".answers");
  
      var result = "Unknown";
      var info = "";
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
        
  
        if(userAnswer === currentQuestion.correctAnswer){  //if correct
          result = currentQuestion.endResult;
          info = currentQuestion.endInfo;
        }
      
      });
  
      resultsContainer.innerHTML = 'You were most likely bitten by a(n) ' + '<a href="glossary.html">'+ result + '</a>.<p>' + '<img src"" height="200px" width="200px"><p>' + info;
      submitButton.style.display = 'none';
      previousButton.style.display = 'none';
    }}
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
        nextButton.style.display = 'none';
        beginButton.style.display = 'inline-block';
      }
      if(currentSlide > 0 && currentSlide < slides.length-1 ){
        nextButton.style.display = 'inline-block';
        beginButton.style.display = 'none';
      }
      if(currentSlide > 1 && currentSlide < slides.length-1 ){
        previousButton.style.display = 'inline-block';
      
      }
      if(currentSlide === slides.length-1){ 
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      if(currentSlide === 1){
        previousButton.style.display = 'none';
      }
   
    }
    var num = 0
  
    function showNextSlide() {
        var statement = "question" + num;
        var quest = document.querySelector("input[name=" + statement + "]:checked");
        if(quest == null && !(currentSlide == 0)){
          alert('Please make a selection before proceeding.');
        }
        if(!(quest == null)){
          showSlide(currentSlide + 1);
          num ++;
        }
        if(currentSlide === 0){
          showSlide(currentSlide + 1);
          num ++;
        }
        
    }

    function showPreviousSlide() {
      showSlide(currentSlide - 1);
      num --;
    }
  
    // Variables
    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('quiz');
    var submitButton = document.getElementById('submit');
    
    var myQuestions = [
        {
          image: "<img src=https://static01.nyt.com/images/2020/01/20/podcasts/00JAN-TINYLOVE-6/00JAN-TINYLOVE-6-mediumSquareAt3X.jpg height=200px width=200px>",
            question: "99999999Please answer the questions as best as you can",
            answers: {
              },
              correctAnswer: "a"

          },
      {
        image: "<img src=https://static01.nyt.com/images/2020/01/20/podcasts/00JAN-TINYLOVE-6/00JAN-TINYLOVE-6-mediumSquareAt3X.jpg height=200px width=200px>",
        question: "Are the bites typically in clusters located below the knee? (eg. ankles and feet)",
        answers: {
          a: "Yes",
          b: "No"
        },
        correctAnswer: "a",
        endResult: "Flea",
        endInfo: "Fleas typically stay at ground level and jump to bite at ankles and feet. They cannot survive on human blood, and so you will often find that the source of the infestation comes from an animal or pet."
      },
      {
        image: "<img src=https://static01.nyt.com/images/2020/01/20/podcasts/00JAN-TINYLOVE-6/00JAN-TINYLOVE-6-mediumSquareAt3X.jpg height=200px width=200px>",
        question: "Is the bite a raised, red bump and is getting more swollen or firmer as time passes?",
        answers: {
          a: "Yes",
          b: "No"
        },
        correctAnswer: "a",
        endInfo: "Mosquito",
        endInfo: "Mosquitoes have been known to carry disease. Check with your physician if you have symptoms other than itchiness after getting bitten by one."
      },
      {
        image: "<img src=https://static01.nyt.com/images/2020/01/20/podcasts/00JAN-TINYLOVE-6/00JAN-TINYLOVE-6-mediumSquareAt3X.jpg height=200px width=200px>",
        question: "Are you continuing to get bitten, and it's usually at night when you go to sleep?",
        answers: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        endResult: "Bedbug",
        endInfo: "Bedbugs are nocturnal, only coming out at night to feast. Wash all linens and sheets with hot water and vaccuum."
      },
      {
        image: "<img src=https://static01.nyt.com/images/2020/01/20/podcasts/00JAN-TINYLOVE-6/00JAN-TINYLOVE-6-mediumSquareAt3X.jpg height=200px width=200px>",
        question: "Have you recently been to some wooded or grassy areas and developed a bullseye-like rash?",
        answers: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        endResult: "Tick",
        endInfo: "Ticks can carry lyme disease which is characterized by a bullseye-like rash. See a physician if this is the case. Otherwise, most people don't know they've been bitten by a tick."
      },
      {
        image: "<img src=https://static01.nyt.com/images/2020/01/20/podcasts/00JAN-TINYLOVE-6/00JAN-TINYLOVE-6-mediumSquareAt3X.jpg height=200px width=200px>",
        question: "Have you recently been to some wooded or grassy areas and the bites you have are clustered or may have pustules?",
        answers: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        endResult: "Mite/Chigger",
        endInfo: "Mite/Chigger typically appear in the wild and are almost microscopic. Unlike popular belief, they do not burrow into the skin."
      }
    ];
  
 
    buildQuiz();
  

    var previousButton = document.getElementById('previous'); //pagination
    var nextButton = document.getElementById('next');
    var beginButton = document.getElementById('begin');
    var slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
  
   
    showSlide(currentSlide); //first slide
  
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);
    beginButton.addEventListener('click', showNextSlide);
  })();

  function leaving_alert(node) {
    return confirm('You may lose progress. Click Ok to continue, or Cancel to stay on this page.');
}

//https://simplestepscode.com/javascript-quiz-tutorial/#step1
