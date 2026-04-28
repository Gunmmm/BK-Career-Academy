import React from 'react';

export const BrandLogo = ({ className = "", onDoubleClick }: { className?: string; onDoubleClick?: () => void }) => (
  <div 
    onDoubleClick={onDoubleClick}
    className={`relative flex items-center justify-center ${className} transition-all duration-200 cursor-pointer overflow-hidden border-2 border-ink shadow-[4px_4px_0_0_#1A1A1A] bg-white`}
  >
    <img 
      src="/logo.png" 
      alt="BK Career Academy Logo" 
      className="w-full h-full object-contain"
    />
  </div>
);

export default BrandLogo;
