import React from "react";
import axios from "axios";

const RazorpayPayment = ({ totalPrice }) => {
  const handlePayment = async () => {
    if (!totalPrice || totalPrice <= 0) {
      alert("Invalid total price. Please try again.");
      return;
    }

    try {
      // Create an order on your backend
      const { data } = await axios.post(
        "https://movieticketbookingsystem-backend.onrender.com/api/auth/createpayment",
        {
          totalPrice,
        }
      );

      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
        amount: data.amount, // Amount in paise
        currency: "INR",
        name: "Movie Booking App",
        description: "Payment for your movie booking",
        order_id: data.id, // Order ID from Razorpay
        handler: function (response) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // Further actions after payment
        },
        prefill: {
          name: "John Doe", // You can replace with user's actual name
          email: "johndoe@example.com", // Replace with user's email
          contact: "1234567890", // Replace with user's phone
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment creation failed:", error);
      alert("Failed to initiate payment. Please try again later.");
    }
  };

  return <div className="mb-4"></div>;
};

export default RazorpayPayment;
