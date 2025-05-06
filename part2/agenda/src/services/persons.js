import axios from 'axios'
const UrlBase = 'http://localhost:3001/persons'

const getAll = () => axios.get(UrlBase)

const create = newObject => axios.post(UrlBase, newObject)

export { getAll, create }
