import { useState } from 'react';
import { BlocklyWorkspace } from './BlocklyWorkspace';
import { useRuleStore } from '../../store/ruleStore';
import { useChallengeStore } from '../../store/challengeStore';
import { useLogStore } from '../../store/logStore';
import type { Challenge, LogEntry } from '../../types/simulation.types';
import './ControlPanel.css';

type Tab = 'logic' | 'challenges' | 'log';

export function ControlPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('logic');
  const rules = useRuleStore((s) => s.rules);

  return (
    <div className="control-panel">
      <div className="control-tabs">
        <button
          className={`ctrl-tab ${activeTab === 'logic' ? 'active' : ''}`}
          onClick={() => setActiveTab('logic')}
        >
          Logic
        </button>
        <button
          className={`ctrl-tab ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          Challenges
        </button>
        <button
          className={`ctrl-tab ${activeTab === 'log' ? 'active' : ''}`}
          onClick={() => setActiveTab('log')}
        >
          Log
        </button>
      </div>

      {activeTab === 'logic' && (
        <div className="logic-tab">
          <div className="rules-summary">
            {rules.length === 0 ? (
              <p className="rules-empty">
                No active rules. Add blocks below to define behaviors.
              </p>
            ) : (
              <ul className="rules-list">
                {rules.map((r) => (
                  <li key={r.id} className="rule-item">
                    <span className="rule-label">{r.label}</span>
                    <span className="rule-meta">
                      {r.conditions.length} cond · {r.actions.length} act
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <BlocklyWorkspace />
        </div>
      )}

      {activeTab === 'challenges' && <ChallengesTab />}
      {activeTab === 'log' && <LogTab />}
    </div>
  );
}

function ChallengesTab() {
  const challenges = useChallengeStore((s) => s.challenges);

  return (
    <div className="challenges-tab">
      <h3 className="tab-heading">Challenge Center</h3>
      <div className="challenges-list">
        {challenges.map((c: Challenge) => {
          const done = c.objectives.filter((o) => o.completed).length;
          const total = c.objectives.length;
          return (
            <div key={c.id} className="challenge-card">
              <div className="challenge-header">
                <span className="challenge-title">{c.title}</span>
                <span className="challenge-progress">{done}/{total}</span>
              </div>
              <p className="challenge-desc">{c.description}</p>
              <ul className="objectives-list">
                {c.objectives.map((o) => (
                  <li key={o.id} className={`objective ${o.completed ? 'done' : ''}`}>
                    {o.completed ? '✓' : '○'} {o.description}
                  </li>
                ))}
              </ul>
              <p className="challenge-hint">💡 {c.hint}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LogTab() {
  const entries = useLogStore((s) => s.entries);
  const addEntry = useLogStore((s) => s.addEntry);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    addEntry({ title: title.trim(), content: content.trim() });
    setTitle('');
    setContent('');
  };

  return (
    <div className="log-tab">
      <h3 className="tab-heading">Inventor's Log</h3>
      <div className="log-editor">
        <input
          className="log-input"
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="log-textarea"
          placeholder="What did you discover today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <button className="log-save-btn" onClick={handleSave}>
          Save Entry
        </button>
      </div>
      <div className="log-entries">
        {entries.map((entry: LogEntry) => (
          <div key={entry.id} className="log-entry">
            <div className="log-entry-title">{entry.title}</div>
            <div className="log-entry-date">
              {new Date(entry.timestamp).toLocaleString()}
            </div>
            <p className="log-entry-content">{entry.content}</p>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="log-empty">No entries yet. Document your discoveries!</p>
        )}
      </div>
    </div>
  );
}
