const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

//pull information from api
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

//to get user information
function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "color",
        message: "What is your favorite color?"
      },
      {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username"
      },
      {
        type: "input",
        name: "linkedin",
        message: "Enter your LinkedIn URL."
      }  
    ]);
}

function generateHTML(answers) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <title>Document</title>
    </head>
    <body>
      <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Hi! My name is ${answers.name}</h1>
       
        
        <ul class="list-group">
            <li class="list-group-item">My favorite color is ${answers.color}</li>
          <li class="list-group-item">My GitHub username is ${answers.github}</li>
          <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
        </ul>
      </div>
    </div>
    </body>
    </html>`;
}

promptUser()
    .then(function(answers){
        const html = generateHTML(answers);

        return writeFileAsync("index.html", html);
    })
    .then(function(){
        console.log("successfully wrote to index.html");
    })
    .catch(function(err){
        console.log(err);
    });




