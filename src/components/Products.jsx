import React from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products'], getProducts, { staleTime: 1000 * 60 });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}

// useQuery를 이용해서firebase에서 정의한 getproducts함수를 사용하여 모든 제품의 정보를 가져옴(이래서 usequery이용)
// 로딩에러 처리 => 제품이 있다면 제품의 데이터를 매핑하면서 실제 프로덕 카드컴포넌트로 만듬.
