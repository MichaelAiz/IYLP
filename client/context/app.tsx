import React, { createContext, ReactNode, useState } from "react";

export type AppState = {
    userID: string,
    username: string
    jwt: string
};

const initialState = {};

const AppContext = createContext<{ state?: AppState, setState?: React.Dispatch<React.SetStateAction<AppState | undefined>> }>(initialState);

type AppProviderProps = {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setState] = useState<AppState>();
  const value = { state, setState };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;