import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Categories() {
  return (
    <div className='rounded-lg p-3 bg-zinc-50 h-[80vh] w-[40vh] '>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => {
        return (
          <div
            key={item}
            className={
              'text-black font-semibold hover:opacity-50 relative rounded-sm px-3 py-1.5 text-base outline-2 outline-sky-400 focus-visible:outline transition'
            }
          >
            <span className='relative z-10'>
              {item}
              <hr />
            </span>
          </div>
        );
      })}
    </div>
  );
}
