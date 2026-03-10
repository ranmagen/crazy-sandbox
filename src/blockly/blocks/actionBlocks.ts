import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'action_apply_force',
    message0: 'Apply Force X: %1 Y: %2',
    args0: [
      { type: 'field_number', name: 'FX', value: 0 },
      { type: 'field_number', name: 'FY', value: -0.01 },
    ],
    previousStatement: 'Action',
    nextStatement: 'Action',
    colour: 65,
    tooltip: 'Apply a force vector to the matching body each tick',
  },
  {
    type: 'action_set_friction',
    message0: 'Set Friction to %1',
    args0: [{ type: 'field_number', name: 'VALUE', value: 0.1, min: 0, max: 1 }],
    previousStatement: 'Action',
    nextStatement: 'Action',
    colour: 65,
    tooltip: 'Override the friction of the matching body',
  },
  {
    type: 'action_add_temperature',
    message0: 'Add %1 °C',
    args0: [{ type: 'field_number', name: 'AMOUNT', value: 5, min: 0 }],
    previousStatement: 'Action',
    nextStatement: 'Action',
    colour: 65,
    tooltip: 'Increase the body temperature by this amount per tick',
  },
  {
    type: 'action_ignite',
    message0: 'Ignite',
    previousStatement: 'Action',
    nextStatement: 'Action',
    colour: 0,
    tooltip: 'Set the body on fire!',
  },
  {
    type: 'action_set_velocity',
    message0: 'Set Velocity X: %1 Y: %2',
    args0: [
      { type: 'field_number', name: 'VX', value: 0 },
      { type: 'field_number', name: 'VY', value: -5 },
    ],
    previousStatement: 'Action',
    nextStatement: 'Action',
    colour: 65,
    tooltip: 'Override the velocity of the matching body',
  },
]);
