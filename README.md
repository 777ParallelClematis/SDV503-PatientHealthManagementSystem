# SDV503-PatientHealthManagementSystem
A SDV503 project 

Functions for future development:

*ID list which creates an array of all current ID's*
let IDList = records.map(record => Number(record.ID)) 

**can quickly check if an ID is in here by using this condition:**
if(IDList.includes)

*function to find smallest available ID number*
*ID numbers must be between 10000 and 99999*

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

*Es6 nodemailer import function*
import nodemailer from 'nodemailer'

**line ~177 deleting patients**
  records.slice(patientIndex, 1) // takes out just one elemenet of the records.JSON array
  //this could would work if the records were able to be updates. it only works with shallow copies rather than deleting it from the file system   
//  // work with file system here !!