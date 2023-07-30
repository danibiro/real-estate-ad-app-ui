import axiosInstance from "@/config/axios.config";
import type Agent from "@/model/agent.model";
import { defineStore } from "pinia";

export const useAgentStore = defineStore("agent", {
  state: () => ({
    backupAgents: [] as Agent[],
    agents: [] as Agent[],
  }),

  actions: {
    async getAllAgents(): Promise<Agent[]> {
      const agentsToSave: Agent[] = await axiosInstance
        .get("/agents")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
        });
      this.backupAgents = agentsToSave;
      this.agents = agentsToSave;
      return agentsToSave;
    },

    getAgentById(id: number): Agent {
      this.agents = this.backupAgents;
      const agent = this.agents.find((agent) => agent.id === id) as Agent;
      this.agents = [];
      this.agents.push(agent);
      return agent;
    },

    getAllAgentIds(): number[] {
      this.agents = this.backupAgents;
      return this.backupAgents.map((agent) => agent.id);
    },
  },
});
