import React, { useState } from "react";

const CardPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="mb-4">
      <label className="block text-lg mb-2">Card Number:</label>
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="p-2 mb-4 bg-gray-700 text-white rounded w-full"
        placeholder="Enter card number"
        required
      />
      <label className="block text-lg mb-2">Expiry Date:</label>
      <input
        type="text"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="p-2 mb-4 bg-gray-700 text-white rounded w-full"
        placeholder="MM/YY"
        required
      />
      <label className="block text-lg mb-2">CVV:</label>
      <input
        type="text"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        className="p-2 mb-4 bg-gray-700 text-white rounded w-full"
        placeholder="Enter CVV"
        required
      />
    </div>
  );
};

export default CardPayment;
