import { computed, defineComponent, h, inject, onMounted, ref, Teleport, watch } from 'vue';
import { PROVIDE_TELEPORT_TARGETS } from './const.js';
import { read } from 'fs';
export const SafeTeleport = defineComponent({
    name: 'SafeTeleport',
    inheritAttrs: false,
    props: {
        to: {
            type: [String, Object],
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { attrs, slots }) {
        const targets = inject(PROVIDE_TELEPORT_TARGETS);

        function isReady() {
            return ((typeof props.to === 'string' && ((targets?.[props.to] != null) ||
                (typeof document !== 'undefined' && !!document.querySelector(props.to)))) ||
                (typeof props.to === 'object' && !!props.to));
        }

        const ready = ref(isReady());
        
        // onMounted(() => {
        //     ready.value = isReady();
        //     // watch(targets, value => console.log(JSON.stringify(value)), { deep: true })
        //     if (targets && typeof props.to === 'string') {
        //         watch(() => targets[props.to], value => {
        //             ready.value = value != null;
        //         });
        //     }

        //     console.warn("Ready? ", ready.value)
        //     if(ready.value){
        //         let targetDiv = document.querySelector(props.to)
        //         let thing =  targetDiv ? "True" : "False"
        //         console.warn("target Div", thing)
        //     }
        // });
        
        const disabledFromTarget = computed(() => typeof props.to === 'string' && targets?.[props.to] === true);
        return () => ready.value
            ? document.querySelector(props.to) && h(Teleport, {
                to: props.to,
                disabled: props.disabled || disabledFromTarget.value,
                ...attrs,
            }, {
                default: () => slots.default?.(),
            })
            : null;
    },
});
