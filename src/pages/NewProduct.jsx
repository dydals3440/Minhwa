import React, { useState } from 'react';
import Button from '../components/ui/Button';

// cloundinary Uploading assets, firebase write documentation watch

export default function NewProduct() {
  // 사용자가 입력한 데이터를 담을 수 있는 product 이라는 상태 추가
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const handleChange = (e) => {
    console.log(e.target);
    // 우리가 e.target에서 제일 궁금한건, 이름, values(경로)), 파일이 선택이 되었다면 files가 할당이 되므로 이것을 받아옴
    const { name, value, files } = e.target;
    // 입력 폼에서 발생한 모든 handleChange는 이름이 파일인 경우에만, 파일을 set해주고, 나머지의 경우에는 기존의 product오브젝트에 업데이트 하는 부분만 덮어씌워줌
    if (name === 'file') {
      setFile(files && files[0]);
      console.log(files[0]);
      return; //바로 리턴해주어서 setProduct이 호출되지 않도록
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // 제품의 사진을 Cloudinary에 업로드 하고, URL을 획득합니다.
    // Firebase에 새로운 제품을 추가합니다.
  };
  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          {/* 파일을 받아오고, 이미지 받아옴, 확장명은 상관X, 사용자가 꼭 입력해야 submit되도록 */}
          {file && <img src={URL.createObjectURL(file)} alt='local file' />}
          <input
            type='file'
            accept='image/*'
            name='file'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='title'
            value={product.title ?? ''}
            placeholder='제품명'
            required
            onChange={handleChange}
          />
          <input
            type='number'
            name='price'
            value={product.price ?? ''}
            placeholder='가격'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='category'
            value={product.category ?? ''}
            placeholder='카테고리'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='description'
            value={product.description ?? ''}
            placeholder='제품 설명'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='options'
            value={product.options ?? ''}
            placeholder='옵션들(콤마(,)로 구분'
            required
            onChange={handleChange}
          />
          <Button text={'제품 등록하기'} />
        </form>
      </section>
    </div>
  );
}
