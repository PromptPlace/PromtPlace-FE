import GradientButton from '@components/Button/GradientButton';
import IconButton from '@components/Button/IconButton';
import ModelButton from '@components/Button/ModelButton';
import PrimaryButton from '@components/Button/PrimaryButton';

const TestPage = () => {
  return (
    <div className="flex flex-col gap-3 items-center mb-10">
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

      <h3>🔹 IconButton.tsx</h3>
      <IconButton
        buttonType="round"
        style="outline"
        imgType="settings"
        text="업로드 세부 설정"
        onClick={() => {
          alert('업로그 세부 설정 클릭');
        }}
      />
      <IconButton buttonType="round" style="fill" imgType="upload" text="업로드 하기" onClick={() => {}} />
      <IconButton buttonType="round" style="outline" imgType="settings" text="설정 완료" onClick={() => {}} />
      <IconButton buttonType="round" style="outline" imgType="none" textButton="white" text="예" onClick={() => {}} />
      <IconButton buttonType="round" style="fill" imgType="none" textButton="blue" text="아니오" onClick={() => {}} />
      <IconButton buttonType="squareMd" style="fill" imgType="list" text="목록" onClick={() => {}} />
      <IconButton buttonType="squareMd" style="outline" imgType="attach" text="첨부" onClick={() => {}} />
      <IconButton buttonType="squareBig" style="fill" imgType="download" text="다운로드" onClick={() => {}} />
      <IconButton buttonType="squareMd" style="red" imgType="alert" text="프롬프트 신고하기" onClick={() => {}} />
      <IconButton buttonType="squareMini" style="fill" imgType="upload" text="이미지 업로드" onClick={() => {}} />
      <IconButton buttonType="squareMini" style="fill" imgType="copy" text="복사하기" onClick={() => {}} />

      <h3>🔹 GradientButton.tsx</h3>
      <GradientButton buttonType="imgButton" text="프롬프트 작성하기" onClick={() => {}} />
      <GradientButton buttonType="textButton" text="출금하기" onClick={() => {}} />
    </div>
  );
};

export default TestPage;
