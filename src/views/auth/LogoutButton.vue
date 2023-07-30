<script lang="ts">
import axiosInstance from "@/config/axios.config";
import { useLoggedStore } from "@/stores/logged.store";
import { mapWritableState } from "pinia";

export default {
  methods: {
    logout() {
      axiosInstance.get("/logout").then((response) => {
        console.log(response);
        this.logged = false;
        this.$router.push("/login");
      });
    },
  },
  computed: {
    ...mapWritableState(useLoggedStore, ["logged"]),
  },
};
</script>

<template>
  <v-btn color="primary" @click="logout">Logout</v-btn>
</template>
