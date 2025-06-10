import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const agendaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    validate: function (value) {
      return /^\d{2,3}-\d+$/.test(value)
    },
    message: () =>
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

export const Agenda = mongoose.model('Agenda', agendaSchema)
