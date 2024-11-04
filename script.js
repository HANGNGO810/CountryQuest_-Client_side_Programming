"use strict";
/*
    Author: Hang Ngo
    Description: PROG 1700 JAVASCRIPT – FINAL PROJECT
                 CLIENT-SIDE JAVASCRIPT PROGRAMMING
    Instructor: Lin, Hamlet
    Date: Dec 9 2023
*/
//---------------------------------------------------------------------------------------
                        //CREATE GLOBAL VARIABLES FOR INDEX PAGE

//set name "country" for local storage and store it in variable name "countriesArray"
let countriesArray = JSON.parse(localStorage.getItem("country"));
//get the element by id named "countryName"
let countryName= document.getElementById("countryNameBox");
//declare a variable to store the value of population
let population= document.getElementById("populationBox");
//get the element by id named "areaBox"
let areaBox = document.getElementById("areaBox");
//get the element by id named "popDensityBox"
let popDensityBox= document.getElementById("popDensityBox");
//get the element by id named "flag"
let flag= document.getElementById("flagBox");

//get the userchoice for the country Dropbox by id named 'countryNameList"
let userChoice = document.getElementById("countryNameList");
//get the element by id named "areaIn"
let userChoiceArea = document.getElementById("areaIn");
//get the userchoice for the country Dropbox by id named 'popRadio"
let userChoiceDensity = document.getElementById("popRadio")
//Declare a variable name "indexCountry" to store the Index of selected choice by user
let indexCountry=0 ;
//-----------------------------------------------------------------------------------------
                                //VARIABLES FOR QUIZ PAGE
let result_quiz = document.getElementById("result_quiz");
//result_quiz.innerHTML= flagRandom + " - "+indexCountry;
//declare variable for Next button                       
let button_next= document.getElementById("button_next");                       
//declare variables number of questions in QUiz 
let numberOfQuestions=0;
//delare total correct answer
let correctAnswer=0;
//variable for dropbox in quiz
let name_box= document.getElementById("countryName_quiz");
//parse local storage "highscores" to variable name highscores
let highscores = JSON.parse(localStorage.getItem("highscores"));
//declare a variable to prompt user name to input in Quiz page
let userName="";
//displaying the high score
let table_score= document.getElementById("table_score");
//-------------------------------------------------------------------------------------------------------------------
                                    //LOADING LOCAL STORAGE AND PARSE DATA INTO ARRAYS
//loading country
if(localStorage.getItem("country") === null) //ns is the name , can be "note"  --> refer to local storage of the browser see if there is the key called "ns"
{
    var server_handshake = new XMLHttpRequest();//server handshake --request something in XMLhttp
    //call back function: ready to be called back, not executed until onreadystatechange to 4
    server_handshake.onreadystatechange = function() {// if the state change --> porperty of server_handshake
        //check if the request if completed or loaded
        if (this.readyState == 4 && this.status == 200) 
        {
            //it requesting countries.json, server has completed the response, check the both ready state request and response from the server
            //loading data to localstorage
            localStorage.setItem("country",server_handshake.responseText);
            //adding to countriesArray
            countriesArray = JSON.parse(localStorage.getItem("country"));
            //added html_code for dropbox list to the nameList dropbox
            userChoice.innerHTML=addCountryList();
        }
    };
    server_handshake.open("GET", "countries.json", true);// get object to open json > make request to the server 
    server_handshake.send();//sending the request to server
}
else
{
    //if the script is running here, the localstorage with the key country is found
    //loading data to countriesArray from localstorage with the key country
    countriesArray = JSON.parse(localStorage.getItem("country"));
    //added html_code for dropbox list to the nameList dropbox
    if((localStorage.getItem("country") !==null)&&(userChoice !== null))
        userChoice.innerHTML=addCountryList();
}

//loading high_scores in Quiz page
if(localStorage.getItem("highscores") === null) //ns is the name , can be "note"  --> refer to local storage of the browser see if there is the key called "ns"
{
    var xmlhttp = new XMLHttpRequest();//server handshake --request something in XMLhttp
    //call back function: ready to be called back, not executed until onreadystatechange to 4
    xmlhttp.onreadystatechange = function() {// if the state change --> porperty of server_handshake
        //check if the request if completed or loaded
        if (this.readyState == 4 && this.status == 200) 
        {
            //it requesting countries.json, server has completed the response, check the both ready state request and response from the server
            //loading data to localstorage
            localStorage.setItem("highscores",xmlhttp.responseText);
            //adding to countriesArray
            highscores = JSON.parse(localStorage.getItem("highscores"));            
        }
    };
    xmlhttp.open("GET", "original_high_scores.json", true);// get object to open json > make request to the server 
    xmlhttp.send();//sending the request to server
}
else
{
    //adding to highscores
    highscores = JSON.parse(localStorage.getItem("highscores"));
}

