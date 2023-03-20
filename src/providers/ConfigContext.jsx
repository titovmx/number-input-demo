import React, { useContext, useState, useMemo, useCallback } from 'react';

const ConfigContext = React.createContext(undefined);

export const ConfigContextProvider = ({ children }) => {
  const [allowDecimals, setAllowDecimals] = useState(false);
  const [allowNegative, setAllowNegative] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);

  const onAllowDecimalsChange = useCallback(() => {
    const newValue = !allowDecimals;
    if (!newValue && defaultValue !== null) {
      setDefaultValue(Math.floor(defaultValue));
    }
    setAllowDecimals(newValue);
  }, [allowDecimals, defaultValue]);

  const onAllowNegativeChange = useCallback(() => {
    const newValue = !allowNegative;
    if (!newValue && defaultValue !== null) {
      setDefaultValue(Math.max(defaultValue, 0));
    }
    setAllowNegative(newValue);
  }, [allowNegative, defaultValue]);

  const contextValue = useMemo(
    () => ({
      allowDecimals,
      onAllowDecimalsChange,
      allowNegative,
      onAllowNegativeChange,
      min: allowNegative ? Number.MIN_SAFE_INTEGER : 0,
      defaultValue,
      setDefaultValue,
    }),
    [allowDecimals, allowNegative, onAllowDecimalsChange, onAllowNegativeChange, defaultValue],
  );

  return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

export const useConfigContext = () => useContext(ConfigContext);
