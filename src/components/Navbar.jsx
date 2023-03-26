import React from 'react';
import { BsPrinterFill, BsPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <header>
        <Link to='/'>
          <BsPrinterFill />
          민화전사
        </Link>
        <nav>
          <Link to='/products'>Products</Link>
          <Link to='/carts'>Carts</Link>
          <Link to='/products/new'>
            <BsPencilFill />
          </Link>
          <button>Login</button>
        </nav>
      </header>
    </>
  );
}
