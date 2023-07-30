<script lang="ts">
import { useAdStore } from "@/stores/ad.store";
import { useAgentStore } from "@/stores/agent.store";
import { mapActions } from "pinia";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(useAdStore, ["getAllAds"]),
    ...mapActions(useAgentStore, ["getAllAgents"]),
  },
};
</script>

<template>
  <v-btn
    class="mr-4"
    color="primary"
    @click="type === 'ads' ? getAllAds() : getAllAgents()"
  >
    Get all {{ type }}
  </v-btn>
</template>
