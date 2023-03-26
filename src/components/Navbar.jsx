import React, { useEffect, useState } from 'react';
import { BsPrinterFill, BsPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';

export default function Navbar() {
  // 처음에는 로그인 한 사용자가 없으므로 공백
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  const handleLogin = () => {
    // (user)=>setUser 로그인이 잘되었다면 firebase의 login함수에서 return해준 user를 가져와 setUser로 설정가능
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser);
  };
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
        {/* user가 없다면 => login, user 있다면 => logout */}
        {!user ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
}
