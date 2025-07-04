import TagButton from '@components/Button/TagButton';
import GradientButton from '@components/Button/GradientButton';
import IconButton from '@components/Button/IconButton';
import ModelButton from '@components/Button/ModelButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import { useState } from 'react';
import Rating from '@components/Rating';
import Count from '@components/Count';

const TestPage = () => {
  const [tags, setTags] = useState<string[]>(['#스타트업', '#수채화', '#이미지', '#그림', '#누르면삭제']);

  const handleDelete = (text: string) => {
    setTags(tags.filter((tag) => tag !== text));
  };

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
      <PrimaryButton buttonType="squareMini" text="완료" onClick={() => {}} />
      <PrimaryButton buttonType="squareMini" text="등록" onClick={() => {}} />
      <PrimaryButton buttonType="review" text="리뷰 작성하기" onClick={() => {}} />

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

      <h3>🔹 TagButton.tsx</h3>
      <TagButton hasDelete={false} text="#글쓰기" onClick={() => {}} />
      <TagButton hasDelete={false} text="#일러스트" onClick={() => {}} />
      <div className="flex gap-4">
        {tags.map((tag, idx) => (
          <TagButton key={idx} hasDelete={true} text={tag} onClick={() => handleDelete(tag)} />
        ))}
      </div>

      <h3>🔶 Rating.tsx</h3>
      <Rating star={5} />
      <Rating star={4.5} />
      <Rating star={2.5} />
      <Rating star={0} />

      <h3>🟢 Count.tsx</h3>
      <div className="flex gap-[10px]">
        <Count imgType="eye" count={2109} />
        <Count imgType="download" count={120} />
      </div>
    </div>
  );
};

export default TestPage;
