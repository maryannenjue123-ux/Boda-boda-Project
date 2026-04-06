import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', balance: 0 });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await axios.get('http://localhost:5000/api/members');
    setMembers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/members', form);
    setForm({ name: '', phone: '', balance: 0 });
    fetchMembers();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Members</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="font-bold mb-4">Add New Member</h3>
        <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
          <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Add Member</button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map(m => (
              <tr key={m.id}>
                <td className="px-6 py-4">{m.name}</td>
                <td className="px-6 py-4">{m.phone}</td>
                <td className="px-6 py-4 font-bold">${parseFloat(m.balance).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;