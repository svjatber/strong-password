<template>
  <div class="progress">
    <progress max="100" :value="value"></progress>
    <p data-test="validation-summary" class="text-center"><slot /></p>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  color: String,
  value: Number,
});
</script>
<style scoped>
progress {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
}
::-webkit-progress-bar {
  background-color: aliceblue;
  border-radius: 5px;
}
::-webkit-progress-value {
  background-color: v-bind("props.color");
  border-radius: 5px;
}
</style>
