<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const disabled = ref(false)
const targetVisible = ref(true)
const targetDisabled = ref(false)
const msg = ref('Hello world')
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-4xl">
      Vue Safe Teleport
    </h1>

    <!-- Controls -->
    <div class="flex flex-col md:flex-row md:items-center gap-6">
      <label class="flex gap-1 items-baseline cursor-pointer select-none">
        <input
          v-model="disabled"
          type="checkbox"
        >
        <span>Teleport disabled</span>
      </label>

      <label class="flex gap-1 items-baseline cursor-pointer select-none">
        <input
          v-model="targetVisible"
          type="checkbox"
        >
        <span>Target visible</span>
      </label>

      <label class="flex gap-1 items-baseline cursor-pointer select-none">
        <input
          v-model="targetDisabled"
          type="checkbox"
        >
        <span>Target disabled</span>
      </label>

      <input
        v-model="msg"
        placeholder="Message"
        class="px-2 py-1 border border-neutral-300 dark:border-neutral-700 rounded"
      >
    </div>

    <div
      v-if="targetVisible"
      class="border-2 border-red-500 rounded-2xl p-4"
    >
      <h2 class="text-red-500 pb-4">
        Target
      </h2>
      <TeleportTarget
        id="target"
        :disabled="targetDisabled"
      />
    </div>

    <div class="border-2 border-green-500 rounded-2xl p-4">
      <h2 class="text-green-500 pb-4">
        Source
      </h2>

      <SafeTeleport
        to="#target"
        :disabled="disabled"
      >
        <HelloWorld :msg="msg" />
      </SafeTeleport>
    </div>
  </div>
</template>
