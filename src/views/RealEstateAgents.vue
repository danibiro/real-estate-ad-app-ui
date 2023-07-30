<script lang="ts">
import GeneralCUD from "./general/GeneralCUD.vue";
import GeneralGet from "./general/GeneralGet.vue";
import GeneralTable from "./general/GeneralTable.vue";

export default {
  data() {
    return {
      columns: ["Id", "Name", "Email", "Phone number", "Address", "Age"],
    };
  },
  components: {
    GeneralTable,
    GeneralGet,
    GeneralCUD,
  },
};
</script>
<template>
  <GeneralTable :columns="columns" type="agents" />
  <GeneralGet type="agents" />
  <GeneralCUD type="agent" />
</template>
