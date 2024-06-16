import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer';



const recordsData = fs.readFileSync('records.JSON', 'utf8')
 const records = JSON.parse(recordsData)

 console.log("Welcome to RecordPortal 1.0")

// Function to show initial menu
 async function initialMenu(){
    const questions = [{
         type: "list",
         name: "viewOptions",
         message: "Select one",
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

async function contactDeveloper() {
console.log("Contact the developer at erin-colane@live.nmit.ac.nz")

}


 // function for a medical professional to view a list of their patients or input an ID number
  async function viewPatientList(){

   const questions = [{
       type: "list", 
       name: "patientList",
       message: "Select a patient to view", 
       choices: ['search by ID number', ...records.map(record => record.name)]
                   }]

    const answers = await inquirer.prompt(questions)
    if (answers.viewPatientList === "search by ID Number") {
        patientSearchByID()
    } else {
        const selectedIndex = records.findIndex(record => record.name === answers.patientList)
        console.log(`ID: ${records[selectedIndex].ID}`)
        console.log(`Name: ${records[selectedIndex].name}`)
        console.log(`Age: ${records[selectedIndex].age}`)
        console.log(`Height:${records[selectedIndex].height}`)
        console.log(`Weight: ${records[selectedIndex].weight}`)
        console.log(`Medical Conditions: ${records[selectedIndex].medicalConditions}`)
        console.log(`Medications: ${records[selectedIndex].medications}`)
    }
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



// search by ID number
// async function patientSearchByID(){
// readline-sync. /////////////////////////////// readline to input a patients ID, and appropriate validation whether it exists in the database/JSON file or not. 
// }


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



// function to find smallest available ID number. 
// ID numbers must be between 10000 and 99999. 

// function newID(){
//     records.JSON
// }
// smallest integer in this range that isnt listed. 