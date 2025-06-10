import { app } from './app'
import { PORT } from './utils/config'
import { info } from './utils/logger'

//listen on PORT
app.listen(PORT, () => {
  info('Server on PORT', PORT)
})