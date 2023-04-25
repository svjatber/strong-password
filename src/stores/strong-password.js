import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useStrongPasswordStore = defineStore("strong_password", () => {
  const password = ref("");
  const setPassword = (value) => (password.value = value);
  return {
    password,
    setPassword,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStrongPasswordStore, import.meta.hot)
  );
}
