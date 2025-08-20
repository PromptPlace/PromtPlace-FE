// /pages/ReviewPage.tsx
import { useState, useEffect, useMemo } from 'react';
import ReviewTabs from './components/ReviewTabs';
import ReviewCard from './components/ReviewCard';
import ChatIcon from '@assets/icon-chat-bubble-blue-big.svg';
import UserProfileIcon from '@assets/img-example-profile2.jpg';
import DualModal from '@/components/Modal/DualModal';
import TextModal from '@/components/Modal/TextModal';
import Dropdown from './components/Dropdown';
import { useGetWrittenReviews, useGetReceivedReviews } from '@/hooks/queries/MyPage/useGetReview';
import { useInView } from 'react-intersection-observer';
import { useDeleteReview } from '@/hooks/mutations/MyPage/review';

const DUMMY_WRITTEN_REVIEWS = [
  {
    review_id: 1,
    prompt_id: 1,
    prompt_title: '프롬프트 1',
    rating: 4.5,
    content: '프롬프트 1에 대한 리뷰',
    created_at: '2025-08-06T12:34:56',
  },
  {
    review_id: 2,
    prompt_id: 2,
    prompt_title: '프롬프트 2',
    rating: 5,
    content: '프롬프트 2에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
  },
  {
    review_id: 3,
    prompt_id: 3,
    prompt_title: '프롬프트 3',
    rating: 3,
    content: '프롬프트 3에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
  },
  {
    review_id: 4,
    prompt_id: 4,
    prompt_title: '프롬프트 4',
    rating: 2,
    content: '프롬프트 4에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
  },
  {
    review_id: 5,
    prompt_id: 5,
    prompt_title: '프롬프트 5',
    rating: 1,
    content: '프롬프트 5에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
  },
  {
    review_id: 6,
    prompt_id: 6,
    prompt_title: '프롬프트 6',
    rating: 4,
    content: '프롬프트 6에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
  },
  {
    review_id: 7,
    prompt_id: 7,
    prompt_title: '프롬프트 7',
    rating: 3,
    content: '프롬프트 7에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
  },
  {
    review_id: 8,
    prompt_id: 8,
    prompt_title: '프롬프트 8',
    rating: 2,
    content: '프롬프트 8에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
  },
  {
    review_id: 9,
    prompt_id: 9,
    prompt_title: '프롬프트 9',
    rating: 1,
    content: '프롬프트 9에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
  },
];

