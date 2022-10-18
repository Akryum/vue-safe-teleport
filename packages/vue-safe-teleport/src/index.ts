import { reactive } from 'vue'
import { PROVIDE_TELEPORT_TARGETS } from './const'
import { SafeTeleport } from './SafeTeleport'
import { TeleportTarget } from './TeleportTarget'

export { SafeTeleport } from './SafeTeleport'
export { TeleportTarget } from './TeleportTarget'

export default {
  install (app) {
    app.component('SafeTeleport', SafeTeleport)
    app.component('TeleportTarget', TeleportTarget)
    app.provide(PROVIDE_TELEPORT_TARGETS, reactive({}))
  },
}
