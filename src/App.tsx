import React, { useState } from 'react';
import { Wand2, RotateCcw } from 'lucide-react';
import { useFormData } from './hooks/useFormData';
import { FormField } from './components/FormField';
import { ReferenceMediaSection } from './components/ReferenceMediaSection';
import { ActionSequenceSection } from './components/ActionSequenceSection';
import { JSONOutput } from './components/JSONOutput';
import { AISuggestions } from './components/AISuggestions';
import { UploadSetupInstructions } from './components/UploadSetupInstructions';
import { generateVideoPrompt } from './utils/generatePrompt';
import {
  cameraOptions,
  lightingOptions,
  styleOptions,
  soundEffectOptions,
  musicStyleOptions,
  negativePromptOptions,
  transitionOptions
} from './data/options';

function App() {
  const {
    formData,
    updateField,
    addReferenceImage,
    removeReferenceImage,
    updateReferenceImage,
    addReferenceVideo,
    removeReferenceVideo,
    updateReferenceVideo,
    addActionStep,
    removeActionStep,
    updateActionStep,
    resetForm
  } = useFormData();

  const [showOutput, setShowOutput] = useState(false);

  const handleGenerateJSON = () => {
    setShowOutput(true);
  };

  const handleApplyAISuggestions = (suggestions: any) => {
    Object.entries(suggestions).forEach(([key, value]) => {
      if (value && key in formData) {
        updateField(key as keyof typeof formData, value);
      }
    });
  };

  // File upload is now handled directly in ReferenceMediaSection using the upload service

  const videoPrompt = generateVideoPrompt(formData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Video Prompt Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create comprehensive JSON prompts for AI video generators like Veo 3
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="section-header">
                <Wand2 className="text-blue-600" size={24} />
                Video Prompt Configuration
              </h2>

              <div className="space-y-6">
                {/* Initial Prompt */}
                <FormField
                  label="What do you want to create?"
                  value={formData.initialPrompt}
                  onChange={(value) => updateField('initialPrompt', value)}
                  placeholder="e.g., an ad for an auto parts company"
                  type="textarea"
                  required
                />

                {/* AI Suggestions */}
                <AISuggestions
                  initialPrompt={formData.initialPrompt}
                  onApplySuggestions={handleApplyAISuggestions}
                />

                {/* Scene */}
                <FormField
                  label="Scene Description"
                  value={formData.scene}
                  onChange={(value) => updateField('scene', value)}
                  placeholder="Describe the setting and environment in detail"
                  type="textarea"
                  required
                />

                {/* Character */}
                <FormField
                  label="Character Description"
                  value={formData.character}
                  onChange={(value) => updateField('character', value)}
                  placeholder="Describe the character(s), appearance, clothing, and emotions"
                  type="textarea"
                  required
                />

                {/* Camera */}
                <FormField
                  label="Camera Shot & Movement"
                  value={formData.camera}
                  onChange={(value) => updateField('camera', value)}
                  options={cameraOptions}
                  placeholder="Select camera shots and movements"
                  type="checkbox"
                  maxSelections={3}
                />

                {/* Lighting */}
                <FormField
                  label="Lighting Style"
                  value={formData.lighting}
                  onChange={(value) => updateField('lighting', value)}
                  options={lightingOptions}
                  placeholder="Select lighting styles"
                  type="checkbox"
                  maxSelections={2}
                />

                {/* Style */}
                <FormField
                  label="Visual Style"
                  value={formData.style}
                  onChange={(value) => updateField('style', value)}
                  options={styleOptions}
                  placeholder="Select visual styles"
                  type="checkbox"
                  maxSelections={2}
                />

                {/* Audio Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Audio</h3>
                  
                  <FormField
                    label="Dialogue"
                    value={formData.dialogue}
                    onChange={(value) => updateField('dialogue', value)}
                    placeholder="Any dialogue spoken by characters"
                    type="textarea"
                  />

                  <FormField
                    label="Sound Effects"
                    value={formData.soundEffects}
                    onChange={(value) => updateField('soundEffects', value)}
                    options={soundEffectOptions}
                    placeholder="Select sound effects"
                    type="checkbox"
                    maxSelections={3}
                  />

                  <FormField
                    label="Background Music"
                    value={formData.backgroundMusic}
                    onChange={(value) => updateField('backgroundMusic', value)}
                    options={musicStyleOptions}
                    placeholder="Select background music styles"
                    type="checkbox"
                    maxSelections={2}
                  />
                </div>

                {/* Upload Setup Instructions */}
                <UploadSetupInstructions />

                {/* Reference Media */}
                <ReferenceMediaSection
                  title="Reference Images"
                  items={formData.referenceImages}
                  onAdd={addReferenceImage}
                  onRemove={removeReferenceImage}
                  onUpdate={updateReferenceImage}
                />

                <ReferenceMediaSection
                  title="Reference Videos"
                  items={formData.referenceVideos}
                  onAdd={addReferenceVideo}
                  onRemove={removeReferenceVideo}
                  onUpdate={updateReferenceVideo}
                />

                {/* Negative Prompt */}
                <FormField
                  label="Negative Prompt"
                  value={formData.negativePrompt}
                  onChange={(value) => updateField('negativePrompt', value)}
                  options={negativePromptOptions}
                  placeholder="Select elements to avoid"
                  type="checkbox"
                  maxSelections={5}
                />

                {/* Action Sequence */}
                <ActionSequenceSection
                  actionSteps={formData.actionSteps}
                  onAdd={addActionStep}
                  onRemove={removeActionStep}
                  onUpdate={updateActionStep}
                />

                {/* Transition Settings */}
                <div className="transition-card">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">🎬 Transition Settings</h3>
                  
                  <FormField
                    label="Overall Transition Style"
                    value={formData.overallTransitionStyle || []}
                    onChange={(value) => updateField('overallTransitionStyle', value)}
                    options={transitionOptions}
                    placeholder="Select transition styles for the video"
                    type="checkbox"
                    maxSelections={3}
                  />

                  <FormField
                    label="Transition Rhythm"
                    value={formData.transitionRhythm || []}
                    onChange={(value) => updateField('transitionRhythm', value)}
                    options={[
                      { value: "fast-paced with quick cuts, creating energetic and dynamic rhythm", label: "Fast-paced (Quick Cuts)" },
                      { value: "medium-paced with balanced transitions, creating steady narrative flow", label: "Medium-paced (Balanced Flow)" },
                      { value: "slow-paced with lingering shots, creating contemplative and atmospheric rhythm", label: "Slow-paced (Lingering Shots)" },
                      { value: "varied pacing with mixed transition speeds, creating dynamic and unpredictable rhythm", label: "Varied Pacing (Mixed Speeds)" },
                      { value: "rhythmic cuts matching music beat, creating synchronized audio-visual experience", label: "Musical Rhythm (Beat Sync)" }
                    ]}
                    placeholder="Select the overall rhythm and pacing"
                    type="checkbox"
                    maxSelections={2}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleGenerateJSON}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <Wand2 size={20} />
                    Generate JSON
                  </button>
                  <button
                    onClick={resetForm}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <RotateCcw size={20} />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {showOutput ? (
              <div className="card">
                <JSONOutput prompt={videoPrompt} />
              </div>
            ) : (
              <div className="card">
                <div className="text-center py-12">
                  <Wand2 className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Ready to Generate
                  </h3>
                  <p className="text-gray-500">
                    Fill out the form and click "Generate JSON" to create your video prompt
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Built for AI video generators like Veo 3 by Google. 
            Copy the generated JSON and paste it into your preferred AI video generation tool.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

