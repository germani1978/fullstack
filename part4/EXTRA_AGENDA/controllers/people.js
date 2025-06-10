import Agenda from '../models/agenda'
import express from 'express'
// import { app } from './app'

export const agendaRouter =  express.Router()

//get all persons of agenda
agendaRouter.get('/', (request, response) => {
  Agenda.find({}).then(persons => {
    response.json(persons)
  })
})

//get info
agendaRouter.get('/info', (request, response) => {
  Agenda.countDocuments({}).then(count => {
    const date = Date()
    response.send(`<p>Phone has info for ${count} people</p><p>${date}</p>`)
  })
})

agendaRouter.get('/:id', (request, response, next) => {
  Agenda.findById(request.params.id)
    .then(person => response.status(200).json(person))
    .catch(err => {
      next(err)
    })
})

agendaRouter.post('/', (request, response, next) => {
  //extract body
  const body = request.body

  //check if include name and number
  if (!body.name || !body.number)
    return response
      .status(400)
      .json({ error: 'name and number are required' })

  //add new person
  const person = new Agenda({
    name: body.name,
    number: body.number
  })
  person
    .save()
    .then(personSave => {
      response.status(201).json(personSave)
    })
    .catch(err => next(err))
})

agendaRouter.put('/:id', (request, response, next) => {
  //extract body
  const body = request.body

  //validate body
  if (!body.name || !body.number)
    return response
      .status(400)
      .json({ error: 'name and number are required to update' })

  //create object js
  const person = {
    name: body.name,
    number: body.number
  }

  //update person
  Agenda.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(err => next(err))
})

agendaRouter.delete('/:id', (request, response, next) => {
  Agenda.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

