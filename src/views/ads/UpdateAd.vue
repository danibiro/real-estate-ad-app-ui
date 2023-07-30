<script lang="ts">
import AdInput from "./form/AdInput.vue";
import GeneralGetById from "../general/get/GeneralGetById.vue";

export default {
  data() {
    return {
      id: 0,
      create: false,
      update: true,
    };
  },
  components: {
    AdInput,
    GeneralGetById,
  },
  methods: {
    signalIdChange(id: number) {
      this.id = id;
    },
  },
};
</script>

<template>
  <v-container>
    <GeneralGetById @update:model-value="signalIdChange" type="ads" />
    <AdInput :create="create" :update="update" :id="id" />
  </v-container>
</template>