//------------------------------------------------------------------------------------------------------------------
                                //ADDED EVENT LISTERNER FOR DROPBOX, BUTTON, RADIO BUTTON...
//when user click to select a country from a country List
if(userChoice !== null)
    userChoice.addEventListener("change", DisplayCountryData);
//when user choose Miles or Km in Area In
if(userChoiceArea !== null)
    userChoiceArea.addEventListener("change", DisplayCountryData);
//when user choose a radio option in Population density
if(userChoiceDensity !== null)
    userChoiceDensity.addEventListener("change", DisplayCountryData);
 // when user click "next" button, call the funtion calculateQuiz() --Quiz page
button_next.addEventListener('click', calculateQuiz);
//name_box.addEventListener('change',calculateQuiz);

//---------------------------------------------------------------------------------------------------------------
                                //FUNCTIONS FOR INDEX PAGE

                //function to load countries list to the dropbox
function addCountryList()
{
//Load data to the dropbox to choose a country from the list
let html_code = "";
//create options in select box
html_code+=`<option value="select"> Select One </option>`;
//loop through file countries.json named "countriesArray"
if(countriesArray != null)
for (let i=0; i<countriesArray.length; i++)
{
    let row = countriesArray[i];
    //add <option> into select dropbox by getting the name of country 
    html_code+=`<option value="${i}"> ${row["Name"]} </option>`;
}
return html_code;
}
                    //function to calculate area in Km / miles
function CalculateAreaInKM() 
{
    //IF the value of user choice in Area is equal to 0 (mean: Miles)
    let areaNumber = 0;
   if (userChoiceArea.value==0)
   {
    // Dislay the value of "Area" in Miles (original value in countriesArray json)
    areaNumber=countriesArray[indexCountry]["Area"];
   }
   else //IF the value of user choice in Area is equal to 1 (mean: Km)
   {
    //Display the value of "Area" in Km by plus 2.589988
    areaNumber=countriesArray[indexCountry]["Area"] * 2.589988;
   }
   return areaNumber.toFixed(1); // return the value of area in miles or Km
}


                //Function to calculate population density by miles or km
function CalPopDensity()
{
  let popDen=0;
    //if User select radio button of "per square mile"
    if (document.getElementById('miles').checked)
    {
          //calculate population density by miles
        popDen= (countriesArray[indexCountry]["Population"])/(countriesArray[indexCountry]["Area"]);
      
    }
    //if User select radio button of "per square km"
    else if (document.getElementById('km').checked)
    {
     //calculate population density by km
       popDen= (countriesArray[indexCountry]["Population"])/((countriesArray[indexCountry]["Area"])* 2.589988);
    }

   return popDen;
}

                    //Function to calculate % of population

function DisplayPopulationData() 
{
    let totalPopulation=0;
    //loop into the countries array
    for (let i=0; i<countriesArray.length; i++)
    {
        //calculate total population by adding the population of every countries in the list
        totalPopulation+=parseInt(countriesArray[i]["Population"]);
    }
    //calculate the percentage of the selected country by divided the selected country population with the total world population
    let percentPop = ((countriesArray[indexCountry]["Population"])/totalPopulation*100);
    let percentOfPopulation = document.getElementById("percentOfPopulation");
    percentOfPopulation.innerHTML=percentPop.toFixed(3) + " %"; 
 
}

                    //FUNCTION TO DISPLAY DATA OF A SELECTED COUNTRY
function DisplayCountryData()
{
    //Display country name and population
    //get the name of country based on user selected
    countryName.innerHTML=userChoice.options[userChoice.selectedIndex].text;
    //declare a variable to store the index of user selected choice
    indexCountry = userChoice.options[userChoice.selectedIndex].value;
    //set the value of population by Index
    population.innerHTML=countriesArray[indexCountry]["Population"]; 
    //display miles in area box
    let areaNumber = CalculateAreaInKM();
    areaBox.innerHTML=areaNumber;

    //Display percentage of population
    DisplayPopulationData();

    //DISPLAY FLAGS
    let flagName= userChoice.options[userChoice.selectedIndex].text;
    //replace space by "_"
    flagName=flagName.replace(/ /g, '_');
    //display flag in the box named "flag" in html
    flag.innerHTML=`<img src="flags/${flagName}.png" id="flags_img">`;
    //flag.innerHTML="<img src='flags/Pakistan.png'>" -- test

    //DISPLAY POPULATION DENSITY
    //popDensityBox.innerHTML=(countriesArray[indexCountry]["Population"])/(countriesArray[indexCountry]["Area"]);
    let popDen = CalPopDensity();
    popDensityBox.innerHTML=popDen.toFixed(2);
}

  //function to launch wifi page
