import React from "react";

interface LeaseSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

export const LeaseSection: React.FC<LeaseSectionProps> = ({ number, title, children }) => {
  return (
    <section className="lease-section">
      <div className="section-header">
        <span className="section-number">{number}.</span>
        <span className="section-title">{title}:</span>
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};
