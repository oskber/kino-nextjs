"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Tickets {
  adult: number;
  senior: number;
  child: number;
}

interface TicketContextType {
  tickets: Tickets;
  screeningId: string;
  setScreeningId: (id: string) => void;
  resetScreeningId: () => void;
  incrementTicket: (type: keyof Tickets) => void;
  decrementTicket: (type: keyof Tickets) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = useState<Tickets>({
    adult: 0,
    senior: 0,
    child: 0,
  });
  const [screeningId, setScreeningId] = useState<string>("");

  const incrementTicket = (type: keyof Tickets) => {
    setTickets((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrementTicket = (type: keyof Tickets) => {
    setTickets((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));
  };

  const resetScreeningId = () => {
    setScreeningId("");
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        screeningId,
        setScreeningId,
        resetScreeningId,
        incrementTicket,
        decrementTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};