function launchWiki()
{
    //get the country name selected by user
    let countrySelect = userChoice.options[userChoice.selectedIndex].text;
    //replace the country name in the address of web browser to load the infos of selected country
    window.location.href=`https://en.wikipedia.org/wiki/${countrySelect}`;
}

//--------------------------------------------------------------------------------------------------------------------
                                            //FUNCTION FOR QUIZ PAGE                       
//Function to launch Quiz
function launchQuiz()
{
    //check local storage     
    if(localStorage.getItem("numberOfQuestions") === null)
    {
        numberOfQuestions=1;
        localStorage.setItem("numberOfQuestions",numberOfQuestions);
    }
    else{
        numberOfQuestions=parseInt(localStorage.getItem("numberOfQuestions"));
    }

    if(localStorage.getItem("correctAnswer") === null)
    {
        correctAnswer=0;
        localStorage.setItem("correctAnswer",correctAnswer);
    }
    else{
        correctAnswer=parseInt(localStorage.getItem("correctAnswer"));
    }

    //replace the country name in the address of web browser to load the infos of selected country
    //window.location.href=`/launchQuiz.html`;
    let flagBox = document.getElementById("flag_quiz");
    //Display random flags
    indexCountry = parseInt(Math.random()*202);
    let flagRandom= countriesArray[indexCountry]["Name"];
    //replace space by "_"
    flagRandom=flagRandom.replace(/ /g, '_');
    //display flag in the box named "flag" in html
    flagBox.innerHTML=`<img src="flags/${flagRandom}.png" id="flags_img" class="">`;
   
    //Load data to the dropbox: 1 correct answer + 3 random answer
    let html_code = "";
  

   //declare an array to store value of random index and 3 others random numbers
    let choicesArrray = [];
    choicesArrray.push([indexCountry,(parseInt(Math.random()*3))]);

    //add3 random options to the array
    for(let i=0; i<3; i++)
    {
        let aRandom= parseInt((Math.random()*202));//get a random number
        let bRandom=parseInt(Math.random()*3); // random from 0-3

        //mix the index number for the choices and the index must be unique from 0-3
        for (let j=0; j<choicesArrray.length; )
        {
            //if the random is equal with the previous choices
            if ((bRandom==choicesArrray[j][1]))
            {
                //get another random number
                bRandom=parseInt(Math.random()*3);
                //reset to check the array again
                j=0;
            }
            else
            {
                //bRandom is unique than increase value to check the next index
                j++;
            }
        }
        choicesArrray.push([aRandom,bRandom]);
    }
    //re-order the choice answer
    let minValue =choicesArrray[0][1];
    //loop through choicesArray start from index 0
    for (let i=0; i<choicesArrray.length;i++)
    {
        //loop through choicesarray start from index 1
        for(let j=i+1; j<choicesArrray.length;j++)
        {
            //check the condition of number at index i and j
            if (choicesArrray[i][1]>choicesArrray[j][1])
            {
                //assign temporary variables to store values 
                let tempCountry=choicesArrray[i][0];
                let tempIndex= choicesArrray[i][1];
                //change the position of numbers in the array
                choicesArrray[i][0]= choicesArrray[j][0];
                choicesArrray[i][1]=choicesArrray[j][1];
                // assign the value back to the temperary avariables
                choicesArrray[j][0]=tempCountry;
                choicesArrray[j][1]=tempIndex;
            }
        }
    }

  //create options in select box
  //html_code+=`<option value="select"> Select One </option>`;
    //read the choicesArray
    html_code+=`<option selected value="${choicesArrray[0][0]}" > ${countriesArray[choicesArrray[0][0]]["Name"]} </option>`;
    for (let i=1; i<choicesArrray.length; i++)
    {
        html_code+=`<option value="${choicesArrray[i][0]}" > ${countriesArray[choicesArrray[i][0]]["Name"]} </option>`;
    }
    //display the content of 4 options in the dropbox
    name_box.innerHTML=html_code.replace('_', " ");
    //test the correct result
}


