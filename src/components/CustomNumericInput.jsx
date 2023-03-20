import React, { useState, useRef, useEffect } from 'react';
import { NumericInputControls } from './NumericInputControls.jsx';
import { useConfigContext } from '../providers/ConfigContext.jsx';
import { preciseMathSubtract, preciseMathSum, isValidNumberInput } from '../utils/number.js';
import './CustomNumericInput.css';

export const CustomNumericInput = ({ value, onValueChange }) => {
  const { min, defaultValue, allowDecimals, allowNegative } = useConfigContext();
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef();

  const max = Number.MAX_SAFE_INTEGER;
  const canIncrement = value < max;
  const handleIncrement = () => {
    const newValue = preciseMathSum(value ?? defaultValue ?? 0, 1);
    handleControlsValueChange(Math.min(max, newValue));
  };

  const canDecrement = value > min;
  const handleDecrement = () => {
    const newValue = preciseMathSubtract(value ?? defaultValue ?? 0, 1);
    handleControlsValueChange(Math.max(min, newValue));
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === 'ArrowDown' && canDecrement) {
        handleDecrement();
        e.preventDefault();
      } else if (e.code === 'ArrowUp' && canIncrement) {
        handleIncrement();
        e.preventDefault();
      }
    };

    inputRef.current.addEventListener('keydown', handleKeydown);

    return () => inputRef.current.removeEventListener('keydown', handleKeydown);
  }, [canIncrement, canDecrement]);

  useEffect(() => {
    const newDisplayValue = (value ?? '').toString();
    setDisplayValue(newDisplayValue);
  }, [value]);

  useEffect(() => {
    if (value === null) {
      const newDisplayValue = (defaultValue ?? '').toString();
      setDisplayValue(newDisplayValue);
    }
  }, [defaultValue]);

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    if (!isValidNumberInput(newValue, { allowDecimals, allowNegative })) {
      return;
    }
    setDisplayValue(newValue);
    if (newValue === '') {
      onValueChange(null);
      return;
    }
    const newValueWithDecimalPoint = newValue.replace(',', '.');
    const newNumericValue = Number(newValueWithDecimalPoint);
    if (newValueWithDecimalPoint !== '' && !Number.isNaN(newNumericValue)) {
      onValueChange(newNumericValue);
    }
  };

  const handleControlsValueChange = (value) => {
    setDisplayValue(value.toString());
    onValueChange(value);
  };

  return (
    <div className="custom-input-container">
      <label htmlFor="custom-input">Custom Input</label>
      <br />
      <input ref={inputRef} type="text" id="custom-input" value={displayValue} onChange={handleValueChange} />
      <NumericInputControls
        canIncrement={canIncrement}
        canDecrement={canDecrement}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
};
