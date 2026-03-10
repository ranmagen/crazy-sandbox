export interface GaugeReading {
  instanceId: string;
  speed: number;       // m/s equivalent
  temperature: number; // degrees C
  force: { x: number; y: number };
}

export interface ChallengeObjective {
  id: string;
  description: string;
  completed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  objectives: ChallengeObjective[];
  hint: string;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  title: string;
  content: string;
  screenshotDataUrl?: string;
}
