import { useRef, useState } from 'react';
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
import ProfileIcon from '@assets/header/mypage.svg?react';
import useGetSNS from '@/hooks/queries/ProfilePage/useGetSNS';
import usePatchEditMember from '@/hooks/mutations/ProfilePage/usePatchEditMember';
import usePostImg from '@/hooks/mutations/ProfilePage/usePostImg';
import useImgUpload from '@/hooks/useImgUpload';
import usePostSNS from '@/hooks/mutations/ProfilePage/usePostSNS';
import usePostEditIntro from '@/hooks/mutations/ProfilePage/usePostEditIntro';
import usePatchEditIntro from '@/hooks/mutations/ProfilePage/usePatchEditIntro';
import usePatchSNS from '@/hooks/mutations/ProfilePage/usePatchSNS';
import useDeleteSNS from '@/hooks/mutations/ProfilePage/useDeleteSNS';

interface ProfileEditViewProps {
  userData?: ResponseMemberDto;
  setActiveTab: React.Dispatch<
    React.SetStateAction<'prompt' | 'dashboard' | 'profile' | 'profileEdit' | 'authored' | 'downloaded'>
  >;
}

const ProfileEditView = ({ userData, setActiveTab }: ProfileEditViewProps) => {
  const [deleteStep, setDeleteStep] = useState<'confirm' | 'warning' | 'complete' | null>(null);
  const confirmDelete = () => setDeleteStep('confirm');
  const showWarning = () => setDeleteStep('warning');

  const { logout, user } = useAuth();
  const { data: snsData } = useGetSNS({ member_id: user.user_id });

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

  //이메일 파싱해서 어느 소셜 계정인지 구분 필요
  const getProviderFromEmail = (email: string) => {
    if (email.includes('@google.com')) return 'GOOGLE';
    if (email.includes('@kakao.com')) return 'KAKAO';
    if (email.includes('@naver.com')) return 'NAVER';
    return null;
  };
  const socialType = getProviderFromEmail(userData?.data.email || '');

  const [nickname, setNickname] = useState(userData?.data.nickname || '');
  //sns 아이디 및 접속 가능한 URL도 상태로 관리 필요
  const [intros, setIntros] = useState(userData?.data.intros || '');

  const lastSNS = snsData?.data?.length ? snsData.data[snsData.data.length - 1] : undefined;
  const [snsUrl, setSnsUrl] = useState(lastSNS?.url || '');
  const [snsId, setSnsId] = useState(lastSNS?.user_sns_id || '');

  // 회원 정보 수정
  const { mutate } = usePatchEditMember({ member_id: user.user_id });

  // 회원 프로필 이미지 등록
  const { mutate: mutatePostImg } = usePostImg({ member_id: user.user_id });
  const { selectedImg, handleUpload } = useImgUpload(mutatePostImg);
  const imageRef = useRef<HTMLInputElement>(null);

  // 회원 SNS 작성
  const { mutate: mutatePostSNS } = usePostSNS({ member_id: user.user_id });
  // 회원 SNS 수정
  const { mutate: mutatePatchSNS } = usePatchSNS({ member_id: user.user_id });
  // 회원 SNS 삭제
  const { mutate: mutateDeleteSNS } = useDeleteSNS({ member_id: user.user_id });

  // 회원 한줄 소개 작성 및 수정
  const { mutate: mutateIntro } = usePostEditIntro({ member_id: user.user_id });
  const { mutate: mutatePatchIntro } = usePatchEditIntro({ member_id: user.user_id });

  const handleProfileSubmit = () => {
    // 프로필 수정 제출 로직 구현 필요
    console.log('프로필 수정 제출:', { nickname, intros });
    mutate({ nickname }); // nickname 수정

    if (snsData?.data.length === 0) {
      mutatePostSNS({ url: snsUrl, description: '', user_sns_id: snsId });
      console.log('post실행', snsId);
    } else if (snsData?.data.length !== 0 && snsUrl === '') {
      const lastSNSId = snsData!.data[snsData!.data.length - 1]!.sns_id;
      mutateDeleteSNS({ sns_id: lastSNSId });
    } else if (snsData?.data.length !== 0 && snsData?.data) {
      mutatePatchSNS({
        url: snsUrl,
        description: '',
        user_sns_id: snsId,
        sns_id: snsData?.data[snsData?.data?.length - 1].sns_id,
      });
    }

    if (!userData?.data.intros) {
      mutateIntro({ intro: intros });
    } else {
      mutatePatchIntro({ intro: intros });
    }
  };

  return (
    <div className="flex justify-center pt-[56px] max-lg:pt-[12px] min-h-screen bg-background">
      <div className="flex flex-col w-full max-lg:px-[20px]">
        <button
          className="self-end custom-button1 w-[237px] py-[12px] rounded-[12px] bg-primary text-white text-[14px] max-phone:py-[12px] max-phone:text-[12px] max-phone:max-w-[143px] max-phone:w-full"
          onClick={() => {
            setActiveTab('profile');
            handleProfileSubmit();
          }}>
          저장하기
        </button>

        <label className="custom-h2 block text-text-on-white">프로필</label>
        <section className="flex flex-col gap-[20px] bg-white  mt-[20px] p-[24px] rounded-[12px]">
          <div>
            <label className="custom-h5 block mb-[4px] max-phone:text-[14px]">닉네임</label>
            <p className="custom-body3 text-gray-700 mb-[8px] max-phone:text-[12px]">
              ※ 닉네임은 최대 10자까지 입력 가능합니다.
            </p>
            <input
              id="nickname"
              type="text"
              className="w-full custom-body2 text-text-on-white px-[16px] py-[12px] rounded-[8px] bg-gray-50 outline-none"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={10}
            />
          </div>

          <div>
            <label className="custom-h5 block mb-[12px] max-phone:text-[14px]">프로필 사진</label>
            <p className="custom-body3 text-gray-700 mb-[8px] max-phone:text-[12px]">
              ※ 5MB 이하의 JPG, GIF, PNG 파일을 지원합니다.
            </p>
            <p className="h-[120px] w-[120px] mb-[12px] max-lg:w-[80px] max-lg:h-[80px]">
              {userData?.data.profile_image ? (
                <img
                  src={userData.data.profile_image || selectedImg?.thumbnail}
                  alt="Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <ProfileIcon className="w-full h-full" />
              )}
            </p>
            <PrimaryButton
              buttonType="square"
              text="이미지 업로드"
              textSize={12}
              onClick={() => {
                imageRef.current?.click();
              }}
            />
            <input type="file" accept="image/*" ref={imageRef} onChange={handleUpload} style={{ display: 'none' }} />
          </div>

          <div className="flex flex-col gap-[12px]">
            <label className="custom-h5 block max-phone:text-[14px]">SNS</label>
            <p className="custom-body3 text-gray-700 mb-[8px] max-phone:text-[12px]">
              SNS 아이디와 URL을 입력해주세요.
            </p>

            <label className="custom-button2 block text-gray-700 max-phone:text-[12px]">SNS 아이디</label>
            <input
              id="snsId"
              type="text"
              className="custom-body2 text-text-on-white w-full rounded-[8px] bg-gray-50 px-[16px] py-[12px] placeholder:text-gray-400"
              placeholder={lastSNS?.user_sns_id || '예) @promptplace'}
              value={snsId}
              onChange={(e) => setSnsId(e.target.value)}
            />

            <label className="custom-button2 block text-gray-700 max-phone:text-[12px]">접속 가능한 URL</label>
            <input
              id="snsUrl"
              type="text"
              className="custom-body2 text-text-on-white w-full rounded-[8px] bg-gray-50 px-[16px] py-[12px] placeholder:text-gray-400"
              placeholder={lastSNS?.url || '예) https://www.instagram.com/designking_01/#'}
              value={snsUrl}
              onChange={(e) => setSnsUrl(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[12px]">
            <label className="custom-h5 block max-phone:text-[14px]">소개말</label>
            <p className="custom-body3 text-gray-700 mb-[8px] max-phone:text-[12px]">자유롭게 소개말을 작성해주세요.</p>
            <input
              id="intros"
              type="text"
              className="custom-body2 text-text-on-white w-full rounded-[8px] bg-gray-50 px-[16px] py-[12px] placeholder:text-gray-400"
              placeholder={userData?.data.intros || '예) 안녕하세요 저는 최근 프롬프트에 관심이 많아진 사람입니다'}
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
              {getProviderIcon(socialType as 'GOOGLE' | 'KAKAO' | 'NAVER')}
              {userData?.data.email}
            </div>
          </div>
          <div>
            <label className="custom-h5 block mb-[12px]">계정 바꾸기</label>
            <div className="flex justify-between custom-body2 text-text-on-white px-[16px] py-[12px]">
              <div className="flex gap-[12px]">
                {getProviderIcon(socialType as 'GOOGLE' | 'KAKAO' | 'NAVER')}
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
