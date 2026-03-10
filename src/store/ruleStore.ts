import { create } from 'zustand';
import type { BlocklyRule } from '../types/rule.types';

interface RuleState {
  rules: BlocklyRule[];
  setRules: (rules: BlocklyRule[]) => void;
  clearRules: () => void;
}

export const useRuleStore = create<RuleState>((set) => ({
  rules: [],
  setRules: (rules) => set({ rules }),
  clearRules: () => set({ rules: [] }),
}));
