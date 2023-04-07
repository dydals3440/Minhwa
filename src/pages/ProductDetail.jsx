import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function ProductDetail() {
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    // 장바구니에 추가하면 됨!
  };
  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img className='w-full px-4 basis-7/12' src={image} alt={title} />
        <div className='w-full basis-5/12 p-4'>
          <h2 className='text-3xl font-bold py-2 '>{title}</h2>
          <p className='text-2xl font-bold py-2 border-b border-gray-400'>
            ₩{price}
          </p>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center'>
            <label className='text-brand font bold' htmlFor='select'>
              옵션:
            </label>
            <select
              id='select'
              className='p-2 m-4 border-2 border-dashed flex-1 border-brand outline-none'
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </section>
    </>
  );
}

// 기본적으로 리액트에서는 리스트 아이템인 경우! 고유한 id를 가지고 있어야함, 리액트에서는 이 고유한 id를 갖고 성능최적화를 함, 리스트 아이템이 자주 변경이되거나 추가되거나 삭제가 되거나 키는 배열의 인덱스를 사용하면 절대안된다, 꼭 고유한 id를 사용해야한다. 옵션 같은 경우에는 한번 렌더링하고나서 변경이 될 일이없다. 읽기만 하기 떄문이다. 이런 경우에는 배열의 인덱스를 사용해도된다. 동적으로 계속 사용하는 경우에는 배열의 인덱스를 사용하는 것은 좋지않다.
