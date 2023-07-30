<script lang="ts">
import GeneralGetById from "./get/GeneralGetById.vue";
import { useAdStore } from "@/stores/ad.store";
import { useAgentStore } from "@/stores/agent.store";
import { mapActions, mapWritableState } from "pinia";
import GeneralGetAll from "./get/GeneralGetAll.vue";

export default {
  components: {
    GeneralGetById,
    GeneralGetAll,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(useAdStore, ["getAllAds", "getAllAdIds", "getAdById"]),
    ...mapActions(useAgentStore, [
      "getAllAgents",
      "getAllAgentIds",
      "getAgentById",
    ]),
    getTypeById(id: number) {
      return this.type === "ads" ? this.getAdById(id) : this.getAgentById(id);
    },
    getAllTypeIds() {
      return this.type === "ads" ? this.getAllAdIds() : this.getAllAgentIds();
    },
  },
  computed: {
    ...mapWritableState(useAdStore, ["ads"]),
    ...mapWritableState(useAgentStore, ["agents"]),
    getTypeByIdLabel() {
      return "Sort " + this.type + " by ID";
    },
  },
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="button-center">
        <GeneralGetAll :type="type" />
      </v-col>
      <v-col>
        <GeneralGetById :type="type" />
      </v-col>
    </v-row>
  </v-container>
</template>
