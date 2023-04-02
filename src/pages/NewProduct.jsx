import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

// cloundinary Uploading assets, firebase write documentation watch

export default function NewProduct() {
  // 사용자가 입력한 데이터를 담을 수 있는 product 이라는 상태 추가
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  // 14.17 업로드 중인지, 아닌지 판단하는 상태(처음은 업로딩 중이 아니니 false)
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

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
    // uploading이 되면 Uploading은 True인 상태다
    setIsUploading(true);

    // 제품의 사진을 Cloudinary에 업로드 하고, URL을 획득합니다.
    uploadImage(file) //
      .then((url) => {
        // Firebase에 새로운 제품을 추가합니다. upload후 상태는 다시 false로 초기화!
        addNewProduct(product, url)
          .then(() => {
            setSuccess('성공적으로 제품이 추가되었습니다');
            // 계속 화면에 저게 표기되면 안되므로, setTimeOut을 통해 4초정도 후에 다시 null로 변경
            setTimeout(() => {
              setSuccess(null);
            }, 4000);
          })
          .finally(() => setIsUploading(false));
      });
  };
  return (
    <div>
      <section className='w-full text-center'>
        <h2 className='text-2xl font-bold my-4'>새로운 제품 등록!</h2>
        {/*    {true && <p className='my-2'>✅ 123123{success}</p>} 이런식으로 스타일링할떄 강제로 true를 주고 문자값을 주면서 확인 가능 */}
        {success && <p className='my-2'>✅{success}</p>}
        <form className='flex flex-col px-12' onSubmit={handleSubmit}>
          {/* 파일을 받아오고, 이미지 받아옴, 확장명은 상관X, 사용자가 꼭 입력해야 submit되도록 */}
          {file && (
            <img
              className='w-96 mx-auto mb-2'
              src={URL.createObjectURL(file)}
              alt='local file'
            />
          )}
          {/* input마다 스타일을 넣는건 힘듬, 그러므로 index.css에 가서 @apply활용 하여 전체 설정 */}
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
          {/* 업로딩 중이라면, 업로드 중을 버튼에 표기하고, 버튼 동작이 안되게 설정 */}
          <Button
            text={isUploading ? '업로드 중 ....' : '제품 등록하기'}
            disabled={isUploading}
          />
        </form>
      </section>
    </div>
  );
}
