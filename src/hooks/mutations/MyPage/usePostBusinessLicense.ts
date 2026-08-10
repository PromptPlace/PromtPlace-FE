import { useMutation } from '@tanstack/react-query';
import { postBusinessLicense } from '@apis/MyPage/settlement.ts';

function usePostBusinessLicense() {
  return useMutation({
    mutationFn: (file: File) => postBusinessLicense(file),
    onError: (error) => {
      console.error(error);
    },
  });
}

export default usePostBusinessLicense;
