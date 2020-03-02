const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");


inquirer
    .prompt([
        {
            message: "Enter your GitHub username",
            name: "username",
            type: "input"

        },
        {
            message: "What is your project name?",
            name: "projectname",
            type: "input"

        },
        {
            message: "Please write a short description of your project",
            name: "description",
            type: "input"

        },
        {
            message: "What kind of license should you have?",
            name: "license",
            type: "list",
            choices: ["MIT", "GP", "Apache 2.0", "GPL 3.0", "BSD 3", "None"]

        },
        {
            message: "What command should be run to install dependencies?",
            name: "install",
            type: "input"

        },
        {
            message: "What command should be run to run test?",
            name: "runtest",
            type: "input"

        },
        {
            message: "What does the user need to know about using the repo?",
            name: "repo",
            type: "input"

        },

    ])
    .then(function (answers) {


        const queryUrl = `https://api.github.com/users/${answers.username}`;
        console.log(queryUrl)
        axios.get(queryUrl).then(function (user) {
            console.log(user.data.email)
            const readMe = `# ${answers.projectname}
${answers.description}
---
## Table of Contents 
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)
* [Tests](#tests)
* [Questions](#questions)




## Installation

${answers.install}

## Usage

${answers.repo}


## License 
${answers.license}


## Tests
<img src="https://img.shields.io/static/v1?label=<LABEL>&message=<working>&color=<blue>">
${answers.runtest}

## Questions 

<img src="${user.data.avatar_url}"
     alt="Markdown Monster icon"
     style="float: left; margin-right: 10px;" 
     height="100px"
     width="100px"/>

   Email: ${user.data.email}

   Feel free to contact me if you have any questions! 
`;
            fs.writeFile("moc.md", readMe, function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log("README HAS BEEN CREATED")
            })




        })




    }); //.then function 
