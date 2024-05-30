const readlineSync = require("readline-sync")

// makes sure essential packages and files are present

//display a log in 
// (readline) menu to choose 1 (medical professional) or 2 (patient)
const logInChoiceOptions = ["Medical Professional, Hippocrates", "Patient, Carly Closs"]
const selectedIndexA = readlineSync.keyInSelect(logInChoiceOptions, 'Log in as:');

if (selectedIndexA !== -1) {
    const selectedOptionA = logInChoiceOptions[selectedIndexA];
    console.log(`You selected: ${selectedOptionA}`)

    //switch/case statement
}
/*
// display patient menu 
const patientOptions = ["See profile", "Contact Medical Professional", "Exit"]
// readline to either:
// 1 See profile
// 2 Contact medical professional (readline sync and nodemailer)
// 3 Exit



// display medpro menu 
const medProOptions = ["View Patient/s", "Add patient", "Exit"]
// readline to either:
// 1 View Patients ()
// 2 Add patient ()
// 3 Exit

*/