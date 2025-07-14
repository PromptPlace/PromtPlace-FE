import iconPerson from '@assets/icon-person-blue.svg';
import InfoRow from './components/InfoRow';
import { useState } from 'react';
import DualModal from '@/components/Modal/DualModal';
import SingleModal from './components/singleModal';
import { useNavigate } from 'react-router-dom';

// 실제로는 API로 받아올 사용자 정보
const userInfo: {
  nickname: string;
  email: string;
  provider: 'google' | 'kakao' | 'naver';
} = {
  nickname: '주토피아노',
  email: 'kyaassddff0934@gmail.com',
  provider: 'google',
};



const MyPageInfo = () => {

  const [deleteStep, setDeleteStep] = useState<'confirm' | 'warning' | 'complete' | null>(null); 
  const confirmDelete = () => setDeleteStep('confirm');
  const showWarning = () => setDeleteStep('warning');
  const deleteAccount = () => {
    // 실제 API 호출 로직
    setDeleteStep('complete');
   
  };
  const navigate = useNavigate();
  const closeModal = () => {
    setDeleteStep(null);
    
  };

  return (
    <div className="flex justify-center pt-[92px] min-h-screen bg-background ">
      <div className="w-full max-w-[1236px] ">

        <div className="flex items-center gap-[10px] mb-[70px]">
          <img src={iconPerson} alt="person icon" className="w-[32px] h-[32px]" />
          <div className="text-[32px] text-primary-hover font-bold">회원정보</div>
        </div>

        <div className="bg-white border-t-[1px] border-t-primary-hover">
           
        <InfoRow label="닉네임" nickname={userInfo.nickname} />
        <InfoRow label="가입한 계정" email={userInfo.email} provider={userInfo.provider} />
        <InfoRow label="계정 바꾸기" email={userInfo.email} provider={userInfo.provider} hasArrow />
        <InfoRow label="결제내역" actionText="내역보기" onAction={() => { navigate('/mypage/paymentHistory') }} />
        <InfoRow label="로그아웃" actionText="로그아웃" onAction={() => { /* 로그아웃 로직 */ }} />
        <InfoRow label="계정 탈퇴" actionText="탈퇴하기" onAction={confirmDelete} isDestructive />
        {deleteStep === 'confirm' && (
        <DualModal 
          text="회원을 탈퇴하시겠습니까?"
          onClickYes={showWarning}  // '예'를 누르면 경고 단계로
          onClickNo={closeModal}    // '아니오'를 누르면 모달 닫기
        />
      )}
      {deleteStep === 'warning' && (
        <DualModal
        text={
          <>
            탈퇴하시면 회원님의 모든 데이터가 삭제되어 다시 복구할 수 없습니다.
            <br />
            정말 탈퇴하시겠습니까?
          </>
        }
          onClickYes={deleteAccount}
          onClickNo={closeModal}
        />
      )}
      {deleteStep === 'complete' && (
        <SingleModal text="탈퇴가 완료되었습니다." onClick={() => {
          closeModal();
          navigate('/');
        }} />
      )}
           </div>
        
    </div>
    </div>
  );
};

export default MyPageInfo;
