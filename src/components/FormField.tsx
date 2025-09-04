import React from 'react';
import { DropdownOption } from '../types';

interface FormFieldProps {
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options?: DropdownOption[];
  placeholder?: string;
  type?: 'text' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  maxSelections?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  type = 'text',
  required = false,
  maxSelections
}) => {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : [];
    
    if (checked) {
      if (maxSelections && currentValues.length >= maxSelections) {
        return; // Don't add if max selections reached
      }
      onChange([...currentValues, optionValue]);
    } else {
      onChange(currentValues.filter(v => v !== optionValue));
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="input-field min-h-[100px] resize-vertical"
            required={required}
          />
        );
      case 'select':
        return (
          <div className="space-y-2">
            <select
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              className="select-field"
              required={required}
              aria-label={label}
            >
              <option value="">Select an option...</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {value && (
              <div className="text-sm text-gray-600">
                <strong>Custom:</strong> You can also type your own description
              </div>
            )}
          </div>
        );
      case 'checkbox':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {options.map((option) => {
                const isChecked = selectedValues.includes(option.value);
                const isDisabled = !isChecked && maxSelections && selectedValues.length >= maxSelections;
                
                return (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      isChecked 
                        ? 'bg-blue-50 border border-blue-200' 
                        : isDisabled 
                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                      disabled={isDisabled}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {option.value}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            {maxSelections && (
              <div className="text-sm text-gray-600">
                Select up to {maxSelections} options ({selectedValues.length}/{maxSelections} selected)
              </div>
            )}
            {selectedValues.length > 0 && (
              <div className="text-sm text-gray-600">
                <strong>Selected:</strong> {selectedValues.length} option{selectedValues.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        );
      default:
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="input-field"
            required={required}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
    </div>
  );
};
