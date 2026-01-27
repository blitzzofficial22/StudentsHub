import React, { useState } from 'react';
import { generateQuiz, askAIStudyBuddy } from '../services/geminiService';
import { QuizQuestion } from '../types';
import { Send, BookOpen, CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';

const AIStudy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'quiz'>('chat');
  
  // Chat State
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Quiz State
  const [topic, setTopic] = useState('');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    const response = await askAIStudyBuddy(userMsg);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    setIsChatLoading(false);
  };

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsQuizLoading(true);
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedOption(null);

    const questions = await generateQuiz(topic);
    setQuizQuestions(questions);
    setIsQuizLoading(false);
  };

  const handleAnswer = (option: string) => {
    if (showExplanation) return;
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="flex gap-4 mb-6 border-b">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`pb-2 px-4 font-semibold ${activeTab === 'chat' ? 'border-b-2 border-brand-500 text-brand-600' : 'text-gray-500'}`}
        >
          AI Tutor Chat
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className={`pb-2 px-4 font-semibold ${activeTab === 'quiz' ? 'border-b-2 border-brand-500 text-brand-600' : 'text-gray-500'}`}
        >
          Quiz Generator
        </button>
      </div>

      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-400 mt-10">
                <BookOpen className="mx-auto mb-2 opacity-50" size={48} />
                <p>Ask me anything about Nursing, Anatomy, or Physiology!</p>
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isChatLoading && <div className="text-gray-400 text-sm ml-2">AI is thinking...</div>}
          </div>
          <form onSubmit={handleAskAI} className="p-4 border-t bg-gray-50 flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..." 
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button type="submit" disabled={isChatLoading} className="bg-brand-600 text-white p-2 rounded-lg hover:bg-brand-700 disabled:opacity-50">
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="flex-1 overflow-y-auto">
          {quizQuestions.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
              <h3 className="text-xl font-bold mb-4">Generate a Practice Quiz</h3>
              <form onSubmit={handleGenerateQuiz} className="max-w-md mx-auto">
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter topic (e.g. Cardiac Pharmacology)"
                  className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button 
                  type="submit" 
                  disabled={isQuizLoading}
                  className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isQuizLoading ? <RefreshCw className="animate-spin" /> : 'Generate Quiz'}
                </button>
              </form>
            </div>
          ) : currentQuestionIndex < quizQuestions.length ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-semibold text-gray-500">Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <span className="text-sm font-bold text-brand-600">Score: {score}</span>
              </div>
              
              <h3 className="text-lg font-bold mb-6">{quizQuestions[currentQuestionIndex].question}</h3>
              
              <div className="space-y-3">
                {quizQuestions[currentQuestionIndex].options.map((option, idx) => {
                   let buttonClass = "w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition";
                   if (showExplanation) {
                     if (option === quizQuestions[currentQuestionIndex].correctAnswer) {
                        buttonClass = "w-full text-left p-4 rounded-lg border bg-green-50 border-green-500 text-green-700";
                     } else if (option === selectedOption) {
                        buttonClass = "w-full text-left p-4 rounded-lg border bg-red-50 border-red-500 text-red-700";
                     }
                   }
                   
                   return (
                    <button 
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      disabled={showExplanation}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                   )
                })}
              </div>

              {showExplanation && (
                <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg">
                  <p className="font-bold mb-1">Explanation:</p>
                  <p>{quizQuestions[currentQuestionIndex].explanation}</p>
                  <button 
                    onClick={nextQuestion}
                    className="mt-4 bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700"
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          ) : (
             <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
               <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
               <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
               <p className="text-lg text-gray-600 mb-6">You scored {score} out of {quizQuestions.length}</p>
               <button 
                 onClick={() => setQuizQuestions([])}
                 className="bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700"
               >
                 Take Another Quiz
               </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIStudy;