const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const prompt = require('prompt');
//const index = require("./index.js")
var background = "";
var followers = "";
var following = "";
var location = "";


//var image = "";


prompt.start();

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
            message: "Enter your GitHub Username?"
        },

    ]);
}



//html for questions
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
      <div class="jumbotron jumbotron-fluid" id="jumbotron">
      <div class="container">
             <h1 class="display-4">Hi! My name is ${answers.name}</h1>     
       
        <ul class="list-group">
          <li class="list-group-item" id="color">I live in: ${location}</li>
          <li class="list-group-item" id="color">Bio: ${bio}</li>
          <li class="list-group-item" id="color">My favorite color is: ${answers.color}</li>
          <li class="list-group-item">My GitHub username is: ${answers.github}</li>
          <li class="list-group-item">My GitHub profile link is: ${gitHubLink}</li>
          <li class="list-group-item">Number of Github followers is: ${followers}</li>
          <li class="list-group-item">Number of Github followers is: ${following}</li>
          <li class="list-group-item">Number of Repositories is: ${repos}</li>
          
          <li class="list-group-item">GitHub image link is: ${url}</li>

      </div>
     
    </div>
   <script src="index.js"></script>
    </body>
    </html>`;
}

promptUser()
    .then(function (answers) {
        const html = generateHTML(answers);
        background = answers.color;
        userId = answers.github;

        return writeFileAsync("index.html", html);
    })
    .then(function () {
        changeColor();
        console.log("successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    });


//pull information from api
const axios = require("axios");


async function getGithubProfile() {
    let githubUrl = "https://api.github.com/users/angied521"
    let res = await axios.get(githubUrl);
    let myLocation = res.data.location;
    let blog = res.data.blog;
    let gitHubProfile = res.data.html_url;
    let nOfRepositories = res.data.public_repos;
    //let nOfStarred = res.data.starred_url;
    let nOfFollowers = res.data.followers;
    let nOfFollowing = res.data.following;
    let userBio = res.data.bio;

    bio = userBio;
    gitHubLink = gitHubProfile
    followers = nOfFollowers;
    following = nOfFollowing;
    image = url;
    location = myLocation;
    repos = nOfRepositories;

    console.log(`# of followers: ${nOfFollowers}\n`)
    console.log(`Location: ${myLocation}\n`)
    console.log(`Blog: ${blog}\n`)
    console.log(`GitHubProfile: ${gitHubProfile}\n`)
    console.log(`# of repositories: ${nOfRepositories}\n`)
    //console.log(`# of stars: ${nOfStarred}\n`)
    console.log(`# of following: ${nOfFollowing}\n`)
    console.log(`bio: ${userBio}`)

}

getGithubProfile();

// to get an image

let config = {
    responseType: 'stream'
};

let url = 'https://avatars1.githubusercontent.com/u/55807878?v=4';

async function getImage() {

    let resp = await axios.get(url, config);
    resp.data.pipe(fs.createWriteStream('image.jpg'));
}

getImage();



//change background color
async function changeColor() {
    var jumbotron = document.getElementById("jumbotron");

    jumbotron.style.background = background;
    console.log(background)
}






