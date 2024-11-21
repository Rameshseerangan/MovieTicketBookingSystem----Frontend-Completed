import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../Api/apiService";

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [seats, setSeats] = useState(
    Array(5)
      .fill()
      .map(() => Array(8).fill(0))
  ); // 0 = available, 1 = reserved, 2 = selected, 3 = unavailable
  const seatPrice = 190; // Seat price per seat

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getMovieDetails(id);
      setMovie(details);
    };
    fetchDetails();
  }, [id]);

  const theaterShowtimes = {
    AGS: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
    INOX: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"],
    PVR: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
    Movix: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
    Movieexpress: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
  };

  const toggleSeatSelection = (rowIndex, seatIndex) => {
    setSeats((prevSeats) =>
      prevSeats.map((row, rIdx) =>
        row.map((seat, sIdx) => {
          if (rIdx === rowIndex && sIdx === seatIndex) {
            return seat === 0 ? 2 : seat === 2 ? 0 : seat; // Toggle between available and selected
          }
          return seat;
        })
      )
    );
  };

  const handleBookingConfirmation = () => {
    const selectedSeats = seats
      .flatMap((row, rowIndex) =>
        row.map((seat, seatIndex) =>
          seat === 2 ? [rowIndex + 1, seatIndex + 1] : null
        )
      )
      .filter((seat) => seat !== null);
  
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to book.");
      return;
    }
  
    const totalPrice = selectedSeats.length * seatPrice;
  
    const bookingDetails = {
      movie: movie ? movie.Title : "Unknown Movie",
      theater: selectedTheater,
      showTime: selectedTimeSlot,
      date: selectedDate,
      seats: selectedSeats,
      totalPrice: totalPrice,  // Make sure totalPrice is stored here
    };
  
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
  
    navigate(`/movie/${id}/payment`);
  };
  

  const handleTheaterChange = (e) => {
    setSelectedTheater(e.target.value);
    setSelectedTimeSlot("");
  };

  const calculateTotalPrice = () => {
    const selectedSeatsCount = seats.flat().filter((seat) => seat === 2).length;
    return selectedSeatsCount * seatPrice;
  };

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-4xl mb-4">
        Seat Selection for Movie: {movie ? movie.Title : "Loading..."}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section: Theater and Time Slot Selection */}
        <div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Select Theater:</label>
            <select
              value={selectedTheater}
              onChange={handleTheaterChange}
              className="p-2 bg-gray-700 text-white rounded w-full"
            >
              <option value="">-- Select Theater --</option>
              {Object.keys(theaterShowtimes).map((theater, index) => (
                <option key={index} value={theater}>
                  {theater}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Select Time Slot:</label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              className="p-2 bg-gray-700 text-white rounded w-full"
              disabled={!selectedTheater}
            >
              <option value="">-- Select Time Slot --</option>
              {selectedTheater &&
                theaterShowtimes[selectedTheater].map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 bg-gray-700 text-white rounded w-full"
              min={new Date().toISOString().split("T")[0]} // Disable past dates, starting from today
            />
          </div>

          <div className="text-lg mt-4">
            Total Price: ₹{calculateTotalPrice()}
          </div>

          <button
            onClick={handleBookingConfirmation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-full"
            disabled={!selectedTheater || !selectedTimeSlot || !selectedDate}
          >
            Confirm Booking
          </button>
        </div>

        {/* Right Section: Seat Selection Grid */}
        <div className="flex flex-col items-center justify-center">
          <div className="grid gap-4 mt-6">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-2">
                {row.map((seat, seatIndex) => {
                  let seatClass = "";
                  if (seat === 0) seatClass = "bg-green-500"; // Available
                  if (seat === 1) seatClass = "bg-gray-500"; // Reserved
                  if (seat === 2) seatClass = "bg-blue-500"; // Selected
                  if (seat === 3) seatClass = "bg-red-500"; // Unavailable

                  return (
                    <button
                      key={seatIndex}
                      onClick={() => toggleSeatSelection(rowIndex, seatIndex)}
                      className={`w-12 h-12 ${seatClass} rounded`}
                      disabled={seat === 1 || seat === 3} // Disable reserved or unavailable seats
                      aria-label={`Seat ${String.fromCharCode(65 + rowIndex)}${seatIndex + 1} (${seat === 0 ? "Available" : seat === 1 ? "Reserved" : "Selected"})`}
                    >
                      {String.fromCharCode(65 + rowIndex)}{seatIndex + 1}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
