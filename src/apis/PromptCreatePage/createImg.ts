import axios from 'axios';
import { axiosInstance } from '@/apis/axios';
import type {
  PresignUrlRequest,
  PresignUrlResponse,
  ImageMappingRequest,
  UploadPromptWithImageRequest,
  UploadPromptWithImageResponse,
  ImageKeyInfo,
} from '@/types/PromptCreatePage/createImg';

const base = import.meta.env.VITE_SERVER_API_URL;

// 1. Presigned URL 발급
export const getPresignedUrl = async (data: PresignUrlRequest): Promise<PresignUrlResponse> => {
  const response = await axiosInstance.post(`${base}/api/prompts/presign-url`, data);
  return response.data;
};

// 2. 이미지 업로드
export const uploadImageToS3 = async (url: string, file: File): Promise<void> => {
  await axios.put(url, file, {
    headers: { 'Content-Type': file.type },
  });
};

// 3. 이미지 업로드 과정 (presigned URL 발급 + 실제 이미지 업로드)
export const uploadImages = async (files: File[]): Promise<ImageKeyInfo[]> => {
  const imageKeys: ImageKeyInfo[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const contentType = file.type;

    // 지원하는 이미지 타입 검증
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(contentType)) {
      throw new Error(`지원하지 않는 이미지 타입: ${contentType}`);
    }

    // Presigned URL 발급
    const { url, key } = await getPresignedUrl({
      key: file.name,
      contentType: contentType,
    });

    // 이미지 업로드
    await uploadImageToS3(url, file);

    // 업로드된 이미지 정보 저장
    imageKeys.push({
      key: key,
      order_index: i,
    });
  }

  return imageKeys;
};

// 4. 프롬프트 업로드
export const postPromptWithImage = async (
  data: UploadPromptWithImageRequest,
): Promise<UploadPromptWithImageResponse> => {
  const response = await axiosInstance.post(`${base}/api/prompts`, data);
  return response.data;
};

// 5. 이미지와 프롬프트 매핑
export const mapImagesToPrompt = async (promptId: number, imageKeys: ImageKeyInfo[]): Promise<void> => {
  for (const imageInfo of imageKeys) {
    await axiosInstance.post(`${base}/api/prompts/${promptId}/images`, {
      image_url: `https://promptplace-s3.s3.ap-northeast-2.amazonaws.com/${imageInfo.key}`,
      order_index: imageInfo.order_index,
    } as ImageMappingRequest);
  }
};
