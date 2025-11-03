import { useState } from 'react';
import DualModal from '@/components/Modal/DualModal';
import { SingleModal } from './MyPageModal';
import { useNavigate } from 'react-router-dom';
import { withdrawUser } from '@/apis/MyPage/withdrawl';
import { useAuth } from '@/context/AuthContext';
import GoogleIcon from '@/assets/icon-google-logo.svg';
import KakaoIcon from '@/assets/icon-kakao-logo.svg';
import NaverIcon from '@/assets/icon-naver-logo.svg';
import PrimaryButton from '@/components/Button/PrimaryButton';
import type { ResponseMemberDto } from '@/types/ProfilePage/profile';

interface ProfileEditViewProps {
  userData?: ResponseMemberDto;
  setActiveTab: React.Dispatch<React.SetStateAction<'prompt' | 'dashboard' | 'profile' | 'profileEdit'>>;
}

const ProfileEditView = ({ userData, setActiveTab }: ProfileEditViewProps) => {
  const [deleteStep, setDeleteStep] = useState<'confirm' | 'warning' | 'complete' | null>(null);
  const confirmDelete = () => setDeleteStep('confirm');
  const showWarning = () => setDeleteStep('warning');

  const { logout, user } = useAuth();

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

  const [nickname, setNickname] = useState(userData?.data.nickname || '');
  const [profileImage, setProfileImage] = useState(userData?.data.profile_image || null);
  //sns 아이디 및 접속 가능한 URL도 상태로 관리 필요
  const [intros, setIntros] = useState(userData?.data.intros || '');
  const [snsUrl, setSnsUrl] = useState('');
  const [snsId, setSnsId] = useState('');

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 프로필 수정 제출 로직 구현 필요
    console.log('프로필 수정 제출:', { nickname, profileImage, intros });
  };

  return (
    <div className="flex justify-center pt-[56px] max-lg:pt-[12px] min-h-screen bg-background ">
      <div className="flex flex-col w-full max-lg:px-[20px]">
        <button
          className="self-end custom-button1 w-[237px] px-[91px] py-[12px] rounded-[12px]  bg-primary text-white text-[14px]"
          onClick={() => setActiveTab('profile')}>
          편집하기
        </button>
        <label className="custom-h2 block text-text-on-white">프로필</label>
        <section className="flex flex-col gap-[20px] bg-white  mt-[20px] p-[24px] rounded-[12px]">
          <div>
            <label className="custom-h5 block mb-[4px]">닉네임</label>
            <p className="custom-body3 text-gray-700 mb-[8px]">※ 닉네임은 최대 10자까지 입력 가능합니다.</p>
            <input
              id="nickname"
              type="text"
              className="w-full custom-body2 text-text-on-white px-[16px] py-[12px] rounded-[8px] bg-gray-50"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div>
            <label className="custom-h5 block mb-[12px]">프로필 사진</label>
            <p className="custom-body3 text-gray-700 mb-[8px]">※ 5MB 이하의 JPG, GIF, PNG 파일을 지원합니다.</p>
            <p className="h-[120px] w-[120px] mb-[12px]">
              {userData?.data.profile_image ? (
                <img
                  src={userData.data.profile_image}
                  alt="Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                '기본 프로필사진'
              )}
            </p>
            <PrimaryButton buttonType="square" text="이미지 업로드" textSize={12} onClick={() => {}} />
          </div>
          <div className="flex flex-col gap-[12px]">
            <label className="custom-h5 block">SNS</label>
            <p className="custom-body3 text-gray-700 mb-[8px]">SNS 아이디와 URL을 입력해주세요.</p>
            <label className="custom-button2 block text-gray-700">SNS 아이디</label>
            <input
              id="snsId"
              type="text"
              className="custom-body2 text-text-on-white w-full rounded-[8px] bg-gray-50 px-[16px] py-[12px] placeholder:text-gray-400"
              placeholder="예) @promptplace"
              value={snsId}
              onChange={(e) => setSnsId(e.target.value)}
            />
            <label className="custom-button2 block text-gray-700">접속 가능한 URL</label>
            <input
              id="snsUrl"
              type="text"
              className="custom-body2 text-text-on-white w-full rounded-[8px] bg-gray-50 px-[16px] py-[12px] placeholder:text-gray-400"
              placeholder="예) https://www.instagram.com/designking_01/#"
              value={snsUrl}
              onChange={(e) => setSnsUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <label className="custom-h5 block">소개말</label>
            <p className="custom-body3 text-gray-700 mb-[8px]">프롬프트를 입력한 AI의 답변 일부를 작성해주세요.</p>
            <input
              id="intros"
              type="text"
              className="custom-body2 text-text-on-white w-full rounded-[8px] bg-gray-50 px-[16px] py-[12px] placeholder:text-gray-400"
              placeholder="예) 안녕하세요 저는 최근 프롬프트에 관심이 많아진 사람입니다"
              value={intros}
              onChange={(e) => setIntros(e.target.value)}
            />
          </div>
        </section>
        <label className="custom-h2 text-text-on-white block mt-[56px]">계정</label>
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

export default ProfileEditView;
