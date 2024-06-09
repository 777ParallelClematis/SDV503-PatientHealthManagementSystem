// import inquirer from 'inquirer'
// import fs from 'fs'
// import path from 'path'
// import nodemailer from 'nodemailer';


// // declare variables

// // const transporter = nodemailer.createTransport({
// //     host: "smtp.ethereal.email",
// //     port: 587,
// //     secure: false, 
// //     auth: {
// //       user: "phealthportal@gmail.com", // THESE WOULD BE VERY ENCRYPTED AND DEFINITELY NOT STORED IN PLAIN TEXT
// //       pass: "NotAPasswordThatCouldBeGuessed",
// //     },
// //   })

// const recordsData = fs.readFileSync('records.JSON', 'utf8')
// const records = JSON.parse(recordsData)

// console.log("Welcome to RecordPortal 1.0")

// // Function to show initial menu
// async function initialMenu(){
//     const questions = [{
//         type: "list",
//         name: "viewOptions",
//         message: "Select one",
//         choices: ["I am a Medical Professional", "I am a Patient", "Other, Contact Developer"]
//     }]
    
//     const answers = await inquirer.prompt(questions);
//     if (answers.viewOptions === "I am a Medical Professional") {
//         medicalProfessionalMenu();
//     } else if (answers.viewOptions === "I am a Patient") {
//         patientMenu()
//     } else {
//         contactDeveloper()

//     }
// }
// initialMenu()

// // function to show the medical professional menu of actions that can be made
// async function medicalProfessionalMenu() {
//     const questions = [{
//     type: "list",
//     name: "medicalProfessionalMenu", 
//     message: "Select an option", 
//     choices: ["View Patient List", "Add a Patient", "Exit"] 
//     }]
//     const answers = await inquirer.prompt(questions)
//     if (answers.medicalProfessionalMenu === "View Patient List"){
//         viewPatientList()
//     }else if (answers.medicalProfessionalMenu === "Add a Patient"){
//         addPatient()
//     }else{initialMenu()}
// }


// async function contactDeveloper() {



//     // send mail with defined transport object
//     // const info = await transporter.sendMail({
//     //   from: '"Patient Health Portal System" <erin-colane@live.nmit.ac.nz>', // sender address
//     //   to: "erin.colane@live.nmit.ac.nz", // 
//     //   subject: "testing", // Subject line
//     //   text: "Hello world?", // plain text body
//     //   html: "<b>Hello world?</b>", // html body
//     // })
  
//     // console.log("Message sent: %s", info.messageId);

//   }

// // function for a medical professional to view a list of their patients or input an ID number
// async function viewPatientList(){
//     const choices = ['input ID number', ...records.map(record => record.name)]

//     const questions = [{
//         type: "list", 
//         name: "patientList",
//         message: "Select a patient to view", 
//         choices: choices
//     }]

//     const answers = await inquirer.prompt(questions)
//     // appropriate code here
//     console.log(`Selected patient: ${answers.patientList}`)
// }


// // function to add a patient into the database (FUNCTIONAL! YAY!)
// async function addPatient(){
//     const questions = [
//         { name: 'ID', message: 'Enter patient ID:' },
//         { name: 'name', message: 'Enter patient name:' },
//         { name: 'age', message: 'Enter patient age:' },
//         { name: 'height', message: 'Enter patient height (cm):' },
//         { name: 'weight', message: 'Enter patient weight (kg):' },
//         { name: 'medicalConditions', message: 'Enter patient medical conditions (comma-separated):' },
//         { name: 'medications', message: 'Enter patient medications (comma-separated):' }] // test with/without comma between final brackets

//       const answers = await inquirer.prompt(questions)

//             answers.medicalConditions = answers.medicalConditions.split(',').map(str => str.trim())
//             answers.medications = answers.medications.split(',').map(str => str.trim())

//      const recordsData = fs.readFileSync('records.JSON', 'utf8')
//      const records = JSON.parse(recordsData)

//      records.push(answers)

//      const updatedRecordsData = JSON.stringify(records, null, 2)

//      fs.writeFileSync('records.JSON', updatedRecordsData)
    
//      console.log("Patient successfully added!")

// }


// async function patientMenu() {
//     console.log("Patient menu loading ...")
//     const questions = [{
//         type: "list", 
//         name: "patientMenu",
//         message: "Select an option",
//         choices:["View Profile","Edit Profile", "Contact Medical Professional"]

  
//     }]
//     const answers = await inquirer.prompt(questions)

// }


// function to find smallest available ID number. 
// ID numbers must be between 10000 and 99999. 

function newID(){
    records.JSON
}
// smallest integer in this range that isnt listed. 