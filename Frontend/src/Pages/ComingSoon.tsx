import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1604093882750-3ed498f3178b')` }}
      ></div>
      <h1 className="text-5xl md:text-7xl text-white font-bold mb-8 ">Coming Soon</h1>
      <p className="text-white text-xl md:text-2xl ">
        We're working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
