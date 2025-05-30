import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('Need more argument')
  process.exit()
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.g9rjvve.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const personShema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person', personShema)

const listPersons = () => {
  mongoose
    .connect(url)
    .then(() =>
      Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
          console.log(`${person.name}  ${person.number}`)
        })
      })
    )
    .catch(err => console.error(err))
    .finally(() => mongoose.connection.close())
}

const addPerson = (name, number) => {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({ name, number })
      return person.save()
    })
    .then(() => {
      console.log(`Added ${name} ${number} to the phonebook`)
    })
    .catch(err => console.error(err))
    .finally(() => mongoose.connection.close())
}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  addPerson(name, number)
}

if (process.argv.length === 3) {
  listPersons()
}
