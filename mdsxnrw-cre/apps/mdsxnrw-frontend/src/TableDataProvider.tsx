import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TableData {
  company: string;
  form: string;
  branch: string;
  ort: string;
  plz: string;
  land: string;
  vorname: string;
  nachname: string;
  email: string;
  connectorName: string;
  connectorTyp: string;
  dauer: string;
  fte: string;
  gui: string;
  mdsGui: string;
  cloudAnbieter: string;
  cloud: string;
  itKnowHow: string;
  odrl: string;
  openSource: string;
  deployment: string;
  serviceLevel: string;
}

interface TableContextType {
  tableData: TableData;
  updateTableData: (data: Partial<TableData>) => void;
}

const TableDataContext = createContext<TableContextType | undefined>(undefined);

export const TableDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tableData, setTableData] = useState<TableData>({
    company: '',
    form: '',
    branch: '',
    ort: '',
    plz: '',
    land: '',
    vorname: '',
    nachname: '',
    email: '',
    connectorName: '',
    connectorTyp: '',
    dauer: '',
    fte: '',
    gui: '',
    mdsGui: '',
    cloudAnbieter: '',
    cloud: '',
    itKnowHow: '',
    odrl: '',
    openSource: '',
    deployment: '',
    serviceLevel: '',
  });

  const updateTableData = (data: Partial<TableData>) => {
    setTableData({ ...tableData, ...data });
  };

  return (
    <TableDataContext.Provider value={{ tableData, updateTableData }}>
      {children}
    </TableDataContext.Provider>
  );
};

export const useTableData = (): TableContextType => {
  const context = useContext(TableDataContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableDataProvider');
  }
  return context;
};
