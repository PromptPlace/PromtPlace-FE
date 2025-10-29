import React, { useEffect, useState } from 'react';
import likeIcon from '@/assets/icon-heart-blue.svg';
import unLikeIcon from '@/assets/icon-heart-none.svg';
import usePromptLike from '@/hooks/mutations/PromptDetailPage/usePromptLike';
import usePromptUnlike from '@/hooks/mutations/PromptDetailPage/usePromptUnlike';
import useMyLikedPrompts, { likedKeys } from '@/hooks/queries/PromptDetailPage/useMyLikedPrompts';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import { useAuth } from '@/context/AuthContext';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';

const Likes = ({ prompt_id }: { prompt_id: number }) => {
  const { accessToken } = useAuth();
  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();
  const qc = useQueryClient();

  // 내 찜한 프롬프트 Set 쿼리
  const { data: likedSet } = useMyLikedPrompts(true); // true: 활성화(혹은 조건에 맞게)
  const [liked, setLiked] = useState(false);

  // 쿼리 데이터와 동기화
  useEffect(() => {
    if (likedSet && Number.isFinite(prompt_id)) {
      setLiked(likedSet.has(prompt_id));
    }
  }, [likedSet, prompt_id]);

  const likeMut = usePromptLike();
  const unlikeMut = usePromptUnlike();
  const isLiking = likeMut.isPending || unlikeMut.isPending;

  const handleToggleLike = async () => {
    if (!Number.isFinite(prompt_id) || isLiking) return;

    const prev = liked;
    setLiked(!prev); // Optimistic update

    try {
      if (!prev) {
        await likeMut.mutateAsync(prompt_id);
      } else {
        await unlikeMut.mutateAsync(prompt_id);
      }
      await qc.invalidateQueries({ queryKey: likedKeys.all });
    } catch (e) {
      setLiked(prev); // rollback
      if (isAxiosError(e) && (e.response?.status ?? 0) === 401) {
        handleShowLoginModal(handleToggleLike);
        return;
      }
      alert('찜 처리에 실패했습니다.');
    }
  };

  return (
    <>
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}

      <button
        onClick={() => {
          if (!accessToken) {
            alert('로그인이 필요합니다.');
            setLoginModalShow(true);
            return;
          }
          handleToggleLike();
        }}>
        <img src={liked ? likeIcon : unLikeIcon} className="w-7 h-6" />
      </button>
    </>
  );
};

export default Likes;
