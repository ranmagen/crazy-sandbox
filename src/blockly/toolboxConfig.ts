// Use a plain object cast to any to avoid Blockly deep type conflicts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toolboxConfig: any = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Rules',
      colour: '290',
      contents: [{ kind: 'block', type: 'if_then_rule' }],
    },
    {
      kind: 'category',
      name: 'Conditions',
      colour: '210',
      contents: [
        { kind: 'block', type: 'condition_material_equals' },
        { kind: 'block', type: 'condition_touching_tag' },
        { kind: 'block', type: 'condition_velocity_above' },
        { kind: 'block', type: 'condition_temperature_above' },
        { kind: 'block', type: 'condition_and' },
      ],
    },
    {
      kind: 'category',
      name: 'Actions',
      colour: '65',
      contents: [
        { kind: 'block', type: 'action_apply_force' },
        { kind: 'block', type: 'action_set_friction' },
        { kind: 'block', type: 'action_add_temperature' },
        { kind: 'block', type: 'action_set_velocity' },
        { kind: 'block', type: 'action_ignite' },
      ],
    },
  ],
};
