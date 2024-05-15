"use client";
import React from "react";
import { useTickets } from "app/contexts/TicketContext";

const TicketSelector = () => {
  const { tickets, incrementTicket, decrementTicket, totalPrice } =
    useTickets();

  const renderTicketSelector = (
    type: keyof typeof tickets,
    label: string,
    price: string
  ) => {
    return (
      <div className='flex w-full justify-evenly my-2'>
        <div className='flex-1 ml-20 py-3'>{label}</div>
        <div className='flex items-center flex-1 justify-center py-2'>
          <button
            onClick={() => decrementTicket(type)}
            className='px-4 py-2 mr-2 bg-custom_yellow rounded-lg'
          >
            -
          </button>
          <span className='mx-2 py-2'>{tickets[type]}</span>
          <button
            onClick={() => incrementTicket(type)}
            className='px-4 py-2 ml-2 bg-custom_yellow rounded-lg'
          >
            +
          </button>
        </div>
        <div className='flex-1 justify-end flex mr-20 py-3'>{price}</div>
      </div>
    );
  };

  return (
    <div className='space-y-4 flex flex-col p-4 text-white'>
      {renderTicketSelector("adult", "Ordinarie", "125 Kr")}
      {renderTicketSelector("senior", "Senior", "100 Kr")}
      {renderTicketSelector("child", "Barn", "75 Kr")}
      <div>
        <p className='flex justify-center mt-4 text-white'>
          Totalt pris: {totalPrice} kr
        </p>
      </div>
    </div>
  );
};

export default TicketSelector;
