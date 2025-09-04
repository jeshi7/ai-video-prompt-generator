import { useState } from 'react';
import { FormData, ReferenceMedia, ActionStep } from '../types';

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    initialPrompt: '',
    scene: '',
    character: '',
    camera: [],
    lighting: [],
    style: [],
    dialogue: '',
    soundEffects: [],
    backgroundMusic: [],
    referenceImages: [],
    referenceVideos: [],
    negativePrompt: [],
    actionSteps: [{ step: 1, description: '' }],
    overallTransitionStyle: [],
    transitionRhythm: []
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addReferenceImage = () => {
    setFormData(prev => ({
      ...prev,
      referenceImages: [...prev.referenceImages, { url: '', description: '' }]
    }));
  };

  const removeReferenceImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index)
    }));
  };

  const updateReferenceImage = (index: number, field: keyof ReferenceMedia, value: string) => {
    setFormData(prev => ({
      ...prev,
      referenceImages: prev.referenceImages.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addReferenceVideo = () => {
    setFormData(prev => ({
      ...prev,
      referenceVideos: [...prev.referenceVideos, { url: '', description: '' }]
    }));
  };

  const removeReferenceVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      referenceVideos: prev.referenceVideos.filter((_, i) => i !== index)
    }));
  };

  const updateReferenceVideo = (index: number, field: keyof ReferenceMedia, value: string) => {
    setFormData(prev => ({
      ...prev,
      referenceVideos: prev.referenceVideos.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addActionStep = () => {
    setFormData(prev => ({
      ...prev,
      actionSteps: [...prev.actionSteps, { step: prev.actionSteps.length + 1, description: '' }]
    }));
  };

  const removeActionStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      actionSteps: prev.actionSteps.filter((_, i) => i !== index).map((step, i) => ({
        ...step,
        step: i + 1
      }))
    }));
  };

  const updateActionStep = (index: number, field: keyof ActionStep, value: string) => {
    setFormData(prev => ({
      ...prev,
      actionSteps: prev.actionSteps.map((step, i) => 
        i === index ? { ...step, [field]: value } : step
      )
    }));
  };

  const resetForm = () => {
    setFormData({
      initialPrompt: '',
      scene: '',
      character: '',
      camera: [],
      lighting: [],
      style: [],
      dialogue: '',
      soundEffects: [],
      backgroundMusic: [],
      referenceImages: [],
      referenceVideos: [],
      negativePrompt: [],
      actionSteps: [{ step: 1, description: '' }],
      overallTransitionStyle: [],
      transitionRhythm: []
    });
  };

  return {
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
  };
};

