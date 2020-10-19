/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const faker = require("faker")
const {
  writeSchools,
  writeTeachers,
  writeClass,
  writeStudent,
  writeTest,
  registerClass,
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

const classPromises = []

writeClasses()

Promise.all(classPromises)
  .then(() => {
    writeTests()
  })
  .then(() => {
    writeStudents()
  })
  .then(() => {
    registerClasses()
  })
  .then(() => {
    console.log('Done')
  })
  .catch((e) => {
    console.log('error')
  })

function writeClasses() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    if (classes[schoolName] === undefined) classes[schoolName] = []
    for (let j = 0; j < possibleClasses.length; j += 1) {
      const className = possibleClasses[j]
      for (let l = 0; l < 3; l += 1) {
        const teacherName = teachers[schoolName][getRandom(teachers[schoolName].length-1)]
        const periodNumber = l;
        classes[schoolName].push([className, teacherName, schoolName, periodNumber])
        classPromises.push(writeClass(className, teacherName, schoolName, periodNumber).catch((e) => {console.log('error writing class')}))
      }
    }
  }
}

const tests = []


function writeTests() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    for (let j = 0; j < classes[schoolName].length; j += 1) {
      for (let l = 0; l < 10; l++) {
        const className = classes[schoolName][j][0]
        const testName = `${className} Test`
        const teacherName = classes[schoolName][j][1]
        const testDescription = 'Sample Test Description for this test'
        const periodNumber = classes[schoolName][j][3]
        const dateOfTest = formatDate(faker.date.between(startDate, endDate))
        tests.push(writeTest(testName, dateOfTest, testDescription, className, teacherName, schoolName, periodNumber)
        .catch((e) => {console.log('error writing tests')}))
      }
    }
  }
  return Promise.all(tests)

}

const students = []
const studentAsync = []

function writeStudents() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    if (students[schoolName] === undefined) students[schoolName] = []
    for (let j = 0; j < 150; j++) {
      const studentName = faker.name.findName()
      students[schoolName].push(studentName)
      studentAsync.push(writeStudent(studentName, schoolName))
    }
  }
  return Promise.all(studentAsync)
}

const registeredClasses = []
const classesAsync = []

function registerClasses() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    if (registeredClasses[schoolName] === undefined) classes[schoolName] = []
    for (let j = 0; j < students[schoolName].length; j += 1) {
      const studentName = students[schoolName][j]
      const registered = { size: 0 }
      while (registered.size !== 5) {
        const random = getRandom(23)
        if (!registered[random]) {
          registered.size += 1
          registered[random] = true
          const className = classes[schoolName][random][0]
          const teacherName = classes[schoolName][random][1]
          const periodNumber = classes[schoolName][random][3]
          registeredClasses[schoolName].push([studentName, schoolName, className, teacherName, periodNumber])
          classesAsync.push(registerClass(studentName, schoolName, className, teacherName, periodNumber)
          .catch((e) => {console.log(e)}))
        }
      }
    }
  }
  return Promise.all(classesAsync)
}