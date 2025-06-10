import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const MONGO_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_URI_TEST
  : process.env.MONGO_URI


export { PORT, MONGO_URI }

// MONGO_URI=mongodb+srv://fullstack:1234567890@cluster0.g9rjvve.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
