import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SortedDataContextProps {
  children: ReactNode;
}

interface SortedDataContextValue {
  sortedData: any[];
  updateSortedData: (newData: any[]) => void;
}

const SortedDataContext = createContext<SortedDataContextValue | undefined>(undefined);

export const SortedDataProvider: React.FC<SortedDataContextProps> = ({ children }) => {
  const [sortedData, setSortedData] = useState<any[]>([]);

  const updateSortedData = (newData: any[]) => {
    setSortedData(newData);
  };

  return (
    <SortedDataContext.Provider value={{ sortedData, updateSortedData }}>
      {children}
    </SortedDataContext.Provider>
  );
};

export const useSortedData = (): SortedDataContextValue => {
  const context = useContext(SortedDataContext);
  if (!context) {
    throw new Error('useSortedData must be used within a SortedDataProvider');
  }
  return context;
};
