import React from 'react';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

const SHIPPING = 3000;
export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();
  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    // reduce를 통해 가격 더해주기, prev에 숫자를 더해주는데 json으로 받아오므로 parseInt해주어야하고 수량또한 고려해줌
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0 // 초기값은 0
    );

  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        내 장바구니
      </p>
      {!hasProducts && (
        <p className='text-2xl text-center my-10 font-bold border-red-300 p-10 border-dotted border-4'>
          장바구니에 상품이 없습니다. 상품을 추가해주세요
        </p>
      )}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className='flex justify-between items-center mb-4 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            {/* 화면이 적어졌을떄 아이콘이 안보이는 것을 shrink-0로 해결 */}
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalPrice + SHIPPING} />{' '}
          </div>
          <Button text='주문하기' />
        </>
      )}
    </section>
  );
}
