import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import readlineSync from 'readline-sync'
import chalk from "chalk"

const recordsData = fs.readFileSync('records.JSON', 'utf8')
const records = JSON.parse(recordsData)

let IDList = records.map(record => Number(record.ID)) // creates an array of existing IDs




/* Function to show initial menu. uses inquirer package to show the user three choices. 
The choice selected prompts which corresponding function is performed next
*/
 async function initialMenu(){
  console.log("Welcome to RecordPortal 1.0")
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
     contactDeveloper()``
           }
                              }
initialMenu()



/*Function to deliver choices once  "I am a medical professional" was selected in initialMenu()
delivers options to View a list of patients (subsequently select a patient), add a patient or go back. 
These are "deep" functions, meaning that they read from and make real additions to the local JSON file. 
*/
 async function medicalProfessionalMenu() {
    console.clear()
    const questions = [{
    type: "list",
    name: "medicalProfessionalMenu", 
    message: "Medical Professional Menu \n Select an option:", 
     choices: ["View Patient List", "Add a Patient", "Back"] 
     }]
     const answers = await inquirer.prompt(questions)
     if (answers.medicalProfessionalMenu === "View Patient List"){
         viewPatientList()
     }else if (answers.medicalProfessionalMenu === "Add a Patient"){
         addPatient()
     }else{initialMenu()}
                                          }



/*Function to display contact information for the developer (could be altered to database admin for a GUI iteration)
Returns the user to the initial menu.  */
        async function contactDeveloper() {
        console.log("Contact the developer at erin-colane@live.nmit.ac.nz") // I was going to use nodemailer here but it got messy 
        initialMenu()
                                    }



/*Function for the medical professional to view a list of patients and choose one to view */
  async function viewPatientList(){
   let choices = ['Back', ...records.map(record => record.name)] // this always displays "Back" as an option, and then otherwise it maps the "name" value of all records as a choice. 

   const questions = [{

       type: "list", 
       name: "patientList",
       message: "\nSelect a patient to view", 
       choices: choices // choices are the above "choice" variable

                   }]

    const answers = await inquirer.prompt(questions)
    console.log(answers.patientList)

    let selectedIndex = records.find((record) => record.name.trim() === answers.patientList.trim())  // finds the record with the same name value as was selected by the user. Identifies it with the index

if (answers.patientList === "Back"){medicalProfessionalMenu()} // if "back" is selected, go to the medical professional menu
else if (selectedIndex){ // if there is truly a selected index present, determined by line 86

  console.log(`ID: ${selectedIndex.ID}`) // this section prints the record at the selected index's details. 
    console.log(`name: ${selectedIndex.name}`) 
    console.log(`age: ${selectedIndex.age}`)
    console.log(`height: ${selectedIndex.height}`)
    console.log(`weight: ${selectedIndex.weight}`)
    console.log(`medical conditions: ${selectedIndex.medicalConditions}`)
    console.log(`medications: ${selectedIndex.medications}`)
        viewPatientList()
} 
  }


 /* function to add a patient into the database. Provides appropriate fields of input, 
 rejects input if it does not meet the validation. 
 Makes these answers into an object.
 Then pushes it to the records.JSON array*/
 async function addPatient(){

    const questions = [
        { name: 'ID', message: 'Enter patient ID:', validate: (value) => /^\d{5}$/.test(value) ? true : 'ID must be 5 digits'}, // Patient ID must be 5 digits. Future ID-assignment would go here. 
        { name: 'name', message: 'Enter patient name:', validate: (value) => { 
          let trimmedValue = value.trim()
          return trimmedValue.length > 2 ? true : 'Name must be more than two characters'}}, // The name, trimmed, must be more than two characters
        { name: 'age', message: 'Enter patient age:', validate: (value) => { 
          const age = parseInt(value);
          return (age >= 0 && age <= 150) ? true : 'Age must be between 0 and 150' // age must be a number between 0 and 150
      } },
        { name: 'height', message: 'Enter patient height (cm):', validate: (value) => parseFloat(value) > 0 ? true : 'Height must be positive' }, // Height must be positive
        { name: 'weight', message: 'Enter patient weight (kg):', validate: (value) => Number.isInteger(parseFloat(value)) && parseFloat(value) > 0 ? true : 'Weight must be a positive integer' }, // weight must be positive
        { name: 'medicalConditions', message: 'Enter patient medical conditions (comma-separated):' },
        { name: 'medications', message: 'Enter patient medications (comma-separated):' }] 
          // A user can escape this function only by killing the terminal. No data will be added. 
        const answers = await inquirer.prompt(questions)
         
         answers.medicalConditions = answers.medicalConditions.split(',').map(str => str.trim()) // makes each part of the string, separated by a comma, an element in the "medical conditions" array
         answers.medications = answers.medications.split(',').map(str => str.trim()) // same as above for medications


          records.push(answers) // pushes the answers to the records array

     const updatedRecordsData = JSON.stringify(records, null, 2) // makes it into an object

     fs.writeFileSync('records.JSON', updatedRecordsData) // syncs it! 
    
     console.log("Patient successfully added! Exit programme to see changes.")
medicalProfessionalMenu()
                             }
                            


