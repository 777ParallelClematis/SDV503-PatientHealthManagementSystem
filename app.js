import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer';

// variables as follows:


const recordsData = fs.readFileSync('records.JSON', 'utf8')
const records = JSON.parse(recordsData)


// Function to show initial menu
async function initialMenu(){
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
        contactDeveloper()

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

function contactDeveloper(){
    console.log("Contact Developer option selected")
    let userInput = readlineSync.question("Please enter the message you wish to send to the Developer")

}  // readline/nodemailer combo here

// function for a medical professional to view a list of their patients or input an ID number
async function viewPatientList(){
    const choices = ['input ID number', ...records.map(record => record.name)]

    const questions = [{
        type: "list", 
        name: "patientList",
        message: "Select a patient to view", 
        choices: choices
    }]

    const answers = await inquirer.prompt(questions)
    // appropriate code here
    console.log(`Selected patient: ${answers.patientList}`)
}


// function to add a patient into the database (FUNCTIONAL! YAY!)
async function addPatient(){
    const questions = [
        { name: 'ID', message: 'Enter patient ID:' },
        { name: 'name', message: 'Enter patient name:' },
        { name: 'age', message: 'Enter patient age:' },
        { name: 'height', message: 'Enter patient height (cm):' },
        { name: 'weight', message: 'Enter patient weight (kg):' },
        { name: 'medicalConditions', message: 'Enter patient medical conditions (comma-separated):' },
        { name: 'medications', message: 'Enter patient medications (comma-separated):' }] // test with/without comma between final brackets

      const answers = await inquirer.prompt(questions)

            answers.medicalConditions = answers.medicalConditions.split(',').map(str => str.trim())
            answers.medications = answers.medications.split(',').map(str => str.trim())

     const recordsData = fs.readFileSync('records.JSON', 'utf8')
     const records = JSON.parse(recordsData)

     records.push(answers)

     const updatedRecordsData = JSON.stringify(records, null, 2)

     fs.writeFileSync('records.JSON', updatedRecordsData)
    
     console.log("Patient successfully added!")

}


async function patientMenu() {
    console.log("Patient menu loading ...")
    const questions = [{
        type: "list", 
        name: "patientMenu",
        message: "Select an option",
        choices:["View Profile","Edit Profile", "Contact Medical Professional"]

  
    }]
    const answers = await inquirer.prompt(questions)

}

