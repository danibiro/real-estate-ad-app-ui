<script lang="ts">
import axiosInstance from "@/config/axios.config";
import AdCreationDTO from "@/dto/adCreation.dto";
import { mapWritableState } from "pinia";
import { useAdStore } from "@/stores/ad.store";
import type Ad from "@/model/ad.model";

export default {
  props: {
    create: Boolean,
    update: Boolean,
    id: Number,
  },
  methods: {
    submit() {
      this.ad.dateOfCreation = new Date();
      const data = new AdCreationDTO(
        this.ad.title,
        this.ad.description,
        this.ad.address,
        this.ad.price,
        this.ad.dateOfCreation,
        this.ad.negotiable == null ? false : this.ad.negotiable,
        this.ad.area,
        this.ad.agentId
      );
      console.log(this.create, this.update);
      if (this.create && this.update) {
        console.error("Can't create and update at the same time");
      } else if (this.create) {
        axiosInstance
          .post("/ads", data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (this.update) {
        axiosInstance
          .put("/ads", data, {
            params: {
              id: this.id,
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    changeNegotiability() {
      this.ad.negotiable = !this.ad.negotiable;
    },
    getAgentIds() {
      axiosInstance.get("/agents").then((response) => {
        this.agentIds = response.data.map((agent: any) => agent.id);
      });
      return this.agentIds;
    },
  },
  data() {
    return {
      ex4: "red",
      ad: {} as Ad,
      titleRules: [
        (v: string) => !!v || "Title is required",
        (v: string) =>
          (v && v.length <= 40) || "Title must be less than 40 characters",
      ],
      descriptionRules: [
        (v: string) => !!v || "Description is required",
        (v: string) =>
          (v && v.length <= 100) ||
          "Description must be less than 100 characters",
      ],
      addressRules: [
        (v: string) => !!v || "Address is required",
        (v: string) =>
          (v && v.length <= 40) || "Address must be less than 40 characters",
      ],
      priceRules: [
        (v: number) => !!v || "Price is required",
        (v: number) => (v && !isNaN(Number(v))) || "Price has to be a number",
        (v: number) => (v && v > -1) || "Price must be positive",
        (v: number) => (v && v < 2147483647) || "Price is too big",
      ],
      areaRules: [
        (v: number) => !!v || "Area is required",
        (v: number) => (v && !isNaN(Number(v))) || "Area has to be a number",
        (v: number) => (v && v > -1) || "Area must be positive",
        (v: number) => (v && v < 2147483647) || "Area is too big",
      ],
      agentIdRules: [
        (v: number) => !!v || "Agent ID is required",
        (v: number) =>
          (v && !isNaN(Number(v))) || "Agent ID has to be a number",
        (v: number) => (v && v > -1) || "Agent ID must be positive",
        (v: number) => (v && v < 2147483647) || "Agent ID is too big",
      ],
      agentIds: [],
    };
  },
  computed: {
    ...mapWritableState(useAdStore, {
      ads: "ads",
    }),

    disabled() {
      for (const rule of this.titleRules) {
        if (rule(this.ad.title) !== true) {
          return true;
        }
      }
      for (const rule of this.descriptionRules) {
        if (rule(this.ad.description) !== true) {
          return true;
        }
      }
      for (const rule of this.addressRules) {
        if (rule(this.ad.address) !== true) {
          return true;
        }
      }
      for (const rule of this.priceRules) {
        if (rule(this.ad.price) !== true) {
          return true;
        }
      }
      for (const rule of this.areaRules) {
        if (rule(this.ad.area) !== true) {
          return true;
        }
      }
      for (const rule of this.agentIdRules) {
        if (rule(this.ad.agentId) !== true) {
          return true;
        }
      }
      return false;
    },
  },
  beforeMount() {
    this.getAgentIds();
  },
};
</script>

<template>
  <v-form>
    <v-row>
      <v-col>
        <v-text-field
          type="text"
          id="title"
          v-model="ad.title"
          :rules="titleRules"
          placeholder="Title of the real estate"
          label="Title"
          outlined
          required
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-textarea
          :rules="descriptionRules"
          v-model="ad.description"
          label="Description"
          placeholder="Describe your real estate"
          outlined
          required
        />
      </v-col>
      <v-col cols="-4">
        <v-textarea
          :rules="addressRules"
          v-model="ad.address"
          label="Address"
          placeholder="The address of your real estate"
          required
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-text-field
          type="number"
          id="price"
          v-model="ad.price"
          label="Price"
          :rules="priceRules"
          placeholder="Price of the real estate"
          required
        />
      </v-col>
      <v-col cols="auto">
        <v-btn
          depressed
          color="orange"
          v-model="ad.negotiable"
          @click="changeNegotiability()"
        >
          {{ ad.negotiable ? "Negotiable" : "Fixed" }}
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-text-field
          type="number"
          id="area"
          v-model="ad.area"
          label="Area"
          :rules="areaRules"
          placeholder="Area of the real estate"
          required
        />
      </v-col>
      <v-col>
        <v-select
          v-on:click="getAgentIds()"
          v-model="ad.agentId"
          :items="agentIds"
          label="Agent ID"
          required
        />
      </v-col>
    </v-row>
    <v-btn model="flat" color="secondary" @click="submit" :disabled="disabled">
      Submit
    </v-btn>
  </v-form>
</template>
