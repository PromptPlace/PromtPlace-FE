/**
 * 로컬 스토리지와 관련된 로직을 처리하는 훅입니다.
 * setItem 사용 시에는 저장할 값을 같이 넘겨주시면 됩니다.
 *
 * @param {string} key -- 로컬스토리지 키 값
 * @returns { setItem, getItem, removeItem }
 *
 * @example
 * const { getItem, setItem, removeItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
 *
 * @author 김진효
 * **/

export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('setItem 오류', error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log('getItem 오류', error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log('removeItem 오류', error);
    }
  };

  return { setItem, getItem, removeItem };
};
