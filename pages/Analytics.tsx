import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';

const dummyActivityData = [
  { day: 'Mon', score: 65, hours: 2 },
  { day: 'Tue', score: 70, hours: 3 },
  { day: 'Wed', score: 85, hours: 1.5 },
  { day: 'Thu', score: 60, hours: 1 },
  { day: 'Fri', score: 90, hours: 4 },
  { day: 'Sat', score: 95, hours: 5 },
  { day: 'Sun', score: 88, hours: 3 },
];

const dummyWeaknessData = [
  { topic: 'Pharma', value: 40 },
  { topic: 'Anatomy', value: 75 },
  { topic: 'Ethics', value: 90 },
  { topic: 'Pediatrics', value: 55 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold">Performance Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Study Activity (Hours)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="hours" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Quiz Score Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Weak Areas Detected</h3>
        <p className="text-sm text-gray-500 mb-6">Based on your recent quiz performance, we recommend focusing on these topics.</p>
        <div className="space-y-4">
          {dummyWeaknessData.map(item => (
            <div key={item.topic}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.topic}</span>
                <span className={item.value < 60 ? 'text-red-500 font-bold' : 'text-green-600'}>{item.value}% Mastery</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${item.value < 60 ? 'bg-red-400' : 'bg-green-500'}`} 
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;