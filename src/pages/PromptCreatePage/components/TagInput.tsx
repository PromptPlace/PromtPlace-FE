import React, { useState, useRef, useEffect } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import xbtn from '@assets/icon-delete-Xbutton.svg';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const PAGE_MAX_LEN = 10;

function splitTags(input: string) {
  return input
    .split('#')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function getPageTags(tags: string[], page: number, maxLen = PAGE_MAX_LEN) {
  let pages: string[][] = [];
  let curr: string[] = [];
  let sum = 0;
  tags.forEach((tag) => {
    if (sum + tag.length > maxLen) {
      pages.push(curr);
      curr = [];
      sum = 0;
    }
    curr.push(tag);
    sum += tag.length;
  });
  if (curr.length > 0) pages.push(curr);

  return {
    pageTags: pages[page] ?? [],
    totalPages: pages.length,
    pageStartIdxs: pages.reduce<{ idxs: number[]; i: number }>(
      (acc, currPage) => {
        acc.idxs.push(acc.i);
        acc.i += currPage.length;
        return acc;
      },
      { idxs: [], i: 0 },
    ).idxs,
  };
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState(true);
  const [page, setPage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 입력모드 → 완료 버튼 클릭
  const handleComplete = () => {
    const value = input.trim();
    if (value) {
      const newTags = splitTags(value);
      const uniqueTags = Array.from(new Set([...newTags])); //중복 내용 제거
      setTags(uniqueTags);
      setInput('');
      setPage(0);
    } else {
      setTags([]); // 입력창이 비었으면 tags도 비움
    }
    setIsEdit(false);
  };

  // 읽기모드에서 배경 클릭시  입력모드 진입, 기존 태그들 input 값으로 전환
  const handleAreaClick = () => {
    setInput(tags.map((tag) => `#${tag}`).join(' '));
    setTags([]);
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  // 태그 삭제(글로벌 인덱스 사용)
  const handleDeleteTag = (globalIdx: number) => {
    const newTags = tags.filter((_, i) => i !== globalIdx);
    setTags(newTags);
    setTimeout(() => {
      const { totalPages } = getPageTags(newTags, 0);
      if (page >= totalPages) setPage(Math.max(totalPages - 1, 0));
    }, 0);
  };

  // 페이지 정보
  const { pageTags, totalPages, pageStartIdxs } = getPageTags(tags, page);
  //현재 페이지의 태그 각각이 전체 tags 배열에서 몇 번째 태그인지를 계산
  const pageTagGlobalIdxs = pageTags.map((_, i) => (pageStartIdxs[page] ?? 0) + i);

  useEffect(() => {
    if (isEdit) inputRef.current?.focus();
  }, [isEdit]);

  //입력모드: 텍스트형태 (#코딩 #개발 #파이썬 ...)
  if (isEdit) {
    return (
      <div className="max-w-[490px] w-full min-h-[60px] flex items-center border border-primary rounded-[8px] px-[8px] py-[4px] gap-[8px]  bg-white ">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
          className="flex-1 border-none outline-none text-[18px] px-[8px] bg-transparent"
          placeholder="태그를 입력해 주세요(최대 10개)"
        />
        <button
          type="button"
          onClick={handleComplete}
          className="border border-primary rounded-[10px] px-4 py-1 text-primary text-base font-normal bg-white hover:bg-primary-hover hover:text-primary-hover">
          완료
        </button>
      </div>
    );
  }

  // 읽기모드: 버튼형 토큰, x 버튼, >/< 페이지네비

  // 태그가 1개일때
  if (!isEdit && tags.length === 1) {
    const onlyTag = tags[0];
    const displayTag = onlyTag.length > 45 ? onlyTag.slice(0, 35) + '...' : onlyTag; //35자까지만 보이게

    return (
      <div
        className="max-w-[490px] w-full min-h-[60px] flex items-center border border-primary rounded-[8px] px-[8px] py-[4px] gap-[8px] bg-white"
        style={{ cursor: 'text' }}
        onClick={handleAreaClick}
        tabIndex={0}>
        <span
          className="flex items-center rounded-[50px] px-4 py-1 border border-text-on-background text-[14px] font-normal text-text-on-background"
          style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.12)' }}
          onClick={(e) => e.stopPropagation()}>
          #{displayTag}
        </span>
      </div>
    );
  }

  // 태그가 2개 이상일 때
  return (
    <div
      className="max-w-[490px] w-full min-h-[60px] flex items-center border border-primary rounded-[8px] px-[8px] py-[4px] gap-[8px] bg-white"
      style={{ cursor: 'text' }}
      onClick={handleAreaClick}
      tabIndex={0}>
      {totalPages > 1 && page > 0 ? (
        <button
          type="button"
          className="mr-1 text-text-on-background flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            setPage(page - 1);
          }}
          aria-label="이전 태그">
          <LuChevronLeft size={22} />
        </button>
      ) : (
        <div className="w-[28px]" />
      )}

      <div className="flex-1 flex items-center overflow-x-auto min-w-0">
        {pageTags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center rounded-[50px] px-4 py-1 border border-text-on-background mr-2 text-[14px] font-normal text-text-on-background"
            style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.12)' }}
            onClick={(e) => e.stopPropagation()}>
            #{tag}
            <button
              type="button"
              className="ml-2 text-text-on-background focus:outline-none font-normal"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTag(pageTagGlobalIdxs[i]);
              }}>
              <img className="w-[12px] h-[12px] object-cover" src={xbtn} alt="delete btn" />
            </button>
          </span>
        ))}
      </div>

      {totalPages > 1 && page < totalPages - 1 ? (
        <button
          type="button"
          className="ml-1 text-text-on-background flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            setPage(page + 1);
          }}
          aria-label="다음 태그">
          <LuChevronRight size={22} />
        </button>
      ) : (
        <div className="w-[28px]" />
      )}
    </div>
  );
};

export default TagInput;
