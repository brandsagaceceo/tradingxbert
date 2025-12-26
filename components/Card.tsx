// /components/Card.tsx
import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      {children}
    </div>
  );
}
