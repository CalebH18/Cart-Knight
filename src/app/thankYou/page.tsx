import React from 'react';
import Link from "next/link";

const thankYou = () => {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Thank You For Your Purchase!</h1>
      <Link href="/">Return to Main Page</Link>
    </div>
  );
};

export default thankYou;