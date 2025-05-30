import axios from 'axios'

const UrlBase = '/api/persons/'

const getAll = () => axios.get(UrlBase)

const create = newObject => axios.post(UrlBase, newObject)

const update = (id, objectUpdate) => axios.put(UrlBase + id, objectUpdate)

const deletePerson = id => axios.delete(UrlBase + id)

export { getAll, create, deletePerson, update }
