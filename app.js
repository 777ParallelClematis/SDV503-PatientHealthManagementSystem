import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer';
import readline from 'readline'
// import chalk from "chalk" probably not going to use this
// import { profile } from 'console'; - this appeared at an unknown point. I think it was while I was experiementing in my mac terminal with emacs doctor/psychotherapist faeture


const recordsData = fs.readFileSync('records.JSON', 'utf8')
const records = JSON.parse(recordsData)

let IDList = records.map(record => Number(record.ID)) // creates an array of existing IDs


 console.log("Welcome to RecordPortal 1.0")

console.log(IDList)

// Function to show initial menu
 async function initialMenu(){
    const questions = [{
         type: "list",
         name: "viewOptions",
         message: "Select one",
         choices: ["I am a Medical Professional", "I am a Patient", "Other, Contact Developer"] // this menu/function does not have universal back function, everything else will
     }]
     const answers = await inquirer.prompt(questions);
      if (answers.viewOptions === "I am a Medical Professional") {
       medicalProfessionalMenu()
    } else if (answers.viewOptions === "I am a Patient") {
      patientMenu()
    } else {
     contactDeveloper() // Why does this initally return "100010" 
     console.clear("Returning you to the Main Menu")
     initialMenu()
           }
                              }
initialMenu()


// function to show the medical professional menu of actions that can be made
 async function medicalProfessionalMenu() {
    console.clear()
    const questions = [{
    type: "list",
    name: "medicalProfessionalMenu", 
    message: "Medical Professional Menu \n Select an option:", 
     choices: ["View Patient List", "Add a Patient", "Exit"] 
     }]
     const answers = await inquirer.prompt(questions)
     if (answers.medicalProfessionalMenu === "View Patient List"){
         viewPatientList()
     }else if (answers.medicalProfessionalMenu === "Add a Patient"){
         addPatient()
     }else{initialMenu()}
                                          }

async function contactDeveloper() {
console.log("Contact the developer at erin-colane@live.nmit.ac.nz") // I was going to use nodemailer here but it got messy 
}

 // function for a medical professional to view a list of their patients or input an ID number
  async function viewPatientList(){

   const questions = [{
       type: "list", 
       name: "patientList",
       message: "\nSelect a patient to view", 
       choices: ['search by ID number','Exit', ...records.map(record => record.name)]
                   }]

    const answers = await inquirer.prompt(questions)
    console.log(answers.patientList)

if (answers.patientList == "search by ID number"){patientSearchByID()}
else if (answers.patientList == "Exit"){medicalProfessionalMenu()}
else{
    let selectedIndex = records.find((record) => record.name == answers.patientList)
console.log(selectedIndex)
    console.clear(`ID: ${selectedIndex.ID}`)
    console.log(`name: ${selectedIndex.name}`)
    console.log(`age: ${selectedIndex.age}`)
    console.log(`height: ${selectedIndex.height}`)
    console.log(`weight: ${selectedIndex.weight}`)
    console.log(`medical conditions: ${selectedIndex.medicalConditions}`)
    console.log(`medications: ${selectedIndex.medications}`)
        viewPatientList()
}}



 // function to add a patient into the database (FUNCTIONAL! YAY!)
 async function addPatient(){
    // call find new ID number function
    // push it to records array
    const questions = [
      //  { name: 'ID', message: 'Enter patient ID:' }, 
        { name: 'name', message: 'Enter patient name:' },
        { name: 'age', message: 'Enter patient age:' },
        { name: 'height', message: 'Enter patient height (cm):' },
        { name: 'weight', message: 'Enter patient weight (kg):' },
        { name: 'medicalConditions', message: 'Enter patient medical conditions (comma-separated):' },
        { name: 'medications', message: 'Enter patient medications (comma-separated):' }] // test with/without comma between final brackets

        const answers = await inquirer.prompt(questions)
           // answers.ID.toString
         answers.medicalConditions = answers.medicalConditions.split(',').map(str => str.trim())
         answers.medications = answers.medications.split(',').map(str => str.trim())

        const recordsData = fs.readFileSync('records.JSON', 'utf8')
        const records = JSON.parse(recordsData)
// first push the ID number? add it to the object
     records.push(answers)

     const updatedRecordsData = JSON.stringify(records, null, 2)

     fs.writeFileSync('records.JSON', updatedRecordsData)
    
     console.log("Patient successfully added! Exit to see the patient details")
medicalProfessionalMenu()
                             }

//regex for ID number
const regex = /^[0-9]{5}$/ // five digits


// Call the function for testing
patientSearchByID()


 async function patientMenu() {
     console.log("Patient menu loading ...")

     const questions = [{
        type: "list", 
        name: "patientMenu",
        message: "Select an option",
        choices:["View Profile","Edit Profile", "Contact Medical Professional", "Exit"]

    }]
     const answers = await inquirer.prompt(questions)

     if (answers.patientMenu === "View Profile"){
        console.log("ID:"+`${records[1].ID}`), // index 1 selected, this would be populated by how the user logs in, this example is if the user is logged in as 
        console.log("Name:"+ `${records[1].name}`)
        console.log("Age:"+ `${records[1].age}`)
        console.log("Height:"+`${records[1].height}`)
        console.log("Weight:"+`${records[1].weight}`)
        console.log("Medical Conditions:"+`${records[1].medicalConditions}`)
        console.log("Medications: "+ `${records[1].medications}`)


     }else if(answers.patientMenu === "Edit Profile"){
            detailEdit()
     }else if(answers.patientMenu === "Contact Medical Professional"){
        console.log("Call your hospital on XX-XXX-XXXX")
     }else{initialMenu()}

                             }

//function to edit a patient's details or go back
async function detailEdit(){
    //select a value to edit
    const questions = [{
        type: "list", 
        name: "valueToEdit",
        message: "Please select which value you'd like to edit",
        choices: [
            `ID: ${records[1].ID}`, // make sure this cannot be edited
             `Name: ${records[1].name}`,
             `Age: ${records[1].age}`,
             `Height: ${records[1].height}`,
             `Weight: ${records[1].weight}`,
             `Medical Conditions: ${records[1].medicalConditions}`,
             `Medications: ${records[1].medications}`
        ]
    }]

    const answers = await inquirer.prompt(questions)
    console.log("Editing "+ answers.valueToEdit)
}




async function findAndSetSmallestID() {
    let minimumID = 10001
    let maximumID = 99999
    
    
    
    let availableID = minimumID;
    while (IDList.includes(availableID) && availableID <= maximumID) {
        availableID++
    }
    
    // Ensure availableID does not exceed maximumID
    if (availableID > maximumID) {
        return null // console.error() ??
    }
    
    return String(availableID)
}
// Using `await` within an async function to call `findAndSetSmallestID`
(async () => {
    let availableID = await findAndSetSmallestID()
    if (availableID !== null) {
        console.log(availableID)
    } else {
        console.log('No valid ID found within the range.')
    }
})()

// async function findSmallestID() {
//     let minimumID = 10001
//     let maximumID = 99999
    
//     let IDList = []
    
//     let availableID = minimumID
    
//     for (let i = 0; i < records.length; i++) {
//         IDList.push(Number(records[i].ID)) // creates an array of existing IDs
//     }
//     while (IDList.includes(availableID)) {
//         availableID++
//     }
//     return availableID
//                                 }

// // Using `await` within an async function to call `findSmallestID`
// async function main() {
//     let smallestID = await findSmallestID()
//     console.log(smallestID)
// }
// main()

