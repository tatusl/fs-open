const mongoose = require('mongoose')

const mongodbPassword = process.env.MONGODB_PASSWORD
const mongodbUsername = process.env.MONGODB_USER
const mongodbHostname = process.env.MONGODB_HOST
const mongodbDBName = process.env.MONGODB_DB_NAME

const mongodbConnectionString = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbHostname}/${mongodbDBName}?retryWrites=true`

mongoose
  .connect(mongodbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
