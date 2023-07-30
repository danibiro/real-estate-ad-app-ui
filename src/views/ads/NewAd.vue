<script lang="ts">
import AdInput from "./form/AdInput.vue";

export default {
  data() {
    return {
      create: true,
      update: false,
    };
  },
  components: {
    AdInput,
  },
};
</script>

<template>
  <v-container>
    <AdInput :create="create" :update="update" />
  </v-container>
</template>
