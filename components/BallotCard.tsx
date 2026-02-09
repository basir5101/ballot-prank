
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Candidate, SymbolType } from '../types';

interface BallotCardProps {
  candidate: Candidate;
  onVote: (candidate: Candidate) => void;
}

const BallotCard: React.FC<BallotCardProps> = ({ candidate, onVote }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFleeing, setIsFleeing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Fleeing logic for buttons other than Boat and Scale
  const handleMouseEnter = useCallback(() => {
    if (candidate.type !== SymbolType.SCALE && candidate.type !== SymbolType.BOAT) {
      setIsFleeing(true);
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Randomly jump to a new position on the screen
      const newX = Math.random() * (viewportWidth - 200);
      const newY = Math.random() * (viewportHeight - 200);
      
      setPosition({ x: newX, y: newY });
    }
  }, [candidate.type]);

  const handleClick = () => {
    if (candidate.type !== SymbolType.SCALE && candidate.type !== SymbolType.BOAT) {
        return;
    }
    onVote(candidate);
  };

  const style: React.CSSProperties = isFleeing ? {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 1000,
    transition: 'all 0.15s ease-out',
    width: '180px'
  } : {
    position: 'relative',
    transition: 'transform 0.2s ease-in-out'
  };

  return (
    <div
      ref={cardRef}
      style={style}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`
        cursor-pointer bg-white rounded-xl shadow-lg p-6 border-2 
        ${candidate.type === SymbolType.BOAT ? 'border-red-500 hover:bg-red-50' : 'border-emerald-700 hover:bg-emerald-50'}
        flex flex-col items-center justify-center space-y-3 group
        select-none active:scale-95 transition-all
      `}
    >
      <div className="text-6xl mb-1 group-hover:scale-110 transition-transform">
        {candidate.symbol}
      </div>
      <div className="text-center">
        <h3 className="font-bold text-gray-800 text-xl">{candidate.symbolName}</h3>
      </div>
      <div className={`
        mt-2 px-6 py-2 rounded-full text-sm font-semibold
        ${candidate.type === SymbolType.BOAT ? 'bg-red-600 text-white' : 'bg-emerald-700 text-white'}
      `}>
        ভোট দিন
      </div>
    </div>
  );
};

export default BallotCard;
