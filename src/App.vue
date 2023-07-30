<script setup lang="ts">
import { mapWritableState } from "pinia";
import { RouterView } from "vue-router";
import { useLoggedStore } from "./stores/logged.store";
import LogoutButton from "./views/auth/LogoutButton.vue";
import SwitchViews from "./views/switch/SwitchViews.vue";
</script>

<script lang="ts">
export default {
  computed: {
    ...mapWritableState(useLoggedStore, ["logged"]),
  },
  components: { LogoutButton, SwitchViews },
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <LogoutButton v-if="logged" />
    <SwitchViews v-if="logged" class="switch-views" />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.switch-views {
  margin-left: 3.5%;
}
</style>
