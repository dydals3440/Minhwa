import React, { useEffect, useState } from 'react';
import { BsPrinterFill, BsPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import Button from './ui/Button';
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
  }, []);
  return (
    <header className='flex justify-between border-b border-gray-300 p-4'>
      <Link to='/' className='text-brand text-3xl flex shrink-0'>
        <BsPrinterFill className='m-1' />
        <h1>민화전사</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        {/* user가 있고, user가 admin인 경우에 연필 아이콘을 클릭할 수 있게 설계 */}
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
