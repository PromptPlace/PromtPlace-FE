import type { Review } from '@/pages/PromptDetailPage/components/ReviewList';

export const canEditReview = (review: Review, currentUserId?: number): boolean => {
  if (typeof window === 'undefined') return false;

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const viewerId = Number.isFinite(currentUserId)
    ? currentUserId!
    : (() => {
        try {
          const raw = localStorage.getItem('user');
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          const id = typeof parsed.user_id === 'number' ? parsed.user_id : Number(parsed.user_id);
          return Number.isFinite(id) ? id : null;
        } catch {
          return null;
        }
      })();

  return (viewerId !== null && review.writer_id === viewerId) || isAdmin;
};
