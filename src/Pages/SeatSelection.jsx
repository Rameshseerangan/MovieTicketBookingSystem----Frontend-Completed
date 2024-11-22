import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]); // Store theater data
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [seats, setSeats] = useState(
    Array(5)
      .fill()
      .map(() => Array(8).fill(0))
  ); // Seat availability (0 = available, 1 = reserved, 2 = selected, 3 = unavailable)
  const [seatPrice, setSeatPrice] = useState(190); // Default seat price

  const [loading, setLoading] = useState(true); // Loading state for fetching movie data

  useEffect(() => {
    const fetchTheaterData = async () => {
      try {
        const res = await axios.get(
          "https://movieticketbookingsystem-backend.onrender.com/api/auth/gettheater"
        );
        setTheaters(res.data); // Set theater data from backend
      } catch (error) {
        console.error("Error fetching theater data:", error);
      }
    };

    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://movieticketbookingsystem-backend.onrender.com/api/auth/movie/${id}`
        );
        setMovie(res.data); // Set movie data from backend
        setLoading(false); // Stop loading once movie data is fetched
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchTheaterData();
    fetchMovieDetails();
  }, [id]);

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
      totalPrice: totalPrice,
    };

    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

    navigate(`/movie/${id}/payment`);
  };

  const handleTheaterChange = (e) => {
    const selected = theaters.find(
      (theater) => theater.name === e.target.value
    );
    setSelectedTheater(selected.name);
    setSelectedTimeSlot(""); // Reset the time slot when theater changes
    setSeatPrice(selected.price); // Update the seat price based on the selected theater
  };

  const calculateTotalPrice = () => {
    const selectedSeatsCount = seats.flat().filter((seat) => seat === 2).length;
    return selectedSeatsCount * seatPrice;
  };

  if (loading) {
    return <div>Loading movie details...</div>; // Loading message
  }

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
              {theaters.map((theater, index) => (
                <option key={index} value={theater.name}>
                  {theater.name} {/* Display theater name */}
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
                theaters
                  .find((theater) => theater.name === selectedTheater)
                  ?.showTimes.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot} {/* Display show time slots */}
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
              min={new Date().toISOString().split("T")[0]} // Disable past dates
            />
          </div>

          {/* Display selected theater's price */}
          <div className="text-lg mt-4">
            {selectedTheater && <p>Seat Price : ₹{seatPrice}</p>}
          </div>

          <div className="text-lg mt-4">
            Total Price: ₹{calculateTotalPrice()}{" "}
            {/* Display the total price */}
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
                      aria-label={`Seat ${String.fromCharCode(65 + rowIndex)}${
                        seatIndex + 1
                      } (${
                        seat === 0
                          ? "Available"
                          : seat === 1
                          ? "Reserved"
                          : "Selected"
                      })`}
                    >
                      {String.fromCharCode(65 + rowIndex)}
                      {seatIndex + 1}
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
