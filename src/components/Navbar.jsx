import React, { useEffect, useState } from 'react';
import { BsPrinterFill, BsPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';

export default function Navbar() {
  // 처음에는 로그인 한 사용자가 없으므로 공백
  const [user, setUser] = useState();
  useEffect(() => {
    // onUserStateChange((user) => {setUser(user)})와 동일
    // 인자가 동일하므로, 참조값만 전달
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
    console.log(user);
  }, []);
  return (
    <header className='flex justify-between border-b border-gray-300 p-4'>
      <Link to='/' className='text-brand text-3xl flex'>
        <BsPrinterFill className='m-1' />
        <h1>민화전사</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new' className='text-2xl'>
          <BsPencilFill />
        </Link>
        {user && <User user={user} />}
        {/* user가 없다면 => login, user 있다면 => logout */}
        {!user ? (
          <button onClick={login}>Login</button>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </nav>
    </header>
  );
}
