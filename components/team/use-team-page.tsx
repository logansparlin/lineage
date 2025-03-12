import { create } from "zustand";

interface TeamPageStore {
  expandedMember: string | null;
  setExpandedMember: (member: string | null) => void;
}

export const useTeamPageStore = create<TeamPageStore>((set) => ({
  expandedMember: null,
  setExpandedMember: (member) => set({ expandedMember: member }),
}));