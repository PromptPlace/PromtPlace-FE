// /pages/ReviewPage.tsx
import { useState, useEffect } from 'react';
import ReviewTabs from './components/ReviewTabs';
import ReviewCard from './components/ReviewCard';
import archiveIcon from '@assets/icon-archive-blue.svg';
import UserProfileIcon from '@assets/img-example-profile2.jpg';
import DualModal from '@/components/Modal/DualModal';
import TextModal from '@/components/Modal/TextModal';

const DUMMY_WRITTEN_REVIEWS = [
  { id: 1, promptTitle: '프롬프트 1', rating: 4.5, content: '프롬프트 1에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 2, promptTitle: '프롬프트 2', rating: 5, content: '프롬프트 2에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 3, promptTitle: '프롬프트 3', rating: 3, content: '프롬프트 3에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 4, promptTitle: '프롬프트 4', rating: 2, content: '프롬프트 4에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 5, promptTitle: '프롬프트 5', rating: 1, content: '프롬프트 5에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 6, promptTitle: '프롬프트 6', rating: 4, content: '프롬프트 6에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 7, promptTitle: '프롬프트 7', rating: 3, content: '프롬프트 7에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 8, promptTitle: '프롬프트 8', rating: 2, content: '프롬프트 8에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 9, promptTitle: '프롬프트 9', rating: 1, content: '프롬프트 9에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
];

const DUMMY_RECEIVED_REVIEWS = [
  { id: 1, promptTitle: '프롬프트 1', rating: 4.5, content: '프롬프트 1에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 2, promptTitle: '프롬프트 2', rating: 5, content: '프롬프트 2에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 3, promptTitle: '프롬프트 3', rating: 3, content: '프롬프트 3에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 4, promptTitle: '프롬프트 4', rating: 2, content: '프롬프트 4에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 5, promptTitle: '프롬프트 5', rating: 1, content: '프롬프트 5에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 6, promptTitle: '프롬프트 6', rating: 4, content: '프롬프트 6에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 7, promptTitle: '프롬프트 7', rating: 3, content: '프롬프트 7에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 8, promptTitle: '프롬프트 8', rating: 2, content: '프롬프트 8에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
  { id: 9, promptTitle: '프롬프트 9', rating: 1, content: '프롬프트 9에 대한 리뷰', createdAt: '2025-07-06T12:34:56', author: { name: '홍길동', avatar: UserProfileIcon } },
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

  const [deleteStep, setDeleteStep] = useState<'confirm' | 'complete' | null>(null);
    const confirmDelete = (reviewId:number) => {
      setSelectedReviewId(reviewId);
      setDeleteStep('confirm');
    };

    const deleteReview = () => {
      if (selectedReviewId !== null) {
        //더미 데이터 삭제
        setReviews(prevReviews => prevReviews.filter(review => review.id !== selectedReviewId));
        setDeleteStep('complete');
      }
    };
    const closeModal = () => {
      setDeleteStep(null);
      setSelectedReviewId(null);
    };

  return (
    
    
    
    <div className="flex justify-center h-screen bg-background  ">


      <div className="flex flex-col w-full max-w-[1236px] pt-[92px] h-full ">


        <div className="shrink-0">
        <div className="flex items-center gap-[10px] mb-[56px] ">
          <img src={archiveIcon} alt="archive icon" className="w-[32px] h-[32px]" />
          <div className="text-[32px] text-primary-hover font-bold">내 리뷰관리</div>
        </div>

        <ReviewTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      
     
     
     <div className="flex-grow min-h-0 p-[8px]  bg-white">
      <div className="overflow-y-auto h-full">

        {reviews.map(review => (
          <ReviewCard 
            key={review.id} 
            type={activeTab} 
            reviewData={review} 
            onDelete={() => confirmDelete(review.id)}
          />


        ))}
      </div>
      </div>
    

      </div>
   


    {deleteStep === 'confirm' && (
        <DualModal 
          text="리뷰를 삭제하시겠습니까?"
          onClickYes={deleteReview} 
          onClickNo={closeModal}   
        />
      )}

      {deleteStep === 'complete' && (
        <TextModal 
          text="리뷰가 삭제되었습니다." 
          onClick={closeModal}
          size="lg"
        />
      )}

       </div>
  
    
  );

};

export default MyReviewPage;

