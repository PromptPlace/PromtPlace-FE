import iconPerson from '@assets/icon-person-blue.svg';
import InfoRow from './components/InfoRow';
import { useState } from 'react';
import DualModal from '@/components/Modal/DualModal';
import { SingleModal } from './components/MyPageModal';
import { useNavigate } from 'react-router-dom';
import { withdrawUser } from '@/apis/MyPage/withdrawl';
import { useAuth } from '@/context/AuthContext';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import { ReportModal } from './components/MyPageModal';

// 실제로는 API로 받아올 사용자 정보
const userInfo: {
  nickname: string;
  email: string;
  provider: 'google' | 'kakao' | 'naver';
} = {
  nickname: '주토피아노',
  email: 'kyaassddff0934@naver.com',
  provider: 'naver',
};

const MyPageInfo = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); //선택된 옵션 상태
  const [description, setDescription] = useState(''); //설명 상태
  const [deleteStep, setDeleteStep] = useState<'confirm' | 'warning' | 'search' | 'warning2' | 'complete' | null>(null);
  const confirmDelete = () => setDeleteStep('confirm');
  const showWarning = () => setDeleteStep('warning');

  const { logout, user } = useAuth();
  const { data: userData } = useGetMember({ member_id: user.user_id });

  const searchReport = () => {
    setDeleteStep('search');
  };


  const deleteAccount = () => {
    // 실제 API 호출 로직
    withdrawUser()
      .then(() => {
        console.log('계정 탈퇴 성공');
        // 추가적인 로직 (예: 리다이렉트, 상태 업데이트 등)
      })
      .catch((error) => {
        console.error('계정 탈퇴 실패:', error);
        // 에러 처리 로직
      });

    console.log('계정 탈퇴 요청');
    setDeleteStep('complete');
  };
  const navigate = useNavigate();
  const closeModal = () => {
    setDeleteStep(null);
  };

  return (
    <div className="flex justify-center pt-[92px] max-lg:pt-[12px] min-h-screen bg-background ">
      <div className="w-full max-w-[1236px] max-lg:px-[20px] ">
        <div className="flex items-center gap-[10px] mb-[70px] max-lg:mb-[20px]">
          <img src={iconPerson} alt="person icon" className="w-[32px] max-lg:w-[20px] h-[32px] max-lg:h-[20px]" />
          <div className="text-[32px] max-lg:text-[20px] text-primary-hover font-bold">회원정보</div>
        </div>

        <div className="bg-white border-t-[1px] max-lg:border-t-[0px] border-t-primary-hover">
          <InfoRow label="닉네임" nickname={userData?.data.nickname} />
          <InfoRow label="가입한 계정" email={userData?.data.email} provider={user.social_type} />
          <InfoRow label="계정 바꾸기" email={userData?.data.email} provider={user.social_type} hasArrow />
          <InfoRow
            label="계좌 정보 등록"
            actionText="등록하기"
            onAction={() => {
              navigate('/mypage/info/account');
            }}
          />
          <InfoRow
            label="결제내역"
            actionText="내역보기"
            onAction={() => {
              navigate('/mypage/paymentHistory');
            }}
          />
          <InfoRow
            label="로그아웃"
            actionText="로그아웃"
            onAction={() => {
              logout();
            }}
          />
          <InfoRow label="계정 탈퇴" actionText="탈퇴하기" onAction={confirmDelete} isDestructive />
          {deleteStep === 'confirm' && (
            <DualModal
              text="회원을 탈퇴하시겠습니까?"
              onClickYes={showWarning}
              onClickNo={closeModal}
              colorYesText="white"
              colorNoText="blue"
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
              onClickYes={searchReport}
              onClickNo={closeModal}
              colorYesText="white"
              colorNoText="blue"
            />
          )}
          {deleteStep === 'search' && (
            <ReportModal
              isOpen={deleteStep === 'search'}
              onClose={() => {
                closeModal();
              }}
              onNext={() => {
                setDeleteStep('warning2');
              }}
              selectedOptions={selectedOptions}
              description={description}
              setSelectedOptions={setSelectedOptions}
              setDescription={setDescription}
            />
          )}
          {deleteStep === 'warning2' && (
            <DualModal
              text={
                <>
                  탈퇴 시 모든 데이터가 사라지며 30일동안 재가입이 불가능합니다.
                  <br />
                  정말 탈퇴하시겠습니까?
                </>
              }
              onClickYes={deleteAccount}
              onClickNo={closeModal}
              colorYesText="white"
              colorNoText="blue"
            />
          )}
          {deleteStep === 'complete' && (
            <SingleModal
              text="탈퇴가 완료되었습니다."
              onClick={() => {
                closeModal();
                navigate('/');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageInfo;
