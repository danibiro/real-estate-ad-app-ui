<script lang="ts">
import axiosInstance from "@/config/axios.config";
import LoginDto from "@/dto/login.dto";
import { useLoggedStore } from "@/stores/logged.store";
import { mapWritableState } from "pinia";

export default {
  data() {
    return {
      username: "",
      password: "",
      usernameRules: [
        (v: string) => !!v || "Username is required",
        (v: string) =>
          (v && v.length >= 3) || "Username must be at least 3 characters",
      ],
      showPassword: false,
    };
  },
  methods: {
    login() {
      console.log(this.username + " " + this.password);
      const data = new LoginDto(this.username, this.password);
      axiosInstance
        .post("/login", data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.logged = true;
            this.$router.push("/ads");
          } else {
            this.logged = false;
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapWritableState(useLoggedStore, ["logged"]),
  },
};
</script>

<template>
  <v-form>
    <span>Username</span>
    <v-text-field
      type="text"
      v-model="username"
      :rules="usernameRules"
      required
    />
    <span>Password</span>
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      required
    />
    <v-btn class="mr-4" color="primary" @click="showPassword = !showPassword">
      {{ showPassword ? "Hide" : "Show" }} Password
    </v-btn>
    <v-btn color="primary" @click="login">Login</v-btn>
  </v-form>
</template>
