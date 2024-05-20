'use client';
import React from 'react';
import { useTickets } from 'app/contexts/TicketContext';

const TicketSelector = () => {
  const { tickets, incrementTicket, decrementTicket, totalPrice } =
    useTickets();

  const renderTicketSelector = (
    type: keyof typeof tickets,
    label: string,
    price: string,
  ) => {
    return (
      <div className="grid grid-cols-12 items-center my-2">
        <div className="col-span-12 sm:col-span-4 text-center sm:text-left py-3" data-cy={`${type}Ticket`}>
          {label}
        </div>
        <div className="col-span-12 sm:col-span-4 flex items-center justify-center py-2">
          <button
            onClick={() => decrementTicket(type)}
            className="px-4 py-2 bg-custom_yellow rounded-lg"
            data-cy={`${type}Ticket__button__decrement`}
          >
            -
          </button>
          <span className="mx-4">{tickets[type]}</span>
          <button
            onClick={() => incrementTicket(type)}
            className="px-4 py-2 bg-custom_yellow rounded-lg"
            data-cy={`${type}Ticket__button__increment`}
          >
            +
          </button>
        </div>
        <div className="col-span-12 sm:col-span-4 text-center sm:text-right py-3" data-cy={`${type}Ticket__price`}>
          {price}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md p-4 text-white mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          {renderTicketSelector('adult', 'Ordinarie', '125 Kr')}
          {renderTicketSelector('senior', 'Senior', '100 Kr')}
          {renderTicketSelector('child', 'Barn', '75 Kr')}
        </div>
        <div className="col-span-12 mt-4 text-center" data-cy="totalPrice">
          Totalt pris: {totalPrice} kr
        </div>
      </div>
    </div>
  );
};

export default TicketSelector;
