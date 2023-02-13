import { computed, defineComponent, h, inject, onBeforeUnmount, onMounted } from 'vue'
import { PROVIDE_TELEPORT_TARGETS, TeleportTargets } from './const.js'

export const TeleportTarget = defineComponent({
  name: 'TeleportTarget',

  inheritAttrs: false,

  props: {
    id: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      default: 'div',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { attrs, slots }) {
    const targets = inject<TeleportTargets>(PROVIDE_TELEPORT_TARGETS)

    if (!targets) {
      throw new Error(`[vue-safe-teleport] Plugin not installed in Vue app, cannot use <TeleportTarget>.`)
    }

    const id = `#${props.id}`

    const disabled = computed(() => props.disabled)

    onMounted(() => {
      // Unwrapping
      targets[id] = disabled as unknown as boolean
    })

    onBeforeUnmount(() => {
      delete targets[id]
    })

    return () => h(props.tag, { id: props.id, ...attrs }, { default: () => slots.default?.() })
  },
})
