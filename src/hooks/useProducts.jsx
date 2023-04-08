import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getProducts as fetchProducts, addNewProduct } from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery(['products'], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      //Mutation(수정)이 성공적으로 되면은 invalidateQueries 즉, products를 즉각적으로 업데이트 시킴!
      onSuccess: () => queryClient.invalidateQueries(['products']),
    }
  );
  return { productsQuery, addProduct };
}

// 한곳에서 동일한 캐시키로 데이터를 읽어오는것/업데이트하는것이 함께있으니
// staleTime을 얼마나 설정해야하는지, InvalidateQueries를 해야하는지 말아야하는지를 쉽게 판단하고 관리하기 편하다.
