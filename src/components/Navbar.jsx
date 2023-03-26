import React from 'react';
import { BsPrinterFill, BsPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <header className='flex justify-between border-b border-gray-300'>
        <Link to='/' className='text-brand text-3xl flex m-4'>
          <BsPrinterFill className='m-1' />
          <h1>민화전사</h1>
        </Link>
        <nav className='flex items-center gap-4 font-semibold'>
          <Link to='/products'>Products</Link>
          <Link to='/carts'>Carts</Link>
          <Link to='/products/new' className='text-2xl'>
            <BsPencilFill />
          </Link>
          <button>Login</button>
        </nav>
      </header>
    </>
  );
}
