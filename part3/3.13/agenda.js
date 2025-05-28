import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI
// const url = 'mongodb://localhost:27017/myBaseDatos'

mongoose
    .connect(url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message)
    })

const agendaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
})

agendaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Agenda = mongoose.model('Agenda', agendaSchema)

export default Agenda
