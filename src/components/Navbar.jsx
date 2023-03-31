import React, { useEffect, useState } from 'react';
import { BsPrinterFill, BsPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import { useAuthContext } from './context/AuthContext';
import Button from './ui/Button';
import User from './User';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className='flex justify-between border-b border-gray-300 p-4'>
      <Link to='/' className='text-brand text-3xl flex shrink-0'>
        <BsPrinterFill className='m-1' />
        <h1>민화전사</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && <Link to='/carts'>Carts</Link>}
        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
            <BsPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user ? (
          <Button text={'Login'} onClick={login}></Button>
        ) : (
          <Button text={'Logout'} onClick={logout}></Button>
        )}
      </nav>
    </header>
  );
}
