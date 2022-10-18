<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <p>{{ msg }}</p>

  <button
    type="button"
    @click="count++"
  >
    count is {{ count }}
  </button>
</template>
