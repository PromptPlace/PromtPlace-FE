import ModelButton from '@components/Button/ModelButton';
import PrimaryButton from '@components/Button/PrimaryButton';

const TestPage = () => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <h3>🔹 PrimaryButton.tsx</h3>
      <PrimaryButton
        buttonType="login"
        text="로그인 / 회원가입"
        onClick={() => alert('로그인 / 회원가입 버튼')}
        type="button"
      />
      <PrimaryButton buttonType="tip" text="프롬프트 TIP" onClick={() => {}} />
      <PrimaryButton buttonType="square" text="내역보기" onClick={() => {}} />
      <PrimaryButton buttonType="square" text="로그아웃" onClick={() => {}} />
      <PrimaryButton buttonType="square" text="탈퇴하기" onClick={() => {}} />

      <h3>🔹 ModelButton.tsx</h3>
      <ModelButton text="ChatGPT" />
    </div>
  );
};

export default TestPage;
