import React, { useState } from "react";
import axios from "axios";

const BookingInfo = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!email) {
      setError("Please enter an email.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://movieticketbookingsystem-backend.onrender.com/api/auth/history/${email}`
      );
      setBookings(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching bookings.");
    }
    setLoading(false);
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(
        `https://movieticketbookingsystem-backend.onrender.com/api/auth/bookings/${email}/${bookingId}`
      );
      // Remove the canceled booking from the state
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert(
        "Booking canceled successfully. Your money will be refunded within 24 hours."
      );
    } catch (err) {
      alert(err.response?.data?.message || "Error canceling booking.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Booking Info</h2>
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded-lg mb-4 w-full"
      />
      <button
        onClick={fetchBookings}
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Fetch Booking
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {bookings.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Booking Details:</h3>
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id} className="border-b py-2">
                <p>
                  <strong>Movie:</strong> {booking.ticketInfo.movieName}
                </p>
                <p>
                  <strong>Seats:</strong> {booking.ticketInfo.seats.join(", ")}
                </p>
                <p>
                  <strong>Date:</strong> {booking.ticketInfo.date}
                </p>
                <p>
                  <strong>Time:</strong> {booking.ticketInfo.time}
                </p>
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="mt-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel Booking
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingInfo;
