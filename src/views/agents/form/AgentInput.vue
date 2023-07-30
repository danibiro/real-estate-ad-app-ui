<script lang="ts">
import axiosInstance from "@/config/axios.config";
import AgentCreationDTO from "@/dto/agentCreation.dto";
import type Agent from "@/model/agent.model";

export default {
  props: {
    create: {
      type: Boolean,
      required: true,
    },
    update: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      rules: {
        name: [
          (v: string) => !!v || "Name is required",
          (v: string) =>
            (v && v.length <= 20) || "Name must be less than 20 characters",
        ],
        email: [
          (v: string) => !!v || "E-mail is required",
          (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        address: [
          (v: string) => !!v || "Address is required",
          (v: string) =>
            (v && v.length <= 50) || "Address must be less than 50 characters",
        ],
        phone: [
          (v: string) =>
            !v ||
            (v && v.length <= 20) ||
            "Phone number must be less than 20 characters",
          (v: string) =>
            /^\+?[0-9]*$/.test(v) ||
            "Phone must contain only digits and a + at the beginning",
        ],
        age: [
          (v: number) => !!v || "Age is required",
          (v: number) =>
            (v && v >= 18) ||
            "You really think you can be an agent under 18? lol.",
          (v: number) =>
            (v && v <= 130) ||
            "For real? Come on, even the Guiness Records say you can't be that old",
        ],
      },
      agent: {} as Agent,
    };
  },
  methods: {
    submit() {
      const data = new AgentCreationDTO(
        this.agent.name,
        this.agent.email,
        this.agent.phone,
        this.agent.address,
        this.agent.age
      );
      if (this.create && this.update) {
        console.error("Can't create and update at the same time");
      } else if (this.create) {
        axiosInstance
          .post("/agents", data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (this.update) {
        axiosInstance
          .put("/agents", data, {
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
      this.agent = {} as Agent;
    },
  },
  computed: {
    disabled() {
      for (const rule of this.rules.name) {
        if (rule(this.agent.name) !== true) {
          return true;
        }
      }
      for (const rule of this.rules.email) {
        if (rule(this.agent.email) !== true) {
          return true;
        }
      }
      for (const rule of this.rules.address) {
        if (rule(this.agent.address) !== true) {
          return true;
        }
      }
      for (const rule of this.rules.phone) {
        if (rule(this.agent.phone) !== true) {
          return true;
        }
      }
      for (const rule of this.rules.age) {
        if (rule(this.agent.age) !== true) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>
<template>
  <v-form>
    <v-row>
      <v-col>
        <v-text-field
          type="text"
          v-model="agent.name"
          label="Name"
          :rules="rules.name"
          outlined
          required
        />
      </v-col>
      <v-col>
        <v-text-field
          type="text"
          v-model="agent.email"
          label="Email"
          :rules="rules.email"
          outlined
          required
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          type="text"
          v-model="agent.address"
          label="Address"
          :rules="rules.address"
          outlined
          required
        />
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
              type="text"
              v-model="agent.phone"
              label="Phone"
              :rules="rules.phone"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              class="age-text-field"
              type="number"
              v-model="agent.age"
              label="Age"
              :rules="rules.age"
              outlined
              required
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          model="flat"
          color="secondary"
          @click="submit"
          :disabled="disabled"
          >Submit</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<style>
.age-text-field {
  height: 115%;
}
</style>
