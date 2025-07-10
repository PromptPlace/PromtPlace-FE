import InfoRow from './components/InfoRow';

// 실제로는 API로 받아올 사용자 정보
const userInfo = {
  nickname: '주토피아노',
  email: 'kyaassddff0934@gamil.com',
  provider: 'google', // 'google', 'kakao' 등
};

const MyPageInfo = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">회원정보</h1>
      <div className="border-t border-gray-200">
        <InfoRow label="닉네임" value={userInfo.nickname} />
        <InfoRow label="가입한 계정" email={userInfo.email} provider={userInfo.provider} />
        <InfoRow label="계정 바꾸기" email={userInfo.email} provider={userInfo.provider} hasArrow />
        <InfoRow label="결제내역" actionText="내역보기" onAction={() => { /* 내역보기 로직 */ }} />
        <InfoRow label="로그아홉" actionText="로그아웃" onAction={() => { /* 로그아웃 로직 */ }} />
        <InfoRow label="계정 탈퇴" actionText="탈퇴하기" onAction={() => { /* 탈퇴 로직 */ }} isDestructive />
      </div>
    </div>
  );
};

export default MyPageInfo;
