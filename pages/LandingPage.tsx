import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-600 text-white p-2 rounded-lg">
            <BookOpen size={24} />
          </div>
          <span className="text-xl font-bold text-gray-900">Students Hub</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-brand-600 font-medium transition">
            Log In
          </Link>
          <Link to="/login?mode=signup" className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium transition shadow-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Master Your Studies with <br className="hidden md:block" />
          <span className="text-brand-600">AI-Powered Learning</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10">
          Join thousands of nursing students using AI tutors, smart quizzes, and community support to ace their exams and clinicals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login?mode=signup" className="px-8 py-4 bg-brand-600 text-white rounded-xl text-lg font-bold hover:bg-brand-700 transition shadow-lg flex items-center justify-center gap-2">
            Start Learning Free <ArrowRight size={20} />
          </Link>
          <a href="#features" className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl text-lg font-bold hover:bg-gray-50 transition flex items-center justify-center">
            Learn More
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Stop wasting time on passive reading. Engage with the material using our suite of smart tools.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Personal Tutor</h3>
              <p className="text-gray-500">Ask complex medical questions and get instant, simplified explanations tailored to your level.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Student Community</h3>
              <p className="text-gray-500">Connect with peers, share mnemonics, and get answers from students who have been there.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Analytics</h3>
              <p className="text-gray-500">Track your progress, identify weak spots, and get personalized study recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Built for the modern student</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold">Personalized Quizzes</h4>
                    <p className="text-gray-500">Generate quizzes on any topic instantly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold">Gamified Learning</h4>
                    <p className="text-gray-500">Earn badges and maintain streaks to stay motivated.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold">Mobile Friendly</h4>
                    <p className="text-gray-500">Study on the go with our responsive design.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
               <div className="flex items-center gap-4 mb-6">
                 <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                   ))}
                 </div>
                 <p className="font-bold text-gray-700">Join 10,000+ Students</p>
               </div>
               <p className="text-lg font-medium italic text-gray-600">
                 "This platform completely changed how I study for Pharmacology. The AI explanations are a lifesaver!"
               </p>
               <p className="mt-4 text-brand-700 font-bold">- Jessica M., Nursing Student</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-lg">
              <BookOpen size={20} />
            </div>
            <span className="text-lg font-bold">Students Hub</span>
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Students Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;