<script lang="ts">
import type Ad from "@/model/ad.model";
import type Agent from "@/model/agent.model";
import { useAdStore } from "@/stores/ad.store";
import { useAgentStore } from "@/stores/agent.store";
import { mapActions, mapWritableState } from "pinia";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: [] as Ad[] | Agent[],
    };
  },
  beforeMount() {
    this.type === "ads" ? this.getAllAds() : this.getAllAgents();
  },
  methods: {
    ...mapActions(useAdStore, ["getAllAds"]),
    ...mapActions(useAgentStore, ["getAllAgents"]),
  },
  computed: {
    ...mapWritableState(useAdStore, ["ads"]),
    ...mapWritableState(useAgentStore, ["agents"]),
  },
};
</script>

<template>
  <v-container v-if="type === 'ads' ? ads.length !== 0 : agents.length !== 0">
    <v-table density="comfortable">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in type === 'ads' ? ads : agents" :key="element.id">
          <td
            class="table-element"
            v-for="(value, index) in Object.values(element)"
            :key="index"
          >
            <template v-if="type === 'ads' && index === 5">
              {{ new Date(value).toLocaleDateString() }}
            </template>
            <template v-else>
              {{ value }}
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<style>
.table-element {
  text-align: center;
}
</style>
