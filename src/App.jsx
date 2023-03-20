import React, { useState } from 'react';
import { NativeNumericInput } from './components/NativeNumericInput.jsx';
import { CustomNumericInput } from './components/CustomNumericInput.jsx';
import { PropertyManager } from './components/PropertyManager.jsx';
import { ConfigContextProvider } from './providers/ConfigContext.jsx';

export const App = () => {
  const [value, setValue] = useState(null);

  return (
    <ConfigContextProvider>
      <div className="main">
        <h1>Number Input Demo</h1>

        <div className="container">
          <div className="input-area">
            <NativeNumericInput value={value} onValueChange={setValue} useCustomControls={false}></NativeNumericInput>
            <NativeNumericInput value={value} onValueChange={setValue}></NativeNumericInput>
            <CustomNumericInput value={value} onValueChange={setValue}></CustomNumericInput>
          </div>

          <div className="property-manager">
            <PropertyManager></PropertyManager>
          </div>
        </div>
      </div>
    </ConfigContextProvider>
  );
};
