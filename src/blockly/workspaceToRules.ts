import * as Blockly from 'blockly';
import type { BlocklyRule, Condition, Action } from '../types/rule.types';

export function compileWorkspaceToRules(workspace: Blockly.Workspace): BlocklyRule[] {
  const rules: BlocklyRule[] = [];
  const topBlocks = workspace.getTopBlocks(true);

  for (const block of topBlocks) {
    if (block.type !== 'if_then_rule') continue;

    const conditionBlock = block.getInputTargetBlock('CONDITIONS');
    const actionBlock = block.getInputTargetBlock('ACTIONS');

    const rule: BlocklyRule = {
      id: block.id,
      label: block.getFieldValue('RULE_LABEL') ?? 'Unnamed Rule',
      conditions: conditionBlock ? extractConditions(conditionBlock) : [],
      actions: actionBlock ? extractActions(actionBlock) : [],
    };

    if (rule.conditions.length > 0 && rule.actions.length > 0) {
      rules.push(rule);
    }
  }

  return rules;
}

function extractConditions(block: Blockly.Block): Condition[] {
  const conditions: Condition[] = [];

  function traverse(b: Blockly.Block): void {
    if (b.type === 'condition_and') {
      const a = b.getInputTargetBlock('A');
      const bBlock = b.getInputTargetBlock('B');
      if (a) traverse(a);
      if (bBlock) traverse(bBlock);
      return;
    }

    switch (b.type) {
      case 'condition_material_equals':
        conditions.push({ type: 'material-equals', value: b.getFieldValue('MATERIAL') });
        break;
      case 'condition_touching_tag':
        conditions.push({ type: 'touching-tag', value: b.getFieldValue('TAG') });
        break;
      case 'condition_velocity_above':
        conditions.push({ type: 'velocity-above', value: b.getFieldValue('VALUE') });
        break;
      case 'condition_temperature_above':
        conditions.push({ type: 'temperature-above', value: b.getFieldValue('VALUE') });
        break;
    }
  }

  traverse(block);
  return conditions;
}

function extractActions(block: Blockly.Block): Action[] {
  const actions: Action[] = [];
  let current: Blockly.Block | null = block;

  while (current) {
    switch (current.type) {
      case 'action_apply_force':
        actions.push({
          type: 'apply-force',
          params: {
            fx: Number(current.getFieldValue('FX')),
            fy: Number(current.getFieldValue('FY')),
          },
        });
        break;
      case 'action_set_friction':
        actions.push({
          type: 'set-friction',
          params: { value: Number(current.getFieldValue('VALUE')) },
        });
        break;
      case 'action_add_temperature':
        actions.push({
          type: 'add-temperature',
          params: { amount: Number(current.getFieldValue('AMOUNT')) },
        });
        break;
      case 'action_ignite':
        actions.push({ type: 'ignite', params: {} });
        break;
      case 'action_set_velocity':
        actions.push({
          type: 'set-velocity',
          params: {
            vx: Number(current.getFieldValue('VX')),
            vy: Number(current.getFieldValue('VY')),
          },
        });
        break;
    }
    current = current.getNextBlock();
  }

  return actions;
}
