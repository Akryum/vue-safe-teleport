import { computed, defineComponent, h, inject, onMounted, PropType, ref, Teleport, watch } from 'vue'
import { PROVIDE_TELEPORT_TARGETS, TeleportTargets } from './const'

export const SafeTeleport = defineComponent({
  name: 'SafeTeleport',

  inheritAttrs: false,

  props: {
    to: {
      type: [String, Object] as PropType<string | HTMLElement>,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { attrs, slots }) {
    const targets = inject<TeleportTargets>(PROVIDE_TELEPORT_TARGETS)

    function isReady () {
      return (
        (typeof props.to === 'string' && (
          (targets?.[props.to] != null) ||
          (typeof document !== 'undefined' && !!document.querySelector(props.to))
        )) ||
        (typeof props.to === 'object' && !!props.to)
      )
    }

    const ready = ref(isReady())

    onMounted(() => {
      ready.value = isReady()

      // watch(targets, value => console.log(JSON.stringify(value)), { deep: true })
      if (targets && typeof props.to === 'string') {
        watch(() => targets[props.to as string], value => {
          ready.value = value != null
        })
      }
    })

    const disabledFromTarget = computed(() => typeof props.to === 'string' && targets?.[props.to] === true)

    return () => ready.value
      ? h(Teleport, {
        to: props.to,
        disabled: props.disabled || disabledFromTarget.value,
        ...attrs,
      }, {
        default: () => slots.default?.(),
      })
      : null
  },
})
