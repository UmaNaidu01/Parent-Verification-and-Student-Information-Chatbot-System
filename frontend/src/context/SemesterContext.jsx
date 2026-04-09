import React, { createContext, useContext, useState } from 'react';

const SemesterContext = createContext();

export const useSemester = () => {
  return useContext(SemesterContext);
};

export const SemesterProvider = ({ children }) => {
  const [selectedSemester, setSelectedSemester] = useState('all');
  
  return (
    <SemesterContext.Provider value={{ selectedSemester, setSelectedSemester }}>
      {children}
    </SemesterContext.Provider>
  );
};
