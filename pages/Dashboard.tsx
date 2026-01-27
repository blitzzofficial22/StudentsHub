import React from 'react';
import { UserProfile } from '../types';
import { Flame, Trophy, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user.displayName?.split(' ')[0]}!</h2>
        <p className="text-gray-600">Ready to boost your nursing knowledge today?</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Day Streak</p>
            <p className="text-2xl font-bold">{user.streak} Days</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Points</p>
            <p className="text-2xl font-bold">{user.points}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Badges Earned</p>
            <p className="text-2xl font-bold">{user.badges.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-600 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Start an AI Quiz</h3>
            <p className="text-brand-100 mb-4">Test your knowledge on Anatomy, Pharmacology, or Clinical skills.</p>
            <Link to="/ai" className="inline-flex items-center gap-2 bg-white text-brand-600 px-4 py-2 rounded-lg font-semibold hover:bg-brand-50 transition">
              Start Quiz <ArrowRight size={18} />
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
             <Trophy size={200} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
           <h3 className="text-xl font-bold mb-4">Recommended for You</h3>
           <ul className="space-y-3">
             <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <span className="text-gray-700">Cardiovascular System Review</span>
               <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">High Priority</span>
             </li>
             <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <span className="text-gray-700">Pharmacology: Beta Blockers</span>
               <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Medium</span>
             </li>
             <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <span className="text-gray-700">Patient Ethics & Safety</span>
               <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Review</span>
             </li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;