const DUMMY_RECEIVED_REVIEWS = [
  {
    review_id: 10,
    prompt_id: 10,
    prompt_title: '프롬프트 1',
    rating: 4.5,
    content: '프롬프트 1에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
  {
    review_id: 11,
    prompt_id: 11,
    prompt_title: '프롬프트 2',
    rating: 5,
    content: '프롬프트 2에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
  {
    review_id: 12,
    prompt_id: 12,
    prompt_title: '프롬프트 3',
    rating: 3,
    content: '프롬프트 3에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
  {
    review_id: 13,
    prompt_id: 13,
    prompt_title: '프롬프트 4',
    rating: 2,
    content: '프롬프트 4에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
  {
    review_id: 15,
    prompt_id: 15,
    prompt_title: '프롬프트 5',
    rating: 1,
    content: '프롬프트 5에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
  {
    review_id: 16,
    prompt_id: 16,
    prompt_title: '프롬프트 6',
    rating: 4,
    content: '프롬프트 6에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
  {
    review_id: 17,
    prompt_id: 17,
    prompt_title: '프롬프트 7',
    rating: 3,
    content: '프롬프트 7에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
  {
    review_id: 18,
    prompt_id: 18,
    prompt_title: '프롬프트 8',
    rating: 2,
    content: '프롬프트 8에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
  {
    review_id: 19,
    prompt_id: 19,
    prompt_title: '프롬프트 9',
    rating: 1,
    content: '프롬프트 9에 대한 리뷰',
    created_at: '2025-07-06T12:34:56',
    writer_id: 12,
    writer_nickname: '홍길동',
    writer_profile_image_url: UserProfileIcon,
  },
];

const reviewOptions = [
  { value: 'written', label: '작성한 리뷰' },
  { value: 'received', label: '받은 리뷰' },
];

const MyReviewPage = () => {
  const [activeTab, setActiveTab] = useState<'written' | 'received'>('written'); // 'written' or 'received'
  const [reviews, setReviews] = useState(DUMMY_WRITTEN_REVIEWS);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  useEffect(() => {
    // 탭이 바뀔 때마다 해당 데이터를 API로 호출
    if (activeTab === 'written') {
      setReviews(DUMMY_WRITTEN_REVIEWS);
    } else {
      setReviews(DUMMY_RECEIVED_REVIEWS);
    }
  }, [activeTab]);

  const [deleteStep, setDeleteStep] = useState<'reject' | 'confirm' | 'complete' | null>(null);

  const isWithin30Days = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();
    return now - createdTime <= 30 * 24 * 60 * 60 * 1000;
  };

  const confirmDelete = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    const reviewToDelete = reviewsToDisplay.find((review) => review.review_id === reviewId);

    if (!reviewToDelete || !isWithin30Days(reviewToDelete.created_at)) {
      setDeleteStep('reject');
      return;
    }

    setDeleteStep('confirm');
  };

  // 더미데이터용 리뷰 삭제 함수
  const deleteReview = () => {
    if (selectedReviewId !== null) {
      //더미 데이터 삭제
      deleteReviewMutation(selectedReviewId);
      setDeleteStep('complete');
    }
  };
  const closeModal = () => {
    setDeleteStep(null);
    setSelectedReviewId(null);
  };

  const { mutate: deleteReviewMutation, isPending } = useDeleteReview();

  const {
    data: writtenData,
    fetchNextPage: fetchNextWritten,
    hasNextPage: hasNextWritten,
    isFetching: isFetchingWritten,
  } = useGetWrittenReviews({ enabled: activeTab === 'written' });

  const {
    data: receivedData,
    fetchNextPage: fetchNextReceived,
    hasNextPage: hasNextReceived,
    isFetching: isFetchingReceived,
  } = useGetReceivedReviews({ enabled: activeTab === 'received' });

  console.log('receivedData', receivedData);

  const reviewsToDisplay = useMemo(() => {
    const data = activeTab === 'written' ? writtenData : receivedData;
    return data?.pages.flatMap((page) => page.reviews) || [];
  }, [activeTab, writtenData, receivedData]);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      if (activeTab === 'written' && hasNextWritten && !isFetchingWritten) {
        fetchNextWritten();
      } else if (activeTab === 'received' && hasNextReceived && !isFetchingReceived) {
        fetchNextReceived();
      }
    }
  }, [
    inView,
    activeTab,
    hasNextWritten,
    fetchNextWritten,
    isFetchingWritten,
    hasNextReceived,
    fetchNextReceived,
    isFetchingReceived,
  ]);

  return (
    <div className="flex justify-center h-screen bg-background  ">
      <div className="flex flex-col w-full max-w-[1236px] pt-[92px] max-lg:pt-[12px] h-full max-lg:px-[20px]">
        <div className="shrink-0">
          <div className="flex items-center gap-[10px] max-lg:gap-[2.5px] mb-[56px] max-lg:mb-[20px] ">
            <img src={ChatIcon} alt="Chat icon" className="w-[32px] max-lg:w-[20px] h-[32px] max-lg:h-[20px]" />
            <div className="text-[32px] max-lg:text-[20px] text-primary-hover font-bold">내 리뷰관리</div>
          </div>
          <div className="max-lg:hidden">
            <ReviewTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="lg:hidden mb-[12px] w-[101px]">
            <Dropdown
              options={reviewOptions}
              selectedValue={activeTab}
              onSelect={(value) => setActiveTab(value as 'written' | 'received')}
            />
          </div>
        </div>
        {reviewsToDisplay.length > 0 ? (
          <div className="flex-grow min-h-0 p-[8px] max-lg:p-[0px]">
            <div className="overflow-y-auto h-full bg-white">
              {reviewsToDisplay.map((review) => (
                <ReviewCard
                  key={review.review_id}
                  type={activeTab}
                  reviewData={review}
                  onDelete={() => confirmDelete(review.review_id)}
                />
              ))}
              <div ref={ref} />
            </div>
          </div>
        ) : (
          <div className="flex mt-[10px] justify-center h-full text-text-on-white text-[20px] font-medium">
            {activeTab === 'written' ? '작성한 리뷰가 없습니다.' : '받은 리뷰가 없습니다.'}
          </div>
        )}
      </div>

      {deleteStep === 'confirm' && (
        <DualModal text="리뷰를 삭제하시겠습니까?" onClickYes={deleteReview} onClickNo={closeModal} />
      )}

      {deleteStep === 'complete' && <TextModal text="리뷰가 삭제되었습니다." onClick={closeModal} size="lg" />}

      {deleteStep === 'reject' && <TextModal text="지금은 리뷰를 삭제할 수 없습니다." onClick={closeModal} size="lg" />}
    </div>
  );
};

export default MyReviewPage;
