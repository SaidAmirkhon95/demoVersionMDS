// MyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextType {
  aufwandOne: string;
  setAufwandOne: (value: string) => void;
  aufwandTwo: string;
  setAufwandTwo: (value: string) => void;
  aufwandThree: string;
  setAufwandThree: (value: string) => void;
  aufwandFour: string[];
  setAufwandFour: (values: string[]) => void;
  aufwandFive: string[];
  setAufwandFive: (value: string[]) => void;
  aufwandSix: string;
  setAufwandSix: (value: string) => void;
  aufwandSeven: string[];
  setAufwandSeven: (value: string[]) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  industrySector: string[];
  setIndustrySector: (values: string[]) => void;
  companyType: string;
  setCompanyType: (value: string) => void;
  companyLocation: string;
  setCompanyLocation: (value: string) => void;
  companyZipcode: number | undefined;
  setCompanyZipcode: (value: number | undefined) => void;
  selectedCountry: any;
  setSelectedCountry: (value: any) => void;
  contactFirstname: string;
  setContactFirstname: (value: string) => void;
  contactLastname: string;
  setContactLastname: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  companyItExpertsFrom: number | undefined;
  setCompanyItExpertsFrom: (value: number | undefined) => void;
  companyItExpertsTo: number | undefined;
  setCompanyItExpertsTo: (value: number | undefined) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export function MyContextProvider({ children }: { children: ReactNode }) {
  const [aufwandOne, setAufwandOne] = useState<string>('');
  const [aufwandTwo, setAufwandTwo] = useState<string>('');
  const [aufwandThree, setAufwandThree] = useState<string>('');
  const [aufwandFour, setAufwandFour] = useState<string[]>([]);
  const [aufwandFive, setAufwandFive] = useState<string[]>([]);
  const [aufwandSix, setAufwandSix] = useState<string>('');
  const [aufwandSeven, setAufwandSeven] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [industrySector, setIndustrySector] = useState<string[]>([]);
  const [companyType, setCompanyType] = useState<string>('');
  const [companyLocation, setCompanyLocation] = useState<string>('');
  const [companyZipcode, setCompanyZipcode] = useState<number>();
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const [contactFirstname, setContactFirstname] = useState<string>('');
  const [contactLastname, setContactLastname] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [companyItExpertsFrom, setCompanyItExpertsFrom] = useState<number>();
  const [companyItExpertsTo, setCompanyItExpertsTo] = useState<number>();

  return (
    <MyContext.Provider
      value={{
        aufwandOne,
        setAufwandOne,
        aufwandTwo,
        setAufwandTwo,
        aufwandThree,
        setAufwandThree,
        aufwandFour,
        setAufwandFour,
        aufwandFive,
        setAufwandFive,
        aufwandSix,
        setAufwandSix,
        aufwandSeven,
        setAufwandSeven,
        companyName,
        setCompanyName,
        industrySector,
        setIndustrySector,
        companyType,
        setCompanyType,
        companyLocation,
        setCompanyLocation,
        companyZipcode,
        setCompanyZipcode,
        selectedCountry,
        setSelectedCountry,
        contactFirstname,
        setContactFirstname,
        contactLastname,
        setContactLastname,
        contactEmail,
        setContactEmail,
        companyItExpertsFrom,
        setCompanyItExpertsFrom,
        companyItExpertsTo,
        setCompanyItExpertsTo,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}
