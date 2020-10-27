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
  writeActivitySeed,
  writeFollowerSeed,
  writeStudySessions,
  registerStudySessionSeed,
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

const writeSchoolsPromise = []

function writeSchoolsAsync() {
  schoolNames.forEach((school) => {
    writeSchoolsPromise.push(writeSchools(school))
  })
}

const teachers = {}

const writeTeachersPromise = []

function writeTeachersAsync() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    if (teachers[schoolName] === undefined) teachers[schoolName] = []
    for (let j = 0; j < 30; j += 1) {
      const name = faker.name.findName()
      teachers[schoolName].push(name)
      writeTeachersPromise.push(writeTeachers(name, schoolName))
    }
  }
  return Promise.all(writeTeachersPromise)
}


writeSchoolsAsync()


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
  return Promise.all(classPromises)
}

const asyncStudySessions = []
const studySessions = {}

function writeSessions() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    for (let j = 0; j < classes[schoolName].length; j += 1) {
      for (let l = 0; l < 10; l += 1) {
        const className = classes[schoolName][j][0]
        if (studySessions[className] === undefined) studySessions[className] = []
        const sessionName = `${className} Study Session`
        const teacherName = classes[schoolName][j][1]
        const sessionDate = formatDate(faker.date.between(startDate, endDate))
        const sessionURL = faker.internet.url()
        const sessionDescription = faker.lorem.sentence()
        const periodNumber = classes[schoolName][j][3]
        studySessions[className].push([sessionName, sessionURL, sessionDate,sessionDescription, className, teacherName, schoolName, periodNumber])
        asyncStudySessions.push(writeStudySessions(sessionName, sessionURL, sessionDate,sessionDescription, className, teacherName, schoolName, periodNumber))
      }
    }
  }
  return Promise.all(asyncStudySessions)
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

const students = {}
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

const followersAsync = []

function writeFollowers() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    for (let i = 0; i < students[schoolName].length; i += 1) {
      const follower = students[schoolName][i]
      const cache = {}
      for (let m = 0; m < 100; m++) {
        const num = getRandom(students[schoolName].length - 1)
        if (num !== i && !cache[num]) {
          cache[num] = true
          const follows = students[schoolName][num]
          followersAsync.push(
            writeFollowerSeed(follower, schoolName, follows, schoolName).catch(
              (e) => {
                console.log(e)
              }
            )
          )
        } else {
          m -= 1
        }
      }
    }
  }
  return Promise.all(followersAsync)
}


const registeredClasses = {}
const classesAsync = []

function registerClasses() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    if (registeredClasses[schoolName] === undefined) registeredClasses[schoolName] = []
    for (let j = 0; j < students[schoolName].length; j += 1) {
      const studentName = students[schoolName][j]
      const registered = { size: 0 }
      while (registered.size !== 5) {
        const random = getRandom(22)
        if (!registered[random]) {
          registered.size += 1
          registered[random] = true
          const className = classes[schoolName][random][0]
          const teacherName = classes[schoolName][random][1]
          const periodNumber = classes[schoolName][random][3]
          registeredClasses[schoolName].push([studentName, schoolName, className, teacherName, periodNumber])
          classesAsync.push(registerClass(studentName, schoolName, className, teacherName, periodNumber)
          .catch((e) => {console.log(className, random)}))
        }
      }
    }
  }
  return Promise.all(classesAsync)
}


const asyncRegisterStudySessions = []


function registerStudySessions() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    for (let j = 0; j < registeredClasses[schoolName].length; j += 1) {
      const cache = {}
      const studentName = registeredClasses[schoolName][j][0]
      const className = registeredClasses[schoolName][j][2]
      for (let i = 0; i < 5; i++) {
        let num = getRandom(studySessions[className].length - 1)
        if (cache[num] === undefined) {
          cache[num] = true
          const sessionName = studySessions[className][num][0]
          const sessionURL = studySessions[className][num][1]
          const sessionDescription = studySessions[className][num][3]
          asyncRegisterStudySessions.push(registerStudySessionSeed(sessionName, sessionDescription, sessionURL, studentName, schoolName).catch((e) => {console.log(e)}))
        } else {
          i -= 1
        }
      }
    }
  }
  return Promise.all(asyncRegisterStudySessions)
}

const activitiesAsync = []

function writeActivities() {
  for (let k = 0; k < schoolNames.length; k += 1) {
    const schoolName = schoolNames[k]
    for (let j = 0; j < registeredClasses[schoolName].length; j += 1) {
      const studentName = registeredClasses[schoolName][j][0]
      const className = registeredClasses[schoolName][j][2]
      const teacherName = registeredClasses[schoolName][j][3]
      const periodNumber = registeredClasses[schoolName][j][4]
      const activityDate = formatDate(faker.date.between(startDate, endDate))
      const activityDescription = 'Hold this spot for a description'
      const activityName = 'Activity Name'

      activitiesAsync.push(writeActivitySeed(
          activityName,
          activityDate,
          activityDescription,
          studentName,
          schoolName,
          className,
          periodNumber,
          teacherName,
        ).catch((e) => console.log(e)))
    }
  }
  return Promise.all(activitiesAsync)
}

Promise.all(writeSchoolsPromise)
  .then(() => {
    writeTeachersAsync()
  })
  .then(() => {
    writeClasses()
  })
  .then(() => {
    writeSessions()
  })
  .then(() => {
    writeTests()
  })
  .then(() => {
    writeStudents()
  })
  .then(() => {
    writeFollowers()
  })
  .then(() => {
    registerClasses()
  })
  .then(() => {
    registerStudySessions()
  })
  .then(() => {
    writeActivities()
  })
  .then(() => {
    console.log('Done')
  })
  .catch((e) => {
    console.log(e)
  })