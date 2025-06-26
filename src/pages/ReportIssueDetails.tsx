import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { supabase } from '@/integrations/supabase/client';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ReportIssueDetails = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const siteName = query.get('siteName') || '';
  const equipmentCategory = query.get('equipmentCategory') || '';
  const equipmentModel = query.get('equipmentModel') || '';

  const [instrument, setInstrument] = useState<any>(null);
  const [issueDate, setIssueDate] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchInstrument = async () => {
      const { data } = await supabase
        .from('roche')
        .select('status, room, equipmentModel, equipmentCategory, siteName')
        .eq('siteName', siteName)
        .eq('equipmentCategory', equipmentCategory)
        .eq('equipmentModel', equipmentModel)
        .maybeSingle();
      setInstrument(data);
    };
    fetchInstrument();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [siteName, equipmentCategory, equipmentModel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!issueDate || !issueDescription) {
      setMessage('Please provide the date and description of the issue.');
      return;
    }
    if (!user) {
      setMessage('You must be logged in to report an issue.');
      return;
    }
    const { error } = await supabase.from('issues').insert([
      {
        site_name: siteName,
        equipment_category: equipmentCategory,
        equipment_model: equipmentModel,
        issue_description: issueDescription,
        date_report: issueDate,
        user_id: user.id,
      },
    ]);
    if (error) {
      setMessage('Issue report failed: ' + error.message);
    } else {
      setMessage('Thank you for reporting the issue!');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-[#eaf6ff] py-12 text-center border-b border-blue-200">
        <h1 className="text-4xl font-bold mb-2 text-black">Report an Issue</h1>
        <p className="text-lg text-gray-700">Instrument Details & Issue Report</p>
      </div>
      <div className="max-w-5xl mx-auto mt-12 bg-white p-8 rounded shadow">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-black">Instrument Name</h2>
            <div className="mb-2 text-gray-700">{instrument?.equipmentModel}</div>
            <div className="mb-2 text-gray-700">{instrument?.equipmentCategory}</div>
            <div className="mb-2">
              <span className="inline-block px-4 py-1 rounded bg-gray-300 text-gray-800 font-semibold">{instrument?.status}</span>
            </div>
            <div className="mb-2 text-sm text-gray-600">
              <strong>Room:</strong> {instrument?.room}<br />
              <strong>Site:</strong> {instrument?.siteName}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Report an Issue</h3>
            <div className="mb-2"><strong>Instrument Name:</strong> {instrument?.equipmentModel}</div>
            <div className="mb-2"><strong>Location:</strong> {instrument?.room}</div>
            <div className="mb-2"><strong>User:</strong> {user?.user_metadata?.full_name || user?.email}</div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">When was the issue?</label>
              <input type="date" className="w-full border rounded px-3 py-2" value={issueDate} onChange={e => setIssueDate(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium">Tell us what happened</label>
            <textarea className="w-full border rounded px-3 py-2 h-32" value={issueDescription} onChange={e => setIssueDescription(e.target.value)} required placeholder="Type any relevant information here..." />
          </div>
          <button type="submit" className="bg-gray-400 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500 md:col-span-2">Submit</button>
          {message && <div className="text-center text-lg font-semibold text-green-700 bg-green-100 border border-green-300 rounded p-4 mt-4 md:col-span-2">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default ReportIssueDetails; 