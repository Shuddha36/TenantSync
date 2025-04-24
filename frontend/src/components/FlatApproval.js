import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function FlatApproval() {
  const [requests, setRequests] = useState([]);

  // Fetch all rental requests and filter for pending status
  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/rental-requests', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch rental requests');
      const data = await res.json();
      setRequests(data.filter(req => req.status === 'pending'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve a rental request by updating its status
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/rental-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'approved' }),
      });
      if (res.ok) {
        setRequests(prev => prev.filter(r => r._id !== id));
      } else {
        console.error('Failed to approve request');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a rental request
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/rental-requests/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setRequests(prev => prev.filter(r => r._id !== id));
      } else {
        console.error('Failed to delete request');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No pending rental requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map(req => (
            <div key={req._id} className="bg-white shadow rounded p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{req.property.houseName}</h3>
                <p className="text-sm mb-1"><strong>Address:</strong> {req.property.address}</p>
                <p className="text-sm mb-1"><strong>Tenant:</strong> {req.tenant.username || req.tenant.email}</p>
                <p className="text-xs text-gray-500">Requested {moment(req.createdAt).fromNow()}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleApprove(req._id)}
                  className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                >
                  Approve Request
                </button>
                <button
                  onClick={() => handleDelete(req._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  Delete Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
