import React, { createContext, useState, useContext, ReactNode } from 'react';

type SettingsContextType = {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

/**
 * @description SettingsProvider component that provides the theme context to its children.
 * @param {ReactNode} children - The child components that will have access to the settings context
 */
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * @description Custom hook to use the SettingsContext.
 * The settings context contains the theme and its setter function.
 * @throws {Error} If the hook is used outside of a SettingsProvider.
 */
export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      'useSettingsContext must be used within a SettingsProvider',
    );
  }
  return context;
};
