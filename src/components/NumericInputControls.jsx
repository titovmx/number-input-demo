import React from 'react';
import './NumericInputControls.css';

export const NumericInputControls = ({ canIncrement, canDecrement, onIncrement, onDecrement }) => {
  return (
    <div className="numeric-input-controls">
      <button onClick={onIncrement} disabled={!canIncrement}>
        ^
      </button>
      <button onClick={onDecrement} disabled={!canDecrement}>
        ^
      </button>
    </div>
  );
};
