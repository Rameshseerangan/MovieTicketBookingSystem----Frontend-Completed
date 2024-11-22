import React, { useState } from "react";

const UpiPayment = () => {
  const [upiId, setUpiId] = useState("");

  return (
    <div className="mb-4">
      <label className="block text-lg mb-2">Enter UPI ID:</label>
      <input
        type="text"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className="p-2 mb-4 bg-gray-700 text-white rounded w-full"
        placeholder="example@upi"
        required
      />
    </div>
  );
};

export default UpiPayment;
