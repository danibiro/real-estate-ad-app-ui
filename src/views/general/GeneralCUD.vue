<script lang="ts">
import NewAd from "../ads/NewAd.vue";
import NewAgent from "../agents/NewAgent.vue";
import DeleteAd from "../ads/DeleteAd.vue";
import DeleteAgent from "../agents/DeleteAgent.vue";
import UpdateAd from "../ads/UpdateAd.vue";
import UpdateAgent from "../agents/UpdateAgent.vue";

export default {
  components: {
    NewAd,
    NewAgent,
    DeleteAd,
    DeleteAgent,
    UpdateAd,
    UpdateAgent,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <v-container>
    <h1>New {{ type }}</h1>
    <template v-if="type === 'ad'">
      <NewAd />
    </template>
    <template v-else-if="type === 'agent'">
      <NewAgent />
    </template>
    <h1>Delete {{ type }}</h1>
    <template v-if="type === 'ad'">
      <DeleteAd />
    </template>
    <template v-else-if="type === 'agent'">
      <DeleteAgent />
    </template>
    <h1>Update {{ type }}</h1>
    <template v-if="type === 'ad'">
      <UpdateAd />
    </template>
    <template v-else-if="type === 'agent'">
      <UpdateAgent />
    </template>
  </v-container>
</template>
