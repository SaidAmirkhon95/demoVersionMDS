import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  responseData: any;
  updateResponseData: (newData: any) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [responseData, setResponseData] = useState<any | null>(null);

  const updateResponseData = (newData: any) => {
    setResponseData(newData);
  };

  return (
    <DataContext.Provider value={{ responseData, updateResponseData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
