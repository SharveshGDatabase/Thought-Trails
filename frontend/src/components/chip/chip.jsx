import React from 'react';
import { assets } from '../../assets/icons/assets';

const CtmShip = ({text , imgUrl}) => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div
          className="inline-flex items-center justify-center gap-4 px-6 py-1.5
          mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary"
        >
          <p>{text}</p>
          <img src={imgUrl || assets.star_icon} className="w-2.5" alt="star icon" />
        </div>
      </div>

      <img
        src={assets.gradient_background}
        alt="gradient background"
        className="absolute -top-50 -z-10 opacity-50"
      />
    </div>
  );
};

export default CtmShip;
