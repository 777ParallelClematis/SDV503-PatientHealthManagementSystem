import inquirer from 'inquirer'
import fs from 'fs/promises';
import path from 'path';
// variables as follows:
const recordsData = fs.readFileSync('records.JSON', 'utf8')

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

initialMenu()
// function to show the medical professional menu of actions that can be made
async function medicalProfessionalMenu() {
    const questions = [{
    type: "list",
    name: "medicalProfessionalMenu", 
    message: "Select an option", 
    choices: ["View Patient List", "Add a Patient", "Exit"] 
    }]
    const answers = await inquirer.prompt(questions)
    if (answers.medicalProfessionalMenu === "View Patient List"){
        viewPatientList()
    }else if (answers.medicalProfessionalMenu === "Add a Patient"){
        addPatient()
    }else{initialMenu()}
}
medicalProfessionalMenu()

// function for a medical professional to view a list of their patients or input an ID number
function viewPatientList(){
    const questions = [{
            type: "list", 
            name: "patientList",
            message: "Select a patient to view", 
            choices: ["input ID number", `${records.name}`]
    }]
}

// addPatient(){}

// function to display patient menu
async function patientMenu() {
    console.log("Patient menu loading ...")
    const questions = [{
            type: "list", 
            name: "patientMenu",
            message: "Select an option",
            choices:["View Profile","Edit Profile", "Contact Medical Professional"]

    }]
}

