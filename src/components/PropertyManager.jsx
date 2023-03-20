import React, { useState } from 'react';
import { useConfigContext } from '../providers/ConfigContext.jsx';
import './PropertyManager.css';

export const PropertyManager = () => {
  const { allowDecimals, allowNegative, onAllowDecimalsChange, onAllowNegativeChange, min, setDefaultValue } =
    useConfigContext();

  const [displayValue, setDisplayValue] = useState('');

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    if (newValue === '') {
      setDefaultValue(null);
      return;
    }
    const numericValue = Number(newValue);
    if (!Number.isNaN(numericValue)) {
      setDefaultValue(numericValue);
    }
  };

  return (
    <div>
      <div className="property-group">
        <div className="property">
          <label htmlFor="default-value-input">Default value</label>
          <br />
          <input type="text" id="default-value-input" value={displayValue} onChange={handleValueChange}></input>
        </div>

        <div className="property">
          <input type="checkbox" id="negative-input" value={allowNegative} onChange={onAllowNegativeChange}></input>
          <label htmlFor="negative-input">Allow negative</label>
        </div>

        <div className="property">
          <input type="checkbox" id="decimals-input" value={allowDecimals} onChange={onAllowDecimalsChange}></input>
          <label htmlFor="decimals-input">Allow decimals</label>
        </div>

        <div className="property">
          <label htmlFor="min-input">Min</label>
          <br />
          <input type="text" id="min-input" disabled value={min}></input>
        </div>
      </div>
    </div>
  );
};
