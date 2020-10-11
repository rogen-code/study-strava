/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const faker = require("faker")
const {
  writeSchools,
  writeTeachers,
  writeClass,
  writeStudent,
  registerClass
} = require("./db/mysql.js")

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

const teachers = []

while (i < 100) {
  let name = faker.name.findName()
  let school = schoolNames[getRandom(schoolNames.length - 1)]
  teachers.push([name, school])
  writeTeachers(name, school)
  i += 1
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
  if (classes[schoolName] === undefined) classes[schoolName] = [];
  for (let j = 0; j < possibleClasses.length; j += 1) {
    const teacherName = teachers[getRandom(teachers.length - 1)][0]
    const className = possibleClasses[j]
    classes[schoolName].push([teacherName, className])
  }
}

for (const school in classes) {
  const schoolName = school;
  for (let x = 0; x < classes[school].length; x += 1) {
    const teacherName = classes[school][x][0]
    const className = classes[school][x][1]
    writeClass(className, teacherName, schoolName)
  }
}

i = 0

const students = {}

while (i < 1000) {
  const studentName = faker.name.findName()
  const schoolName = schoolNames[getRandom(schoolNames.length - 1)]
  if (students[schoolName] === undefined) students[schoolName] = [];
  students[schoolName].push(studentName)
  writeStudent(studentName, schoolName)
  i += 1
}

for (const key in students) {
  const schoolName = key
  for (let z = 0; z < students[key].length; z += 1) {
    const studentName = students[key][z]
    const teacherName = classes[key][getRandom(classes[key].length - 1)][0]
    const className = classes[key][getRandom(classes[key].length - 1)][1]

    registerClass(studentName, schoolName, className, teacherName)
  }
}
console.log('registered!')
