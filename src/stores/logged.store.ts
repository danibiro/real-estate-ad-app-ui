import { defineStore } from "pinia";
export const useLoggedStore = defineStore("logged", {
  state: () => ({
    logged: false,
  }),
});
