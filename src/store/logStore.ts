import { create } from 'zustand';
import type { LogEntry } from '../types/simulation.types';

interface LogState {
  entries: LogEntry[];
  addEntry: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, updates: Partial<LogEntry>) => void;
}

export const useLogStore = create<LogState>((set) => ({
  entries: [],

  addEntry: (entry) =>
    set((s) => ({
      entries: [
        ...s.entries,
        {
          ...entry,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      ],
    })),

  removeEntry: (id) =>
    set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),

  updateEntry: (id, updates) =>
    set((s) => ({
      entries: s.entries.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),
}));
