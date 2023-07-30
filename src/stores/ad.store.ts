import axiosInstance from "@/config/axios.config";
import { defineStore } from "pinia";
import type Ad from "@/model/ad.model";

export const useAdStore = defineStore("ad", {
  state: () => ({
    backupAds: [] as Ad[],
    ads: [] as Ad[],
  }),

  actions: {
    async getAllAds(): Promise<Ad[]> {
      const adsToSave: Ad[] = await axiosInstance
        .get("/ads")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
        });
      this.backupAds = adsToSave;
      this.ads = adsToSave;
      return adsToSave;
    },

    getAdById(id: number): Ad {
      this.ads = this.backupAds;
      const ad = this.ads.find((ad) => ad.id === id) as Ad;
      this.ads = [];
      this.ads.push(ad);
      return ad;
    },

    getAllAdIds(): number[] {
      this.ads = this.backupAds;
      return this.backupAds.map((ad) => ad.id);
    },
  },
});
