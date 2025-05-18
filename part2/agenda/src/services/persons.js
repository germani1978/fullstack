import axios from 'axios'
const UrlBase =
    'https://b982dade-1dbe-4137-a12f-030295291a69-00-2r8yl32bjq4vy.riker.replit.dev/api/persons'

const getAll = () => axios.get(UrlBase)

const create = newObject => axios.post(UrlBase, newObject)

const update = (id, objectUpdate) => axios.put(UrlBase + id, objectUpdate)

const deletePerson = id => axios.delete(UrlBase + id)

export { getAll, create, deletePerson, update }
