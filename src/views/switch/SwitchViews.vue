<script lang="ts">
export default {
  methods: {
    switchView() {
      if (this.$route.path === "/ads") {
        this.$router.push("/agents");
      } else {
        this.$router.push("/ads");
      }
    },
  },

  computed: {
    profile() {
      return this.$route.path === "/ads" ? "agents" : "ads";
    },
  },
};
</script>

<template>
  <v-btn color="primary" @click="switchView">Switch to {{ profile }}</v-btn>
</template>
