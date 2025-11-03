import iconPerson from '@assets/icon-person-blue.svg';
import InfoRow from './components/InfoRow';
import { useState } from 'react';
import DualModal from '@/components/Modal/DualModal';
import { SingleModal } from './components/MyPageModal';
import { useNavigate } from 'react-router-dom';
import { withdrawUser } from '@/apis/MyPage/withdrawl';
import { useAuth } from '@/context/AuthContext';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import GoogleIcon from '@/assets/icon-google-logo.svg';
import KakaoIcon from '@/assets/icon-kakao-logo.svg';
import NaverIcon from '@/assets/icon-naver-logo.svg';
import PrimaryButton from '@/components/Button/PrimaryButton';

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
  const [deleteStep, setDeleteStep] = useState<'confirm' | 'warning' | 'complete' | null>(null);
  const confirmDelete = () => setDeleteStep('confirm');
  const showWarning = () => setDeleteStep('warning');

  const { login, logout, user } = useAuth();
  const { data: userData } = useGetMember({ member_id: user.user_id });

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

  const getProviderIcon = (provider: 'GOOGLE' | 'KAKAO' | 'NAVER') => {
    switch (provider) {
      case 'GOOGLE':
        return <img src={GoogleIcon} alt="Google Icon" className="inline-block w-[24px] h-[24px]" />;
      case 'KAKAO':
        return <img src={KakaoIcon} alt="Kakao Icon" className="inline-block w-[24px] h-[24px]" />;
      case 'NAVER':
        return <img src={NaverIcon} alt="Naver Icon" className="inline-block w-[24px] h-[24px]" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center pt-[92px] max-lg:pt-[12px] min-h-screen bg-background ">
      <div className="w-full max-lg:px-[20px]">
        <label className="custom-h2 text-text-on-white">프로필</label>
        <section className="flex-flex-col gap-[20px] bg-white  mt-[20px] p-[24px] rounded-[12px]">
          <div>
            <label className="custom-h5 block mb-[12px]">닉네임</label>
            <p className="custom-body2 text-text-on-white px-[16px] py-[12px]">{userData?.data.nickname}</p>
          </div>
          <div>
            <label className="custom-h5 block mb-[12px]">프로필 사진</label>
            <p className="h-[120px] w-[120px]">프로필 사진</p>
          </div>
          <div className="flex flex-col gap-[12px]">
            <label className="custom-h5 block">SNS</label>
            <label className="custom-button2 block text-gray-700">SNS 아이디</label>
            <p className="text-gray-400 custom-body2 px-[16px] py-[12px]"> 아직 작성하지 않았어요!</p>
            <label className="custom-button2 block text-gray-700">접속 가능한 URL</label>
            <p className="text-gray-400 custom-body2 px-[16px] py-[12px]"> 아직 작성하지 않았어요!</p>
          </div>
          <div className="flex flex-col gap-[12px]">
            <label className="custom-h5 block">소개말</label>
            <p className="text-gray-400 custom-body2 px-[16px] py-[12px]"> 아직 작성하지 않았어요!</p>
          </div>
        </section>
        <label className="custom-h2 text-text-on-white">계정</label>
        <section className="flex-flex-col gap-[20px] bg-white  mt-[20px] p-[24px] rounded-[12px]">
          <div>
            <label className="custom-h5 block mb-[12px]">가입한 계정</label>
            <div className="flex gap-[12px] custom-body2 text-text-on-white px-[16px] py-[12px]">
              {getProviderIcon(user.social_type)}
              {userData?.data.email}
            </div>
          </div>
          <div>
            <label className="custom-h5 block mb-[12px]">계정 바꾸기</label>
            <div className="flex justify-between custom-body2 text-text-on-white px-[16px] py-[12px]">
              <div className="flex gap-[12px]">
                {getProviderIcon(user.social_type)}
                {userData?.data.email}
              </div>
              <PrimaryButton buttonType="square" text="변경하기" onClick={() => {}} />
            </div>
          </div>
          <div>
            <label className="custom-h5 block mb-[12px]">로그아웃 및 회원탈퇴</label>
            <div className="flex justify-end gap-[12px] custom-body2 text-text-on-white px-[16px] py-[12px]">
              <PrimaryButton buttonType="square" text="로그아웃" onClick={logout} />
              <PrimaryButton buttonType="square" text="탈퇴하기" onClick={confirmDelete} />
            </div>
          </div>
        </section>

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
  );
};

export default MyPageInfo;
