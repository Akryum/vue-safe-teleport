import { reactive } from 'vue'
import { PROVIDE_TELEPORT_TARGETS } from './const.js'
import { SafeTeleport } from './SafeTeleport.js'
import { TeleportTarget } from './TeleportTarget.js'

export { SafeTeleport } from './SafeTeleport.js'
export { TeleportTarget } from './TeleportTarget.js'

export default {
  install (app) {
    app.component('SafeTeleport', SafeTeleport)
    app.component('TeleportTarget', TeleportTarget)
    app.provide(PROVIDE_TELEPORT_TARGETS, reactive({}))
  },
}
