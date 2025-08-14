import React, { useState } from 'react';
import likeIcon from '@/assets/icon-heart-blue-big.svg';
import unLikeIcon from '@/assets/icon-heart-none-big.svg';
import usePromptLike from '@/hooks/mutations/PromptDetailPage/usePromptLike';
import usePromptUnlike from '@/hooks/mutations/PromptDetailPage/usePromptUnlike';
import type { Prompt } from '@/types/MainPage/prompt';
import { useQueryClient } from '@tanstack/react-query';
import { likedKeys } from '@/hooks/queries/PromptDetailPage/useMyLikedPrompts';
import { isAxiosError } from 'axios';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';

interface LikesProps {
  prompt_id: number;
}

const Likes: React.FC<LikesProps> = ({ prompt_id }) => {
  const [Liked, setLiked] = useState(false);
  const likeMut = usePromptLike();
  const unlikeMut = usePromptUnlike();
  const isLiking = likeMut.isPending || unlikeMut.isPending;
  const qc = useQueryClient();
  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();

  const handleToggleLike = async () => {
    if (!Number.isFinite(prompt_id) || isLiking) return;

    const prev = Liked;
    setLiked(!prev);

    try {
      if (!prev) {
        await likeMut.mutateAsync(prompt_id);
      } else {
        await unlikeMut.mutateAsync(prompt_id);
      }
      await qc.invalidateQueries({ queryKey: likedKeys.all });
    } catch (e) {
      setLiked(prev);
      if (isAxiosError(e) && (e.response?.status ?? 0) === 401) {
        handleShowLoginModal(handleToggleLike);
        return;
      }
      alert('찜 처리에 실패했습니다.');
    }
  };

  return (
    <button onClick={handleToggleLike} className="absolute right-6 bottom-6 z-10">
      <img src={Liked ? likeIcon : unLikeIcon} className="w-5 h-5" />
    </button>
  );
};

export default Likes;
