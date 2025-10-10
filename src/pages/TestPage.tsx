import { useState } from 'react';

import TagButton from '@components/Button/TagButton';
import GradientButton from '@components/Button/GradientButton';
import IconButton from '@components/Button/IconButton';
import ModelButton from '@components/Button/ModelButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Rating from '@components/Rating';
import Count from '@components/Count';
import TextModal from '@components/Modal/TextModal';
import DualModal from '@components/Modal/DualModal';
import FollowButton from '@components/Button/FollowButton';
import CircleButton from '@components/Button/CircleButton';
import SocialLoginModal from '@components/Modal/SocialLoginModal';
import MobileButton from '@components/Button/MobileButton';
import BackgroundButton from '@/components/Button/BackgroundButton';

const TestPage = () => {
  const [tags, setTags] = useState<string[]>(['#스타트업', '#수채화', '#이미지', '#그림', '#누르면삭제']);

  const handleDelete = (text: string) => {
    setTags(tags.filter((tag) => tag !== text));
  };

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);

  const [follow, setFollow] = useState(false);

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
      <PrimaryButton buttonType="review" text="리뷰작성" onClick={() => {}} />
      <PrimaryButton buttonType="reviewDelete" text="리뷰 삭제" onClick={() => {}} />
      <PrimaryButton buttonType="plus" text="+" onClick={() => {}} />

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
      <IconButton buttonType="squareMd" style="red" imgType="alert" text="신고하기" onClick={() => {}} />
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

      <h3>🔹 FollowButton.tsx</h3>
      <FollowButton
        follow={follow}
        onClick={() => {
          setFollow((prev) => !prev);
        }}
      />

      <h3>🔹 CircleButton.tsx</h3>
      <CircleButton buttonType="send" size="md" onClick={() => {}} />
      <CircleButton buttonType="edit" size="md" onClick={() => {}} />
      <CircleButton buttonType="edit" size="sm" onClick={() => {}} />

      <h3>🔹 MobileButton.tsx</h3>
      <MobileButton text="선택 완료하기" />
      <MobileButton text="작성 완료하기" />
      <MobileButton text="변경하기" />

      <h3>🔹 BackgroundButton.tsx</h3>
      <BackgroundButton background="secondary" text="로그인" onClick={() => {}} />
      <BackgroundButton background="primary" text="회원가입" onClick={() => {}} />

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

      <h3>🟣 TextModal.tsx</h3>
      <button onClick={() => setShowModal(true)}>모달 보기 click</button>
      {showModal && (
        <TextModal text="업로드 세부 설정을 완료해 주세요." onClick={() => setShowModal(false)} size="lg" />
      )}

      <button onClick={() => setShowModal2(true)}>모달 보기2 click</button>
      {showModal2 && (
        <TextModal text="지금은 리뷰를 수정하실 수 없습니다." onClick={() => setShowModal2(false)} size="sm" />
      )}

      <h3>🟣 DualModal.tsx</h3>
      <button onClick={() => setShowModal3(true)}>모달3 보기 click</button>
      {showModal3 && (
        <DualModal text="업로드 하시겠습니까?" onClickYes={() => alert('예')} onClickNo={() => setShowModal3(false)} />
      )}

      <button onClick={() => setShowModal4(true)}>모달4 보기 click</button>
      {showModal4 && (
        <DualModal
          text={
            <>
              탈퇴하시면 회원님의 모든 데이터가 삭제되어 다시 복구할 수 없습니다.
              <br />
              정말 탈퇴하시겠습니까?
            </>
          }
          onClickYes={() => alert('예')}
          onClickNo={() => setShowModal4(false)}
          colorYesText="white"
          colorNoText="blue"
        />
      )}

      <h3>🟣 SocialLoginModal.tsx</h3>
      <button onClick={() => setShowModal5(true)}>모달5 보기 click</button>
      {showModal5 && <SocialLoginModal isOpen={showModal5} onClose={() => setShowModal5(false)} onClick={() => {}} />}

      <div>
        <p className="custom-h1">H1(큰 타이틀)</p>
        <p className="custom-h2">H2(주요 구역 큰 제목)</p>
        <p className="custom-h3">H3(주요 구역 소 제목)</p>
        <p className="custom-h4">H4(모달 큰 제목)</p>
        <p className="custom-h5">H5(모달 소 제목)</p>

        <p className="custom-body1">Body1(본문)</p>
        <p className="custom-body2">Body2(카드 내 본문)</p>
        <p className="custom-body3">Body3(보조 설명)</p>

        <p className="custom-button1">Button1(CTA)</p>
        <p className="custom-button2">Button2(칩)</p>

        <div className="bg-sub-gradient w-full">sub-gradient</div>

        <div className="w-full lg:bg-primary max-lg:bg-gray400 max-phone:bg-alert">breakpoint</div>
      </div>
    </div>
  );
};

export default TestPage;
