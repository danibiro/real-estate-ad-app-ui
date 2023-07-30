<script lang="ts">
import GeneralTable from "./general/GeneralTable.vue";
import GeneralGetAll from "./general/GeneralGet.vue";
import GeneralCUD from "./general/GeneralCUD.vue";
import { useAdStore } from "@/stores/ad.store";
import { mapActions } from "pinia";

export default {
  data() {
    return {
      columns: [
        "Id",
        "Title",
        "Description",
        "Address",
        "Price",
        "Created",
        "Negotiability",
        "Area",
        "Agent nr",
      ],
    };
  },
  methods: {
    ...mapActions(useAdStore, ["getAllAds"]),
  },
  components: {
    GeneralTable,
    GeneralGetAll,
    GeneralCUD,
  },
  beforeMount() {
    this.getAllAds();
  },
};
</script>

<template>
  <GeneralTable :columns="columns" type="ads" />
  <GeneralGetAll type="ads" />
  <GeneralCUD type="ad" />
</template>
