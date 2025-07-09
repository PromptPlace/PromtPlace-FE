import { useState } from 'react';
import IconButton from '@components/Button/IconButton';
import FollowButton from '@components/Button/FollowButton';
import Rating from '@components/Rating';
import profile from '../assets/profile.jpg';
import TagButton from '@components/Button/TagButton';
import { AiOutlineHeart } from 'react-icons/ai';

interface Props {
  title: string;
  price: number;
  isFree: boolean;
  downloads: number;
  likes: number;
  reviewCounts: number;
  rating: number;
  updatedAt: string;
  userId: number;
}

const dummyReviews = Array(8).fill({
  id: 1,
  user: '홍길동',
  rating: 4,
  comment: '가격도 저렴하고 퀄리티 좋아요. 잘 쓰고 있습니다. 근데 좀 단조로운 것 같아요.',
  profile,
});

const PromptActions = ({ title, price, isFree, downloads, likes, reviewCounts, rating, updatedAt, userId }: Props) => {
  const [follow, setFollow] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [tags, setTags] = useState<string[]>(['#수묵화', '#수채화', '#디자인', '#일러스트', '#그림', '#이미지']);

  const handleDelete = (text: string) => {
    setTags(tags.filter((tag) => tag !== text));
  };

  if (showReviews) {
    return (
      <div className="w-[459px] bg-[#FFFEFB] h-[654px] px-8 py-6 flex flex-col">
        {/* 상단 버튼+타이틀 영역 */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => setShowReviews(false)}
            className="text-2xl font-bold leading-none hover:opacity-70"
            aria-label="뒤로가기">
            &lt;
          </button>
          <h2 className="font-bold text-[20px] ml-3 inline-flex items-center gap-2">
            구매자 리뷰
            <span className="w-[37px] h-[28px] px-[10px] py-[5px] border border-[#999999] rounded-full text-[16px] text-[#999898] flex items-center justify-center">
              {reviewCounts}
            </span>
          </h2>
        </div>

        <div className="h-[1px] bg-[#CCCCCC] w-full mb-4" />

        {/* 스크롤박스 */}
        <div
          className="flex-1 overflow-y-auto pr-2"
          style={{
            scrollbarWidth: 'thin', // Firefox
            scrollbarColor: '#fff transparent', // Firefox
          }}>
          {/* Chrome, Edge, Safari 등 Webkit 계열 스크롤바 스타일 */}
          <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #fff; 
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
          }
        `}</style>

          <div className="custom-scrollbar">
            {dummyReviews.map((review, idx) => (
              <div key={idx}>
                <div className="flex gap-3 mb-4 last:mb-0">
                  <img src={review.profile} alt={`${review.user} 프로필`} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.user}</p>
                      <Rating star={review.rating} />
                      <span className="text-gray-400 ml-auto">(4.0)</span>
                    </div>
                    <p className="mt-1 text-gray-700">{review.comment}</p>
                  </div>
                </div>

                {/* 마지막 아이템이 아니면 구분선 추가 */}
                {idx !== dummyReviews.length - 1 && <div className="h-[1px] bg-[#CCCCCC] w-full my-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[459px] bg-[#FFFEFB] h-[654px] px-8">
      {/* 유저 정보 */}
      <div className="h-[96px] box-border flex items-center gap-3">
        <img src={profile} alt="profile" className="w-10 h-10 rounded-full" />
        <div className="flex items-center w-full">
          <p className="font-semibold text-[20px] mr-8">디자인킹</p>
          <FollowButton follow={follow} onClick={() => setFollow(!follow)} />
        </div>
      </div>
      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      <div className="font-bold text-[24px] pt-[20px] pb-[10px]">{`[${title}]`}</div>

      <div className="text-[24px] pt-[20px] pb-[20px] font-bold">{isFree ? '무료' : `${price.toLocaleString()}원`}</div>

      <div className="h-[96px] box-border flex items-center gap-3">
        <IconButton
          buttonType="squareBig"
          style="fill"
          imgType="download"
          text="다운로드"
          onClick={() => alert('다운로드')}
        />
        <AiOutlineHeart className="ml-[30px] w-[28px] h-[25px] text-[24px] text-[#999898]" />
      </div>

      <div>
        <div className="mt-[25px] flex justify-start">
          <Rating star={rating} />
        </div>

        <div
          className="pt-[20px] text-[20px] flex items-center gap-[10px] cursor-pointer"
          onClick={() => setShowReviews(true)}>
          <p>리뷰보기</p>
          <span className="w-[37px] h-[28px] px-[10px] py-[5px] border border-[#999999] rounded-full text-[16px] text-[#999898] flex items-center justify-center">
            {reviewCounts}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-[40px] mb-[30px]">
        {tags.map((tag, idx) => (
          <TagButton key={idx} hasDelete={true} text={tag} onClick={() => handleDelete(tag)} />
        ))}
      </div>

      <IconButton
        buttonType="squareMd"
        style="red"
        imgType="alert"
        text="프롬프트 신고하기"
        onClick={() => alert('신고')}
      />
    </div>
  );
};

export default PromptActions;
