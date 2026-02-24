import { useSearchParams } from 'react-router-dom';

const usePromptQueryState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get('categoryId');
  const categoryName = searchParams.get('categoryName');
  const subcategory = searchParams.get('subcategory');
  const model = searchParams.getAll('model'); // 모델은 다중 선택 가능하므로 getAll 사용
  const sort = searchParams.get('sort');
  const page = searchParams.get('page');
  const size = searchParams.get('size');

  const updateParam = (key: string, value: string | string[] | null) => {
    setSearchParams((prev) => {
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        prev.delete(key);
      } else if (Array.isArray(value)) {
        prev.set(key, value.join(','));
      } else {
        prev.set(key, value);
      }
      return prev;
    });
  };

  return {
    categoryId,
    categoryName,
    subcategory,
    model,
    sort,
    page,
    size,
    updateParam,
  };
};

export default usePromptQueryState;
