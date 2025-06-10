import dotenv from 'dotenv'
dotenv.config()

//PORT
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI
// const url = 'mongodb://localhost:27017/myBaseDatos'


export { PORT, MONGO_URI }