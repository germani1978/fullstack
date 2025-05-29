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
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        required: true,
        validate: function (value) {
            return /^\d{2,3}-\d+$/.test(value)
        },
        message: props =>
            'El número debe tener el formato XX-XXXXXX o XXX-XXXXXX'
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
