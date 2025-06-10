import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blog'
const MONGO_URI = 'mongodb://localhost:27017/blog'


export { PORT, MONGO_URI }

