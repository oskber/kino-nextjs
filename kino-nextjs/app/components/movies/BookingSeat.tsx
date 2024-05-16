"use client";
import React, { useState } from "react";
import { useTickets } from "../../contexts/TicketContext";
import { createBooking } from "../../lib/actions";
import { screening, booking } from "../../lib/types";
import Link from 'next/link';
import { useParams } from "next/navigation";

interface BookingSeatProps {
  screening: screening;
}

const BookingSeat: React.FC<BookingSeatProps> = ({ screening }) => {
  const [seats, setSeats] = useState<(0 | 1 | 2)[][]>(screening.Seats);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { tickets } = useTickets();
  const initialSeats = screening.Seats;
  const params = useParams();
  const {id} = params;

  const getTotalSelectedTickets = () => {
    return tickets.adult + tickets.senior + tickets.child;
  };

  const getSelectedSeatsCount = () => {
    return seats.flat().filter((seat) => seat === 2).length;
  };

  const toggleSeat = (rowIndex: number, seatIndex: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((seat, sIndex) =>
              sIndex === seatIndex
                ? seat === 0
                  ? getSelectedSeatsCount() < getTotalSelectedTickets()
                    ? 2
                    : seat
                  : seat === 2
                  ? 0
                  : seat
                : seat
            )
          : row
      )
    );
  };

  const handleBook = async () => {
    const selectedSeats = seats.flatMap((row, rIndex) =>
      row
        .map((seat, sIndex) => (seat === 2 ? [rIndex, sIndex] : []))
        .filter((seat) => seat.length > 0)
    );
    const prices = { adult: 125, senior: 100, child: 75 };
    const totalPrice =
      (selectedSeats.length *
        (tickets.adult * prices.adult +
          tickets.senior * prices.senior +
          tickets.child * prices.child)) /
      (tickets.adult + tickets.senior + tickets.child);

    const reservation: booking = {
      Seats: selectedSeats,
      Price: totalPrice.toString(),
      Email: "user@mail.se",
      Date: screening.Date,
    };
    
    console.log(reservation);

    await createBooking(reservation, screening._id);

    setTotalPrice(totalPrice);
  };

  const handleUndo = async () => {
    try {
      setSeats(initialSeats);
      setTotalPrice(0);
      console.log(seats);
    } catch (error) {
      console.error("Failed to reset seats:", error);
    }
  };

  return (
    <div>
      <div className='seat-chart'>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-center'>
            {row.map((seat, seatIndex) => (
              <button
                key={`${rowIndex}-${seatIndex}`}
                onClick={() => toggleSeat(rowIndex, seatIndex)}
                disabled={seat === 1}
                className={`seat ${
                  seat === 0 ? "available" : seat === 1 ? "booked" : "selected"
                }`}
              >
                {seatIndex + 1}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className='actions flex items-center justify-center'>
        <Link onClick={handleBook} 
          className='px-4 py-2 mr-4 mb-8 bg-custom_yellow rounded-lg cursor-pointer' 
          href={`/${id}/seats/confirmation`}>
          Boka
        </Link>

        <button
          onClick={handleUndo}
          className='px-4 py-2 ml-4 mb-8 bg-custom_yellow rounded-lg'
        >
          Ångra
        </button>
      </div>
    </div>
  );
};

export default BookingSeat;