/*Function that shows options available to the patient view. 
Functions only on a "shallow" level, but does pull patientIndex from the real records.JSON file
*/
 async function patientMenu() {

     let patientIndex = 1 // this would be determined by a real login function. using index 1 as dummy data. 

     const questions = [{
        type: "list", 
        name: "patientMenu",
        message: "Select an option",
        choices:["View Profile","Edit Profile", "Contact Medical Professional", "Delete Profile", "Back"] // options for the end user

    }]
     const answers = await inquirer.prompt(questions) // awaits the questions to be fulfilled before proceeding

     if (answers.patientMenu === "View Profile"){
        console.log("ID:"+`${records[patientIndex].ID}`), // index 1 selected, this would be populated by how the user logs in, this example is if the user is logged in as 
        console.log("Name:"+ `${records[patientIndex].name}`)
        console.log("Age:"+ `${records[patientIndex].age}`)
        console.log("Height:"+`${records[patientIndex].height}`)
        console.log("Weight:"+`${records[patientIndex].weight}`)
        console.log("Medical Conditions:"+`${records[patientIndex].medicalConditions}`)
        console.log("Medications: "+ `${records[patientIndex].medications}`)
        patientMenu() // displays the patient menu below

     }else if(answers.patientMenu === "Edit Profile"){ // how the input is handled
            detailEdit() // calls this function, rather than doing it internally, leading to callback hell
     }else if(answers.patientMenu === "Contact Medical Professional"){ 
        console.log("Call your hospital on XX-XXX-XXXX") // this is simple enough to not be required to have its own function
        patientMenu() 
     }else if(answers.patientMenu === "Delete Profile")
        {console.log(`Patient Deleted. Returning you to the main menu`) 
       console.log(chalk.blue("Note: The patient hasnt truly been deleted from the database.")) // chalk package used here to make a note that stands out from rest of CLI
       initialMenu() 
}
     else{ initialMenu() } 

                             }




//function to edit a patient's details or go back 
async function detailEdit(){

    const questions = [{ 
        type: "list", 
        name: "valueToEdit",
        message: "Please select which value you'd like to edit",
        choices: [
           // `ID: ${records[1].ID}`, cannot be edited because its an unique identifier
             `Name: ${records[1].name}`, // has the value of records, at index 1, at the .name key. 
             `Age: ${records[1].age}`,
             `Height: ${records[1].height}`,
             `Weight: ${records[1].weight}`,
             `Medical Conditions: ${records[1].medicalConditions}`,
             `Medications: ${records[1].medications}`,
             'Back'

                 ]
    }]
    const answers = await inquirer.prompt(questions)

    if (answers.valueToEdit === 'Back') {
        initialMenu() // Go back to patient menu
    } else {
       editValue()
}} 

async function editValue(){ // shallow concept that conveys how user input would be taken. 
  let entry = readlineSync.question("Please enter what you'd like to change this value to:") // uses readline sync for this, the "entry" variable is used nowhere but on the following line
  console.log(`Changing value to ${entry}`) 
  console.log(chalk.blue("Note: JSON file has not been altered. Purely prototypal purposes. ")) // note 
  patientMenu()
}