function calculateQuiz()
{
    correctAnswer=parseInt(localStorage.getItem("correctAnswer"));

        //increase number of questions --tracking 
        localStorage.setItem("numberOfQuestions",++numberOfQuestions);

        //check the correct answer
        checkAnswer();
        localStorage.setItem("correctAnswer",correctAnswer);
        //display total question out of 10:
        result_quiz.innerHTML= numberOfQuestions +" out of 10 ("+ ((numberOfQuestions/10)*100).toFixed(2) + "%)";

    if (numberOfQuestions>=11)
        {
            result_quiz.innerHTML= "10 out of 10 (100%)";   
            getHighScore();
            //reset value number of questions
            numberOfQuestions=1;
            localStorage.setItem("numberOfQuestions",numberOfQuestions);
            //reset value of correct answer
            correctAnswer=0;
            localStorage.setItem("correctAnswer",correctAnswer);

            //disable the Next button
            document.getElementById("button_next").disabled = true;
        }
    else{
    //launch quiz again to go to the next question
        launchQuiz();
    }

}

//function to check correct answer
function checkAnswer()
{
    let tempValue= name_box.options[name_box.selectedIndex].value;

    if ((parseInt(tempValue))==(parseInt(indexCountry)))
    {
        //increase correct answer
        correctAnswer++;
        //insert back to the local storage of correctanswer
        localStorage.setItem("correctAnswer",correctAnswer);
    }
}

//function to get the highscore and arrange order in the highscoresarray
function getHighScore()
{
    let isMax=1;
   // let userNameTemp= '"' + userName+ '"';
   highscores = JSON.parse(localStorage.getItem("highscores"));
   


    for(let i=0; i<highscores.length && isMax; i++)
    {
        if (highscores[i]["Score"]<=correctAnswer)
        {
            //if user enter the right username
            //Prompt for user to enter user name
            userName=prompt("Please enter your 3 letter username");
            //check if user does not enter anything
            while (userName==null || userName=="" || userName.length>3 ||!isNaN(userName))
            {
               alert ("Wrong input, please enter your 3-letter name");
               userName=prompt("Please enter your 3 letter username");
            }
            let tempScore={
                "Score": parseInt(correctAnswer),
                "User": userName,
                "Timestamp": new Date().toLocaleString("en-US", {timeZone: "America/Halifax", hour12: false}).replace(", ", " ")
            };

            highscores.splice(i,0,tempScore);
            highscores.pop();
            isMax=0;
        }       
    }
    //write back to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));
   // localStorage.highscores=JSON.stringify(highscores);
   DisplayHighScores();
}

function DisplayHighScores()
{
    
    //html code for display table of high scores
    let html_code="";
    html_code += "<h4>High Scores</h4>";
    html_code += "<table class='highscore_table'>";
    html_code += "<thead>";
    html_code += "<tr>";
    html_code += "<th>Score</th>";
    html_code += "<th>Username</th>";
    html_code += "<th>Date</th>";
    html_code += "</tr>";
    html_code += "</thead>";
    html_code += "<tbody>";

    for(var i = 0; i < highscores.length; i++)// go over object notation/ every single note
    {
        var row = highscores[i];//get the data by adding it to row in table
        html_code += "<tr>";
        //added 2 column on this row
        html_code += `<td>${row["Score"]}</td>`;//score
        html_code += `<td>${row["User"]}</td>`;//username
        html_code += `<td>${row["Timestamp"]}</td>`;//Time
        html_code += "</tr>";
    }

   // html_code += "</tr>";
    html_code += "</tbody>";
    html_code += "</table>";    
    //display table of scores to the web
    table_score.innerHTML = html_code; 
}

//Function for reset button
function resetQuiz()
{
    //reset all question and correct answer to the original value
    numberOfQuestions=1;
    correctAnswer=0;
    //set local storage to original values
    localStorage.setItem("numberOfQuestions",numberOfQuestions);
    localStorage.setItem("correctAnswer",correctAnswer);
    //enable Next button
    document.getElementById("button_next").disabled = false;
    //clear the highscore table
    table_score.innerHTML = "";
    //call function to launch page again
    launchQuiz();
    //reset the are inform the number of questions to 0
    result_quiz.innerHTML= " 0 out of 10 questions (0%)";  
}
