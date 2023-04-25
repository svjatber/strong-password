<script setup>
import { useStrongPasswordStore } from "@/stores";
import AppPasswordInput from "./components/AppPasswordInput.vue";

const strongPasswordStore = useStrongPasswordStore();
</script>

<template>
  <AppPasswordInput
    :modelValue="strongPasswordStore.password"
    @update:model-value="strongPasswordStore.setPassword"
  />
</template>

<style scoped></style>
