// object-oriented database. each client is an object and contains key value pairs

// Patient data

/*let fullName

//if log in is true and string length of log in = 5

let patient = {
patientID: "0001"
fullName: "Arnold Archer"
username: "archer123"

}

// Medical professional data
//if login is true and string length of log in = 3

let medPro = {
    medProID: 001
    medName: "Abby Arachnid"

}

let medPro = {
    medProID: 002,
    medName: "Bruce Barnacle"

}

let medPro = {
medProID: 003, 
medName: "Carlie Closs"
}
*/


// database.js
const data = [
    { firstName: "John", age: 50 },
    { firstName: "Jane", age: 30 }
]

function getData() {
    return data
}

module.exports = {
    getData
}


const patient = {
firstName: "John",
age: 50
}
console.log(patient.firstName + " is " + patient.age) 