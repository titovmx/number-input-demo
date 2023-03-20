import React, { useState, useRef, useEffect } from 'react';
import { useConfigContext } from '../providers/ConfigContext.jsx';
import { NumericInputControls } from './NumericInputControls.jsx';
import { preciseMathSubtract, preciseMathSum } from '../utils/number.js';
import './NativeNumericInput.css';

export const NativeNumericInput = ({ value, useCustomControls = true, onValueChange }) => {
  const { min, defaultValue, allowDecimals } = useConfigContext();
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef();

  const max = Number.MAX_SAFE_INTEGER;
  const canIncrement = value < max;
  const handleIncrement = () => {
    // implementation based on input api method ruins decimals math
    // inputRef.current.stepUp();
    // const newValue = inputRef.current.value;
    // onChange(Number(newValue));
    const newValue = preciseMathSum(value ?? 0, 1);
    handleControlsValueChange(Math.min(max, newValue));
  };

  const canDecrement = value > min;
  const handleDecrement = () => {
    // implementation based on input api method ruins decimals math
    // inputRef.current.stepDown();
    // const newValue = inputRef.current.value;
    // onChange(Number(newValue));
    const newValue = preciseMathSubtract(value ?? 0, 1);
    handleControlsValueChange(Math.max(min, newValue));
  };

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
    setDisplayValue(newValue);

    if (newValue === '') {
      onValueChange(null);
      return;
    }

    onValueChange(Number(newValue));
  };

  const handleControlsValueChange = (value) => {
    setDisplayValue(value.toString());
    onValueChange(value);
  };

  return (
    <div className="native-input-container">
      <label htmlFor="native-input">Native Input {useCustomControls && 'with custom controls'}</label>
      <br />
      <input
        ref={inputRef}
        type="number"
        id="native-input"
        min={min}
        step={allowDecimals ? 'any' : 1}
        value={displayValue}
        className={useCustomControls ? 'input-with-custom-controls' : ''}
        onChange={handleValueChange}
      />
      {useCustomControls && (
        <NumericInputControls
          canIncrement={canIncrement}
          canDecrement={canDecrement}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      )}
    </div>
  );
};
