import { App } from 'vue'
import registerComponents from './register-components'
import registerElement from './register-element'
import registerFormat from './register-properties'

export function globalRegister(app: App) {
  app.use(registerElement)
  app.use(registerFormat)
  app.use(registerComponents)
}
