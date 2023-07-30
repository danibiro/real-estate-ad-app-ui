<script lang="ts">
import GeneralGetById from "../general/get/GeneralGetById.vue";
import AgentInput from "./form/AgentInput.vue";
export default {
  data() {
    return {
      id: 0,
      create: false,
      update: true,
    };
  },
  components: {
    GeneralGetById,
    AgentInput,
  },
  methods: {
    signalIdChange(id: number) {
      this.id = id;
    },
  },
};
</script>

<template>
  <GeneralGetById @update:model-value="signalIdChange" type="agents" />
  <AgentInput :create="create" :update="update" :id="id" />
</template>
