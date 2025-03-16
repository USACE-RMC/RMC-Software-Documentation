import React, { createContext, useContext, useState } from "react";

const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [counters, setCounters] = useState({});

  const getCount = (docId, type) => counters[docId]?.[type] || 0;

  const incrementCount = (docId, type) => {
    setCounters((prev) => ({
      ...prev,
      [docId]: {
        ...prev[docId],
        [type]: (prev[docId]?.[type] || 0) + 1,
      },
    }));
  };

  return (
    <CounterContext.Provider value={{ getCount, incrementCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounters = () => useContext(CounterContext);
