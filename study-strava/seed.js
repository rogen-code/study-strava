/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const faker = require("faker")
const {
  writeSchools,
  writeTeachers,
  writeClass,
  writeStudent,
  writeTest
} = require("./db/mysql.js")

const { formatDate, startDate, endDate } = require("./timeSeed.js")

function getRandom(n) {
  return Math.floor(Math.random() * n + 1)
}

const schoolNames = [
  "Hawken",
  "South Mecklenburg High School",
  "Providence Day",
  "Charlotte Latin",
]

schoolNames.forEach((school) => {
  writeSchools(school)
})

let i = 0

const teachers = {}

for (let k = 0; k < schoolNames.length; k += 1) {
  const schoolName = schoolNames[k]
  if (teachers[schoolName] === undefined) teachers[schoolName] = []
  for (let j = 0; j < 30; j += 1) {
    let name = faker.name.findName()
    teachers[schoolName].push(name)
    writeTeachers(name, schoolName)
  }
}

const possibleClasses = [
  "English",
  "Algebra",
  "AP World History",
  "AP US History",
  "AP Psychology",
  "Lunch",
  "Biology",
  "World History",
]

const classes = {}

for (let k = 0; k < schoolNames.length; k += 1) {
  const schoolName = schoolNames[k]
  if (classes[schoolName] === undefined) classes[schoolName] = []
  for (let j = 0; j < possibleClasses.length; j += 1) {
    const className = possibleClasses[j]
    for (let l = 0; l < 3; l += 1) {
      const teacherName = teachers[schoolName][getRandom(teachers[schoolName].length-1)]
      writeClass(className, teacherName, schoolName)
      classes[schoolName].push([teacherName, className])
      for (let m = 0; m < 10; m += 1) {
        const dateOfTest = formatDate(startDate, endDate)
        const testDescription = faker.lorem.text(max_nb_chars = 50)
        const testName = `${className} Test`
        writeTest(testName, dateOfTest, testDescription, className, teacherName, schoolName)
      }
    }
  }
}

i = 0

const students = {}

while (i < 1000) {
  const studentName = faker.name.findName()
  const schoolName = schoolNames[getRandom(schoolNames.length - 1)]
  if (students[schoolName] === undefined) students[schoolName] = []
  students[schoolName].push(studentName)
  writeStudent(studentName, schoolName)
  i += 1
}


// for (let key in students) {
//   for (let z = 0; z < students[key].length; z += 1) {
//     const studentName = students[key][z]
//     const teacherName = classes[key][getRandom(classes[key].length - 1)][0]
//     const className = classes[key][getRandom(classes[key].length - 1)][1]
//     registerClass(studentName, key, className, teacherName)
//   }
// }
// console.log('registered!')
