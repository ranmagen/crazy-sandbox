import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'condition_material_equals',
    message0: 'Material is %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'MATERIAL',
        options: [
          ['Wood', 'wood'],
          ['Steel', 'steel'],
          ['Rubber', 'rubber'],
          ['Ice', 'ice'],
          ['Glass', 'glass'],
        ],
      },
    ],
    output: 'Condition',
    colour: 210,
    tooltip: 'True when the body is made of this material',
  },
  {
    type: 'condition_touching_tag',
    message0: 'Is touching %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'TAG',
        options: [
          ['Magnet', 'magnet'],
          ['Air Blower', 'blower'],
          ['Spring', 'spring'],
          ['Gear', 'gear'],
        ],
      },
    ],
    output: 'Condition',
    colour: 210,
    tooltip: 'True when the body is in contact with a part that has this tag',
  },
  {
    type: 'condition_velocity_above',
    message0: 'Speed above %1',
    args0: [{ type: 'field_number', name: 'VALUE', value: 5, min: 0 }],
    output: 'Condition',
    colour: 210,
    tooltip: 'True when the body is moving faster than this speed',
  },
  {
    type: 'condition_temperature_above',
    message0: 'Temperature above %1 °C',
    args0: [{ type: 'field_number', name: 'VALUE', value: 100, min: 0 }],
    output: 'Condition',
    colour: 210,
    tooltip: 'True when the body temperature exceeds this value',
  },
]);
