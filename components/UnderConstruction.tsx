
import React from 'react';

const ConstructionIcon: React.FC = () => (
    <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.75 11.42m5.877 5.877l-5.877-5.877m0 0a3.375 3.375 0 00-4.773 4.773l2.472 2.472" />
    </svg>
);

const UnderConstruction: React.FC<{ id: string; title: string; }> = ({ id, title }) => {
  return (
    <section id={id} className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
      <div className="container mx-auto text-center">
        <ConstructionIcon />
        <h2 className="text-3xl font-serif font-bold text-navy mb-4">{title} - Coming Soon</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          This section is currently under construction. Please check back later for updates!
        </p>
      </div>
    </section>
  );
};

export default UnderConstruction;
