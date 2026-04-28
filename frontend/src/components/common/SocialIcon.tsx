import React from 'react';

export const SocialIcon = ({ Icon, href }: { Icon: any; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-ink bg-white flex items-center justify-center hover:bg-brand transition-all hover:-translate-y-1 shadow-[4px_4px_0_0_#1A1A1A]">
    <Icon size={18} />
  </a>
);

export default SocialIcon;
