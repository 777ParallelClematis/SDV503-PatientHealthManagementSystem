import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import readline from 'readline'
import chalk from "chalk" // used once in patient search

const recordsData = fs.readFileSync('records.JSON', 'utf8')
const records = JSON.parse(recordsData)

let IDList = records.map(record => Number(record.ID)) // creates an array of existing IDs

 console.log("Welcome to RecordPortal 1.0") //change to clear

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
     console.log("Returning you to the Main Menu")
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



    // functinon if contact developer is selected
        async function contactDeveloper() {
        console.log("Contact the developer at erin-colane@live.nmit.ac.nz") // I was going to use nodemailer here but it got messy 
        initialMenu()
                                    }



 // function for a medical professional to view a list of their patients or input an ID number
  async function viewPatientList(){

   let choices = ['Exit', ...records.map(record => record.name)]

   const questions = [{

       type: "list", 
       name: "patientList",
       message: "\nSelect a patient to view", 
       choices: choices

                   }]

    const answers = await inquirer.prompt(questions)
    console.log(answers.patientList)

    let selectedIndex = records.find((record) => record.name.trim() === answers.patientList.trim())

if (answers.patientList === "Exit"){medicalProfessionalMenu()}
else if (selectedIndex){
  console.log(records.selectedIndex)// - this prints the content as an object
    console.log(`name: ${selectedIndex.name}`)
    console.log(`age: ${selectedIndex.age}`)
    console.log(`height: ${selectedIndex.height}`)
    console.log(`weight: ${selectedIndex.weight}`)
    console.log(`medical conditions: ${selectedIndex.medicalConditions}`)
    console.log(`medications: ${selectedIndex.medications}`)
        viewPatientList()
} 
  }

//regex for ID number
const regex = /^[0-9]{5}$/ // five digits
 // function to add a patient into the database (FUNCTIONAL! YAY!)
 async function addPatient(){
 
    const questions = [
        { name: 'ID', message: 'Enter patient ID:', validate: (input) => {
            if (!regex.test(input)){
                return 'Please enter a valid ID number (exactly 5 digits).'
            }
             if (IDList.includes(input)) { // does not work !!!!! 
             return 'This ID already exists. Please enter a different ID.'
            }
            return true }},
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
         
        records.push(answers)

     const updatedRecordsData = JSON.stringify(records, null, 2)

     fs.writeFileSync('records.JSON', updatedRecordsData)
    
     console.log("Patient successfully added! Exit to see the patient details")
medicalProfessionalMenu()
                             }





 async function patientMenu() {
     console.log("Patient menu loading ...")

     let patientIndex = 1 // this would be determined by a real login

     const questions = [{
        type: "list", 
        name: "patientMenu",
        message: "Select an option",
        choices:["View Profile","Edit Profile", "Contact Medical Professional", "Delete Profile", "Exit"]

    }]
     const answers = await inquirer.prompt(questions)

     if (answers.patientMenu === "View Profile"){
        console.log("ID:"+`${records[patientIndex].ID}`), // index 1 selected, this would be populated by how the user logs in, this example is if the user is logged in as 
        console.log("Name:"+ `${records[patientIndex].name}`)
        console.log("Age:"+ `${records[patientIndex].age}`)
        console.log("Height:"+`${records[patientIndex].height}`)
        console.log("Weight:"+`${records[patientIndex].weight}`)
        console.log("Medical Conditions:"+`${records[patientIndex].medicalConditions}`)
        console.log("Medications: "+ `${records[patientIndex].medications}`)
        patientMenu()

     }else if(answers.patientMenu === "Edit Profile"){
            detailEdit()
     }else if(answers.patientMenu === "Contact Medical Professional"){
        console.log("Call your hospital on XX-XXX-XXXX")
        patientMenu()
     }else if(answers.patientMenu === "Delete Profile")
        {console.log(`Patient ${records[1].ID}, ${records[1].name} Deleted. Returning you to the main menu")`)
        console.log(chalk.blue("Note: The patient hasnt truly been deleted from the JSON file.\n Purely prototype purposes."))
       patientMenu()
       // records.slice(patientIndex, 1)//this could would work if the records were able to be updates. it only works with shallow copies rather than deleting it from the file system   
       // future work with file system here, note the correct paths and details on lines 9 and 10 of app.js
}
     else{ initialMenu() }

                             }

//function to edit a patient's details or go back
async function detailEdit(){
    //select a value to edit
    let profileToEdit = [{
        ID: 10002, 
        name: "Balding Barnacle",
        age: 42, 
        height: 163, 
        weight: 21, 
        medicalConditions:  "Allergy to whiteboard markers",
        "medications": [
          "Medication C"]
    }]
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
             `Medications: ${records[1].medications}`,
             'Exit'

        ]
    }]
    const answers = await inquirer.prompt(questions)

    if (answers.valueToEdit === 'Exit') {
        initialMenu() // Go back to patient menu
    } else {
    editChosenDetail()

    //readline to edit then push to appropriate key/value
}} 

async function editChosenDetail(){
  const question = [{
    name: "inputForChosenDetail" ,message: "Enter what you'd like to change the value to"
  }]
  const answers = await inquirer.prompt(question)
    // would push that edited value to the JSON file
  console.log("Alteration Made")
  console.log(chalk.blue("Note: This did not alter the data in the JSON file. Purely prototype purposes."))
  patientMenu()

}

