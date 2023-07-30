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
    deleteAd() {
      axiosInstance
        .delete("/ads", { params: { id: this.id } })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signalAdIdChange(id: number) {
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
          <GeneralGetById @update:model-value="signalAdIdChange" type="ads" />
        </v-col>
        <v-col>
          <v-btn
            class="mr-4"
            color="primary"
            @click="deleteAd"
            :disabled="id === -1"
          >
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
