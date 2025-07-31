import { create } from "zustand"
import type { Candidate } from "../types/candidate"

interface ScoutDialogState {
  isOpen: boolean
  candidate: Candidate | null
  openDialog: (candidate: Candidate) => void
  closeDialog: () => void
}

export const useScoutDialog = create<ScoutDialogState>((set) => ({
  isOpen: false,
  candidate: null,
  openDialog: (candidate) => set({ isOpen: true, candidate }),
  closeDialog: () => set({ isOpen: false, candidate: null }),
}))
