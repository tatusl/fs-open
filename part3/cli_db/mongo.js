const mongoose = require('mongoose')

//As per exercise instructions, password is read as command line argument
const mongodbPassword = encodeURI(process.argv[2])
const mongodbUsername = process.env.MONGODB_USER
const mongodbHostname = process.env.MONGODB_HOST
const mongodbDBName = process.env.MONGODB_DB_NAME

const mongodbConnectionString = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbHostname}/${mongodbDBName}?retryWrites=true`

const addPerson = (name, number) => {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

const listPeople = () => {
  Person.find({}).then(result => {
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

const printUsage = () => {
  console.log('Error: Insufficient arguments')
  console.log(
    'Usage for adding person: node mongo.js <password> <person_name> <person_phonenumber>'
  )
  console.log('Usage for displaying people: node mongo.js <password>')
  process.exit(1)
}

mongoose.connect(mongodbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phohebook:')
  listPeople()
} else if (process.argv.length === 5) {
  const personName = process.argv[3]
  const personPhoneNumber = process.argv[4]
  addPerson(personName, personPhoneNumber)
} else {
  printUsage()
}
