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
      <div class="jumbotron jumbotron-fluid" id="jumbotron" style="background-color:${answers.color};">
      <div class="container">
            <center>
             <h4 class="display-4">Hi! My name is ${answers.name}</h4> 
             <div><img src="image.jpg"vwidth="100" height="100" align="center"></div>
             </br>
            </center>
         <ul class="list-group">
    
        
          <li class="list-group-item">My GitHub username is: ${answers.github}</li>
        
          
          <li class="list-group-item">I live in: ${location}</li>
          <li class="list-group-item">My GitHub profile link is <a href="{{ link.url }}">${gitHubLink}</a></li>
          <li class="list-group-item">My Profile Blog is <a href="{{ link.url }}"> ${blog}</a></li>
          
         <li class="list-group-item">Bio: ${bio}</li>
         <li class="list-group-item">Number of Repositories is: ${repos}</li>
         <li class="list-group-item">Number of Github followers is: ${followers}</li>
         <li class="list-group-item">Number of Github followers is: ${following}</li>
        </br>
      
    </div>
    <center>
    <div  style="background-color:${location}; border: gray 5px solid; width:650px; height:350px; margin-bottom: 50px;">
      <h5>Current city ${location}</h5>
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=14&size=600x300&key=AIzaSyDIEVzD85LZ_BWwmWAD2qPxTiUNGgA28YI" align="middle">
    </div>

    <p>
    <input type="button" id="bt" onclick="print()" value="Print PDF" />  </p>
  </center>


    </body>
    </html>`;
}

promptUser()
    .then(function (answers) {
        const html = generateHTML(answers);
      
        userId = answers.github;

        return writeFileAsync("index.html", html);
    })
    .then(function () {
      
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
    let userBlog = res.data.blog;
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
    blog = userBlog;

 

}

//getUserId();

//get the user id callback from answers.github question 2 .then

//async function getUserID() { param withid
    

//let config = {
 //   responseType: 'stream'
//};

//let url = 'https://avatars1.githubusercontent.com/u/55807878?v=4';

//async function getUserId() {

  //  let resp = await axios.get(url, config);
  //  resp.data.pipe(fs.createWriteStream('image.jpg'));
//}

//getUserId();


// to get an image
getGithubProfile();

let config = {
    responseType: 'stream'
};

let url = 'https://avatars1.githubusercontent.com/u/55807878?v=4';

async function getImage() {
    let resp = await axios.get(url, config);
    resp.data.pipe(fs.createWriteStream('image.jpg'));
}

getImage();



//print button 
function print(doc) {
    var objFra = document.createElement('iframe');   // Create an IFrame.
    objFra.style.visibility = "hidden";    // Hide the frame.
    objFra.src = doc;                      // Set source.
    document.body.appendChild(objFra);  // Add the frame to the web page.
    objFra.contentWindow.focus();       // Set focus.
    objFra.contentWindow.print();      // Print it.
}


