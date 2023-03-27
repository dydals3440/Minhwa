import React from 'react';

export default function User({ user: { displayName, photoURL } }) {
  return (
    <div className='flex items-center'>
      <img
        className='rounded-full h-10 w-10 mr-2'
        src={photoURL}
        alt={displayName}
      />
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
