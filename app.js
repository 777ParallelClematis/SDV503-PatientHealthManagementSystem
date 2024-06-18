import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer';
import readlineSync from 'readline-sync';


const recordsData = fs.readFileSync('records.JSON', 'utf8')
const records = JSON.parse(recordsData)


 console.clear("Welcome to RecordPortal 1.0")

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
console.log("Contact the developer at erin-colane@live.nmit.ac.nz") // I was going to use nodemailer here but it got messy 

}

 // function for a medical professional to view a list of their patients or input an ID number
  async function viewPatientList(){
   const questions = [{
       type: "list", 
       name: "patientList",
       message: "Select a patient to view", 
       choices: ['search by ID number','Exit', ...records.map(record => record.name)]
                   }]

    const answers = await inquirer.prompt(questions)
    if (answers.viewPatientList === "search by ID Number") {
        patientSearchByID()
    }else if(answers.viewPatientList == 'Exit'){medicalProfessionalMenu()} 
    else {
        let selectedIndex = records.find((record) => record.ID === answers.patientList);
        console.log(selectedIndex)

    }
    console.log(`Selected patient: ${answers.patientList}`)
    console.log()
//  console.log(`ID: ${records[selectedIndex].ID}`)
//  console.log(`Name: ${records[selectedIndex].name}`)
//  console.log(`Age: ${records[selectedIndex].age}`)
//  console.log(`Height:${records[selectedIndex].height}`)
//  console.log(`Weight: ${records[selectedIndex].weight}`)
//  console.log(`Medical Conditions: ${records[selectedIndex].medicalConditions}`)
//  console.log(`Medications: ${records[selectedIndex].medications}`)
}

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
            answers.ID.toString
         answers.medicalConditions = answers.medicalConditions.split(',').map(str => str.trim())
         answers.medications = answers.medications.split(',').map(str => str.trim())

        const recordsData = fs.readFileSync('records.JSON', 'utf8')
        const records = JSON.parse(recordsData)

     records.push(answers)

     const updatedRecordsData = JSON.stringify(records, null, 2)

     fs.writeFileSync('records.JSON', updatedRecordsData)
    
     console.log("Patient successfully added! Exit to see the patient details")
medicalProfessionalMenu()
                             }


const regex = /^[0-9]{5}$/ 
// search by ID number
async function patientSearchByID(){
let search = readlineSync.question("Enter your search here: ") /////////////////////////////// readline to input a patients ID, and appropriate validation whether it exists in the database/JSON file or not. 
if (records.includes(search)){
console.log(`Showing Patient with ID ${search}`)
console.log(patient)
}else if (regex.test(search)){


}else{
    console.error("Input not in expected ID number format, try again or exit")
    patientSearchByID()
} 

}


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
console.log("ID:"+`${records[1].ID}`), // index 1 selected, this would be populated by how the user logs in 
console.log("name:"+ `${records[1].name}`)

     }else if(answers.patientMenu === "Edit Profile"){

     }else if(answers.patientMenu === "Contact Medical Professional"){
        console.log("Call your hospital on XX-XXX-XXXX")
     }else{initialMenu()}

                             }

//function to edit a patient's details or go back

// universal back function ??
async function universalBack(){

}
    /* displays previous page */

// function to find smallest available ID number. 
// ID numbers must be between 10000 and 99999. 

async function findNewID(records) {
    let newID = 10000
    let usedIDs = new Set()
    for (let record of records) {
        usedIDs.add(parseInt(record.ID, 10))
    } while (usedIDs.has(newID) && newID <= 99999) {
        newID++
    } if (newID > 99999) {
        throw new Error('No available IDs in the range 10000-99999')
    }
    return newID
}