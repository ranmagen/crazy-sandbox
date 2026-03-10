import { create } from 'zustand';
import type { Challenge } from '../types/simulation.types';
import { challenges } from '../challenges';

interface ChallengeState {
  activeChallengeId: string | null;
  challenges: Challenge[];
  setActiveChallenge: (id: string | null) => void;
  completeObjective: (challengeId: string, objectiveId: string) => void;
  resetChallenges: () => void;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  activeChallengeId: null,
  challenges: challenges.map((c) => ({
    ...c,
    objectives: c.objectives.map((o) => ({ ...o, completed: false })),
  })),

  setActiveChallenge: (id) => set({ activeChallengeId: id }),

  completeObjective: (challengeId, objectiveId) =>
    set((s) => ({
      challenges: s.challenges.map((c) =>
        c.id !== challengeId
          ? c
          : {
              ...c,
              objectives: c.objectives.map((o) =>
                o.id !== objectiveId ? o : { ...o, completed: true }
              ),
            }
      ),
    })),

  resetChallenges: () =>
    set({
      challenges: challenges.map((c) => ({
        ...c,
        objectives: c.objectives.map((o) => ({ ...o, completed: false })),
      })),
    }),
}));
