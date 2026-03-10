import { useRef, useEffect, useCallback } from 'react';
import * as Blockly from 'blockly';
import { toolboxConfig } from '../../blockly/toolboxConfig';
import { compileWorkspaceToRules } from '../../blockly/workspaceToRules';
import { useRuleStore } from '../../store/ruleStore';
import '../../blockly/blocks';
import './BlocklyWorkspace.css';

export function BlocklyWorkspace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const setRules = useRuleStore((s) => s.setRules);

  const handleChange = useCallback(
    (workspace: Blockly.WorkspaceSvg) => {
      const rules = compileWorkspaceToRules(workspace);
      setRules(rules);
    },
    [setRules]
  );

  useEffect(() => {
    if (!containerRef.current || workspaceRef.current) return;

    const workspace = Blockly.inject(containerRef.current, {
      toolbox: toolboxConfig,
      grid: { spacing: 20, length: 3, colour: '#2a2a3a', snap: true },
      zoom: { controls: true, wheel: true, startScale: 0.85 },
      theme: Blockly.Themes.Zelos,
      scrollbars: true,
      trashcan: true,
      sounds: false,
    });

    workspaceRef.current = workspace;

    workspace.addChangeListener(() => {
      handleChange(workspace);
    });

    return () => {
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, [handleChange]);

  return (
    <div className="blockly-workspace-wrapper">
      <div ref={containerRef} className="blockly-container" />
    </div>
  );
}
