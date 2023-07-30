<script lang="ts">
import AgentInput from "./form/AgentInput.vue";
export default {
  data() {
    return {
      create: true,
      update: false,
    };
  },
  components: {
    AgentInput,
  },
};
</script>

<template>
  <v-container>
    <AgentInput :create="create" :update="update" />
  </v-container>
</template>
