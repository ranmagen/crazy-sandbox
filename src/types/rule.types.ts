export type ConditionType =
  | 'material-equals'
  | 'touching-tag'
  | 'velocity-above'
  | 'temperature-above'
  | 'is-ignited';

export type ActionType =
  | 'apply-force'
  | 'set-friction'
  | 'set-velocity'
  | 'set-property'
  | 'ignite'
  | 'add-temperature';

export interface Condition {
  type: ConditionType;
  value: string;
}

export interface Action {
  type: ActionType;
  params: Record<string, string | number>;
}

export interface BlocklyRule {
  id: string;
  label: string;
  conditions: Condition[]; // AND'd together
  actions: Action[];
}
