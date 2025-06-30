import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const ReportIssue = () => {
  const [siteName, setSiteName] = useState('');
  const [equipmentCategory, setEquipmentCategory] = useState('');
  const [equipmentModel, setEquipmentModel] = useState('');
  const [siteNames, setSiteNames] = useState<string[]>([]);
  const [equipmentCategories, setEquipmentCategories] = useState<string[]>([]);
  const [equipmentModels, setEquipmentModels] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRocheData = async () => {
      const { data, error } = await supabase.from('roche').select('siteName, equipmentCategory, equipmentModel');
      if (!error && data) {
        setSiteNames(Array.from(new Set(data.map((row: any) => row.siteName).filter(Boolean))));
        setEquipmentCategories(Array.from(new Set(data.map((row: any) => row.equipmentCategory).filter(Boolean))));
        setEquipmentModels(Array.from(new Set(data.map((row: any) => row.equipmentModel).filter(Boolean))));
      }
    };
    fetchRocheData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!siteName || !equipmentCategory || !equipmentModel) {
      setMessage('All fields are required.');
      return;
    }
    navigate(`/report-issue/details?siteName=${encodeURIComponent(siteName)}&equipmentCategory=${encodeURIComponent(equipmentCategory)}&equipmentModel=${encodeURIComponent(equipmentModel)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <button
          onClick={() => { window.location.href = '/'; }}
          className="inline-block bg-white border border-gray-300 rounded px-4 py-2 text-blue-600 font-semibold shadow hover:bg-blue-50 transition mb-4"
        >
          &larr; Home
        </button>
      </div>
      <div className="bg-[#eaf6ff] py-12 text-center border-b border-blue-200">
        <h1 className="text-4xl font-bold mb-2 text-black">Report an Issue</h1>
        <p className="text-lg text-gray-700">Notify us about any problems with equipment in the lab.</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto mt-12 bg-white p-8 rounded shadow gap-8">
        <img src="/issue.png" alt="Report an Issue" className="rounded-lg object-cover w-full md:w-1/2 max-h-80" style={{ maxWidth: 400 }} />
        <div className="flex-1 w-full">
          <form onSubmit={handleSearch} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-medium">Location</label>
                <select className="w-full border rounded px-3 py-2" value={siteName} onChange={e => setSiteName(e.target.value)} required>
                  <option value="" disabled>Select location</option>
                  {siteNames.map((site) => (
                    <option key={site} value={site}>{site}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Instrument Type</label>
                <select className="w-full border rounded px-3 py-2" value={equipmentCategory} onChange={e => setEquipmentCategory(e.target.value)} required>
                  <option value="" disabled>Select instrument type</option>
                  {equipmentCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Instrument Model</label>
                <select className="w-full border rounded px-3 py-2" value={equipmentModel} onChange={e => setEquipmentModel(e.target.value)} required>
                  <option value="" disabled>Select instrument model</option>
                  {equipmentModels.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="bg-gray-400 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500">Search</button>
            {message && <div className="text-center text-lg font-semibold text-red-700 bg-red-100 border border-red-300 rounded p-4 mt-4">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue; 