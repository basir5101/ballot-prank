
import React, { useState } from 'react';
import { CANDIDATES } from './constants';
import { Candidate, SymbolType } from './types';
import BallotCard from './components/BallotCard';

const App: React.FC = () => {
  const [prankMessage, setPrankMessage] = useState<string | null>(null);
  const [votedCandidate, setVotedCandidate] = useState<Candidate | null>(null);

  const handleVote = (candidate: Candidate) => {
    if (candidate.type === SymbolType.BOAT) {
      setPrankMessage('নিষিদ্ধ লীগ দেশে নাই, নতুন সরকার বেছে নিন।');
    } else if (candidate.type === SymbolType.SCALE) {
      setVotedCandidate(candidate);
    }
  };

  const closeModal = () => {
    setPrankMessage(null);
    setVotedCandidate(null);
  };

  return (
    <div className="min-h-screen ballot-paper py-8 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="max-w-2xl w-full bg-[#006a4e] text-white p-6 rounded-t-3xl shadow-xl text-center border-b-8 border-[#f42a41]">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">ডিজিটাল ব্যালট পেপার</h1>
        <p className="text-lg opacity-90">জাতীয় নির্বাচন ২০২৫ - আপনার মূল্যবান ভোটটি দিন</p>
      </div>

      {/* Instruction */}
      <div className="max-w-2xl w-full bg-white p-4 border-x border-gray-200 shadow-sm text-center">
        <p className="text-red-600 font-semibold animate-pulse">
            সতর্কতা: সঠিক প্রতীকে ক্লিক করে আপনার গণতান্ত্রিক অধিকার নিশ্চিত করুন।
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-2xl w-full bg-white p-6 md:p-10 border-x border-b rounded-b-3xl shadow-2xl grid grid-cols-2 gap-6 relative min-h-[500px]">
        {CANDIDATES.map((candidate) => (
          <BallotCard 
            key={candidate.id} 
            candidate={candidate} 
            onVote={handleVote} 
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-gray-500 text-sm flex flex-col items-center">
        <p>© 2026 বাংলাদেশ নির্বাচন কমিশন (প্যারোডি)</p>
        <p className="mt-1">সুষ্ঠু ও নিরপেক্ষ নির্বাচনের অঙ্গীকার</p>
      </footer>

      {/* Prank Modal (Boat Logic) */}
      {prankMessage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-red-500 transform scale-110 transition-transform">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">{prankMessage}</h2>
            <button 
              onClick={closeModal}
              className="bg-gray-800 text-white px-8 py-2 rounded-full font-bold hover:bg-black transition-colors"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}

      {/* Success Modal (Scale Logic) */}
      {votedCandidate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-emerald-600">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">ভোট সফল হয়েছে!</h2>
            <p className="text-gray-600 mb-6">
              আপনি সফলভাবে <span className="font-bold text-emerald-800">{votedCandidate.symbolName}</span> প্রতীকে ভোট দিয়েছেন।
            </p>
            <button 
              onClick={closeModal}
              className="bg-emerald-700 text-white px-8 py-2 rounded-full font-bold hover:bg-emerald-800 transition-colors"
            >
              ধন্যবাদ
            </button>
          </div>
        </div>
      )}

      {/* Floating Prank Hint */}
      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 p-2 rounded-lg text-xs text-yellow-800 hidden md:block">
        ইঙ্গিত: কিছু প্রতীক একটু বেশিই চঞ্চল!
      </div>
    </div>
  );
};

export default App;
