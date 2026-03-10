import './conditionBlocks';
import './actionBlocks';

// Main rule block
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'if_then_rule',
    message0: 'Rule: %1',
    args0: [{ type: 'field_input', name: 'RULE_LABEL', text: 'My Rule' }],
    message1: 'IF %1',
    args1: [{ type: 'input_value', name: 'CONDITIONS', check: 'Condition' }],
    message2: 'THEN %1',
    args2: [{ type: 'input_statement', name: 'ACTIONS', check: 'Action' }],
    colour: 290,
    tooltip: 'Define a rule: if conditions are met, apply actions',
    hat: 'cap',
  },
  {
    type: 'condition_and',
    message0: '%1 AND %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Condition' },
      { type: 'input_value', name: 'B', check: 'Condition' },
    ],
    output: 'Condition',
    colour: 210,
    tooltip: 'Both conditions must be true',
  },
]);
