import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CardPayment from "./CardPaymentPage";
import UpiPayment from "./UpiPaymentPage";
import RazorpayPayment from "./RazorpayPayment";
import axios from "axios";

const PaymentPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [isPaymentTypeSelected, setIsPaymentTypeSelected] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve booking details from localStorage
    const savedDetails = JSON.parse(localStorage.getItem("bookingDetails"));
    if (savedDetails) {
      setBookingDetails(savedDetails);
      setTotalPrice(savedDetails.totalPrice); // Set the total price from booking details
    } else {
      alert("No booking details found. Please book your ticket first.");
    }
  }, []);

  const handlePaymentConfirmation = async () => {
    if (!email || !phone || !paymentType) {
      alert("Please provide email, phone number, and select a payment type.");
      return;
    }

    if (!bookingDetails) {
      alert("Booking details are missing.");
      return;
    }

    const paymentData = {
      email,
      phone,
      paymentType,
      ticketInfo: {
        movieName: bookingDetails.movie,
        seats: bookingDetails.seats.map((seat) => seat.toString()),
        date: bookingDetails.date,
        time: bookingDetails.showTime,
        totalPrice,
      },
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://movieticketbookingsystem-backend.onrender.com/api/auth/book-ticket",
        paymentData
      );

      if (response.status === 200) {
        alert("Payment successful! Confirmation sent to your email.");
        setLoading(false);

        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during payment:", error);
      alert(
        `Payment failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handlePaymentTypeSelection = (event) => {
    const type = event.target.value;
    setPaymentType(type);
    setIsPaymentTypeSelected(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center py-10">
      <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-6xl flex space-x-8">
        {/* Left Section: Movie Details & Payment Method Selection */}

        <div className="w-1/3 space-y-4 bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-indigo-400">
            Movie Details
          </h2>
          {bookingDetails ? (
            <div className="space-y-2">
              <p>
                <strong>Movie:</strong> {bookingDetails.movie}
              </p>
              <p>
                <strong>Theater:</strong> {bookingDetails.theater}
              </p>
              <p>
                <strong>Show Time:</strong> {bookingDetails.showTime}
              </p>
              <p>
                <strong>Date:</strong> {bookingDetails.date}
              </p>
              <p>
                <strong>Seats:</strong> {bookingDetails.seats.join(", ")}
              </p>
              <p className="text-lg">
                <strong>Total Price:</strong> {totalPrice}
              </p>
            </div>
          ) : (
            <p>Loading booking details...</p>
          )}

          {/* Dropdown for payment type */}
          <h2 className="text-2xl font-bold text-center text-indigo-400 mt-6">
            Select Payment Method
          </h2>
          <select
            value={paymentType}
            onChange={handlePaymentTypeSelection}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none shadow-md"
          >
            <option value="">Select Payment Method</option>
            <option value="Card">Card Payment</option>
            <option value="UPI">UPI Payment</option>
            <option value="Razorpay">Razorpay payment</option>
          </select>
        </div>

        {/* Right Section: Payment Form */}
        <div className="w-2/3 space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
          {isPaymentTypeSelected ? (
            <>
              <div className="mb-4">
                <label className="block text-lg mb-2 text-indigo-400">
                  Email ID:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg mb-2 text-indigo-400">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg mb-2 text-indigo-400">
                  Selected Payment: {paymentType}
                </label>
              </div>

              {/* Render the appropriate payment component */}
              {paymentType === "Card" && <CardPayment />}
              {paymentType === "UPI" && <UpiPayment />}
              {paymentType === "Razorpay" && <RazorpayPayment />}

              <button
                onClick={handlePaymentConfirmation}
                className="w-full mt-5 p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </>
          ) : (
            <div className="text-center text-lg text-gray-400">
              Please select a payment method.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
