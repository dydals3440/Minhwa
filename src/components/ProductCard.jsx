import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
  product: { id, image, title, category, price },
}) {
  // 제품 상세 페이지 이동 구현!
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
    >
      <img className='w-full' src={image} alt={title} />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        {/* truncate같은경우는 텍스트가 길어지면 ...으로 보여짐 */}
        <h3 className='truncate'>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{category}</p>
    </li>
  );
}
