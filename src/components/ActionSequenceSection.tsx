import React, { memo } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ActionStep } from '../types';
import { transitionOptions } from '../data/options';

interface ActionSequenceSectionProps {
  actionSteps: ActionStep[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof ActionStep, value: string) => void;
}

export const ActionSequenceSection: React.FC<ActionSequenceSectionProps> = memo(({
  actionSteps,
  onAdd,
  onRemove,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Action Sequence</h3>
        <button
          type="button"
          onClick={onAdd}
          className="btn-secondary flex items-center gap-2"
        >
          <Plus size={16} />
          Add Step
        </button>
      </div>
      
      {actionSteps.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p>No action steps defined yet</p>
          <p className="text-sm">Click "Add Step" to create your video sequence</p>
        </div>
      ) : (
        <div className="space-y-4">
          {actionSteps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">
                  Step {step.step}
                </h4>
                {actionSteps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove this step"
                    aria-label="Remove this step"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Description
                  </label>
                  <textarea
                    value={step.description}
                    onChange={(e) => onUpdate(index, 'description', e.target.value)}
                    placeholder="Describe what happens in this step of the video..."
                    className="input-field min-h-[80px] resize-vertical"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transition to Next Scene
                    </label>
                    <select
                      value={step.transition || ''}
                      onChange={(e) => onUpdate(index, 'transition', e.target.value)}
                      className="input-field"
                      aria-label="Select transition type"
                    >
                      <option value="">Select transition...</option>
                      {transitionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      value={step.duration || ''}
                      onChange={(e) => onUpdate(index, 'duration', e.target.value)}
                      className="input-field"
                      aria-label="Select duration"
                    >
                      <option value="">Select duration...</option>
                      <option value="0.5 seconds">0.5 seconds</option>
                      <option value="1 second">1 second</option>
                      <option value="2 seconds">2 seconds</option>
                      <option value="3 seconds">3 seconds</option>
                      <option value="5 seconds">5 seconds</option>
                      <option value="10 seconds">10 seconds</option>
                      <option value="15 seconds">15 seconds</option>
                      <option value="30 seconds">30 seconds</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ActionSequenceSection.displayName = 'ActionSequenceSection';
