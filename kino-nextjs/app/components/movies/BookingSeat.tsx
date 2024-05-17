'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useTickets } from '../../contexts/TicketContext';
import { createBooking } from '../../lib/actions';
import { screening, booking } from '../../lib/types';
import { useParams, useRouter } from 'next/navigation';

interface BookingSeatProps {
  screening: screening;
}

const BookingSeat: React.FC<BookingSeatProps> = ({ screening }) => {
  const [seats, setSeats] = useState<(0 | 1 | 2)[][]>(screening.Seats);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [email, setEmail] = useState<string>();
  const { tickets } = useTickets();
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const initialSeats = screening.Seats;
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (errorMessage) {
      timerId.current = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [errorMessage]);

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
                : seat,
            )
          : row,
      ),
    );
  };

  const handleBook = async () => {
    const selectedSeats = seats.flatMap((row, rIndex) =>
      row
        .map((seat, sIndex) => (seat === 2 ? [rIndex, sIndex] : []))
        .filter((seat) => seat.length > 0),
    );
    if (!getTotalSelectedTickets()) {
      setErrorMessage('Du måste välja minst en biljett av någon typ.');
      return;
    }
    if (
      !getSelectedSeatsCount() ||
      getSelectedSeatsCount() !== getTotalSelectedTickets()
    ) {
      setErrorMessage(
        'Du har inte valt samma antal platser som antal biljetter!',
      );
      return;
    }
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    if (!email) {
      setErrorMessage('Du måste fylla i din mail för att boka.');
      return;
    } else if (!regex.test(email)) {
      setErrorMessage('Vänligen fyll i en korrekt e-postadress.');
      return;
    }
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
      Email: email,
      Date: screening.Date,
    };

    await createBooking(reservation, screening._id);
    router.push(`/${id}/seats/confirmation`);
  };

  const handleUndo = async () => {
    try {
      setSeats(initialSeats);
      setTotalPrice(0);
      console.log(seats);
    } catch (error) {
      console.error('Failed to reset seats:', error);
    }
  };

  return (
    <div>
      <div className="seat-chart">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row.map((seat, seatIndex) => (
              <button
                key={`${rowIndex}-${seatIndex}`}
                onClick={() => toggleSeat(rowIndex, seatIndex)}
                disabled={seat === 1}
                className={`seat ${
                  seat === 0 ? 'available' : seat === 1 ? 'booked' : 'selected'
                }`}
              >
                {seatIndex + 1}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="col-start-3 col-span-3 m-4">
        <div className="bg-white h-0.5"></div>
      </div>
      <div>
        <p className="text-custom_yellow mb-1 font-semibold">
          Vänligen fyll i din e-postadress
        </p>
        <input
          className="px-4 py-2 mb-3 rounded text-black"
          name="emailInput"
          type="text"
          placeholder="Din e-postadress"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="actions flex items-center justify-center">
        <a
          onClick={handleBook}
          className="px-4 py-2 mr-4 mb-8 bg-custom_yellow rounded-lg cursor-pointer"
        >
          Boka
        </a>
        <button
          onClick={handleUndo}
          className="px-4 py-2 ml-4 mb-8 bg-custom_yellow rounded-lg"
        >
          Ångra
        </button>
      </div>
      {errorMessage && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default BookingSeat;
