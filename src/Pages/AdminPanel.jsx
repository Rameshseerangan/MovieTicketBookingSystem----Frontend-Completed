import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TheaterManagement = () => {
  const [createData, setCreateData] = useState({
    name: "",
    showTimes: [],
    price: "",
    currentShowTime: "", // For handling current input
  });

  const [updateData, setUpdateData] = useState({
    theaterId: "",
    name: "",
    showTimes: [],
    price: "",
    currentShowTime: "",
  });

  const handleAddShowTime = () => {
    if (createData.currentShowTime.trim() !== "") {
      setCreateData({
        ...createData,
        showTimes: [...createData.showTimes, createData.currentShowTime],
        currentShowTime: "",
      });
    }
  };

  const handleRemoveShowTime = (index) => {
    const updatedShowTimes = createData.showTimes.filter((_, i) => i !== index);
    setCreateData({ ...createData, showTimes: updatedShowTimes });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "https://movieticketbookingsystem-backend.onrender.com/api/auth/createtheater",
        createData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setCreateData({ name: "", showTimes: [], price: "", currentShowTime: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create theater");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        "https://movieticketbookingsystem-backend.onrender.com/api/auth/updatetheater",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setUpdateData({ theaterId: "", name: "", showTimes: [], price: "", currentShowTime: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update theater");
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Theater Management
      </h1>

      {/* Create Theater Form */}
      <div className="bg-gray-800 shadow-lg p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Create Theater</h2>
        <form onSubmit={handleCreateSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Theater Name:</label>
            <input
              type="text"
              className="border rounded w-full p-2 bg-gray-700 text-white placeholder-gray-400"
              value={createData.name}
              onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
              required
              placeholder="Enter theater name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Show Times:</label>
            <div className="flex items-center">
              <input
                type="text"
                className="border rounded w-2/3 p-2 bg-gray-700 text-white placeholder-gray-400"
                value={createData.currentShowTime}
                onChange={(e) => setCreateData({ ...createData, currentShowTime: e.target.value })}
                placeholder="Enter show time (e.g. 12:00 PM)"
              />
              <button
                type="button"
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddShowTime}
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {createData.showTimes.map((time, index) => (
                <li key={index} className="flex justify-between text-gray-300">
                  <span>{time}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveShowTime(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Price:</label>
            <input
              type="number"
              className="border rounded w-full p-2 bg-gray-700 text-white placeholder-gray-400"
              value={createData.price}
              onChange={(e) => setCreateData({ ...createData, price: e.target.value })}
              required
              placeholder="Enter price"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
            Create Theater
          </button>
        </form>
      </div>

      {/* Update Theater Form */}
      <div className="bg-gray-800 shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Update Theater Info</h2>
        <form onSubmit={handleUpdateSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Theater ID:</label>
            <input
              type="text"
              className="border rounded w-full p-2 bg-gray-700 text-white placeholder-gray-400"
              value={updateData.theaterId}
              onChange={(e) => setUpdateData({ ...updateData, theaterId: e.target.value })}
              required
              placeholder="Enter theater ID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">New Theater Name:</label>
            <input
              type="text"
              className="border rounded w-full p-2 bg-gray-700 text-white placeholder-gray-400"
              value={updateData.name}
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
              placeholder="Enter new theater name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">New Show Times:</label>
            <div className="flex items-center">
              <input
                type="text"
                className="border rounded w-2/3 p-2 bg-gray-700 text-white placeholder-gray-400"
                value={updateData.currentShowTime}
                onChange={(e) => setUpdateData({ ...updateData, currentShowTime: e.target.value })}
                placeholder="Enter show time (e.g. 12:00 PM)"
              />
              <button
                type="button"
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddShowTime}
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {updateData.showTimes.map((time, index) => (
                <li key={index} className="flex justify-between text-gray-300">
                  <span>{time}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveShowTime(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">New Price:</label>
            <input
              type="number"
              className="border rounded w-full p-2 bg-gray-700 text-white placeholder-gray-400"
              value={updateData.price}
              onChange={(e) => setUpdateData({ ...updateData, price: e.target.value })}
              placeholder="Enter new price"
            />
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300">
            Update Theater Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default TheaterManagement;
