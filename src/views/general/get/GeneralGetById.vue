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
    ...mapActions(useAdStore, ["getAllAdIds", "getAdById"]),
    ...mapActions(useAgentStore, ["getAllAgentIds", "getAgentById"]),
    getTypeById(id: number) {
      return this.type === "ads" ? this.getAdById(id) : this.getAgentById(id);
    },
    getAllTypeIds() {
      return this.type === "ads" ? this.getAllAdIds() : this.getAllAgentIds();
    },
  },
  computed: {
    getTypeByIdLabel() {
      return "Sort " + this.type + " by ID";
    },
  },
};
</script>

<template>
  <v-select
    @update:model-value="getTypeById"
    :items="getAllTypeIds()"
    :item-title="(item) => item"
    :item-value="(item) => item"
    :label="getTypeByIdLabel"
  >
  </v-select>
</template>
