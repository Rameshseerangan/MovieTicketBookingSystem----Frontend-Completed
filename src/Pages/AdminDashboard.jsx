import React, { useState } from 'react';
import CreateTheaterPage from './CreateTheaterPage';
import UpdateTheaterPage from './UpdateTheaterPage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('create'); // To toggle between Create and Update forms

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="tabs">
        <button onClick={() => setActiveTab('create')} className={activeTab === 'create' ? 'active' : ''}>
          Create Theater
        </button>
        <button onClick={() => setActiveTab('update')} className={activeTab === 'update' ? 'active' : ''}>
          Update Theater
        </button>
      </div>

      {activeTab === 'create' ? <CreateTheaterPage /> : <UpdateTheaterPage />}
    </div>
  );
};

export default AdminDashboard;
