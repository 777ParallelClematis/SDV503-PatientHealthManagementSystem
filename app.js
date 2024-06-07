import inquirer from 'inquirer'


// function to show initial menu


// Function to show initial menu
async function initialMenu() {
    const questions = [{
        type: "list",
        name: "viewOptions",
        message: "Welcome to RecordPortal 1.0",
        choices: ["I am a Medical Professional", "I am a Patient", "Other, Contact Developer"]
    }]
    
    const answers = await inquirer.prompt(questions);
    if (answers.viewOptions === "I am a Medical Professional") {
        medicalProfessionalMenu();
    } else if (answers.viewOptions === "I am a Patient") {
        patientMenu()
    } else {
        console.log("Contact Developer option selected, enter the message you wish to send")
        readline
    }
}

initialMenu();

function medicalProfessionalMenu() {
    console.log("Medical Professional Menu loading ...")
}

function patientMenu() {
    console.log("Patient menu loading ...")
}

function 


// patient menu options

// medpro menu options