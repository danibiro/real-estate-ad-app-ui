import { useLoggedStore } from "./../stores/logged.store";
import axiosInstance from "@/config/axios.config";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/ads",
    },
    {
      path: "/ads",
      name: "ads",
      component: () => import("../views/RealEstateAds.vue"),
    },
    {
      path: "/agents",
      name: "agents",
      component: () => import("../views/RealEstateAgents.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/LoginPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/login",
    },
  ],
});

const isLoggedIn = async (): Promise<boolean> => {
  return axiosInstance
    .get("/introspect")
    .then((response) => {
      if (response.status === 200) {
        console.log("User is logged in");
        return true;
      }
      console.log("User is not logged in");
      return false;
    })
    .catch(() => {
      console.log("User is not logged in");
      return false;
    });
};

const protectedRoutes: string[] = ["ads", "agents"];

router.beforeEach(async (to, from, next) => {
  const isProtected = protectedRoutes.includes(to.name?.toString() || "");
  const logged = await isLoggedIn();
  useLoggedStore().$patch({ logged });
  if (isProtected && !logged) {
    next({
      path: "/login",
    });
  } else {
    if (to.name === "login" && logged) {
      next({
        path: "/ads",
      });
    } else {
      next();
    }
  }
});

export default router;
