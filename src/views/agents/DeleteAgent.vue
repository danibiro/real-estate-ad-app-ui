<script lang="ts">
import axiosInstance from "@/config/axios.config";
import GeneralGetById from "../general/get/GeneralGetById.vue";
export default {
  components: {
    GeneralGetById,
  },
  data() {
    return {
      id: -1,
    };
  },
  methods: {
    deleteAgent() {
      axiosInstance
        .delete("/agents", { params: { id: this.id } })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signalAgentIdChange(id: number) {
      this.id = id;
    },
  },
};
</script>

<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col>
          <GeneralGetById
            @update:model-value="signalAgentIdChange"
            type="agents"
          />
        </v-col>
        <v-col>
          <v-btn
            class="mr-4"
            color="primary"
            @click="deleteAgent"
            :disabled="id === -1"
            >Delete</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
