import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import IconButton from '@components/Button/IconButton';
import CheckIcon from '@assets/icon-check-circle.svg';
import AlertIcon from '@assets/icon-alert.svg';
import { SESSION_STORAGE_KEY } from '@/constants/key';

/**
 * 페이플 결제 인증 후 백엔드(/payple-result)가 처리 결과를 담아
 * 리다이렉트시키는 착지 페이지입니다. (?status=success|fail&oid=...&message=...)
 *
 * 결제 시작 시 usePostRequestPayment에서 sessionStorage에 기록해둔 promptId가 있으면,
 * 이 페이지에 머물지 않고 원래 보던 프롬프트 상세 페이지로 바로 돌려보낸다.
 */
const PurchaseResultPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get('status');
  const message = searchParams.get('message');
  const isSuccess = status === 'success';

  const [pendingPromptId] = useState(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY.pendingPurchasePromptId);
    const n = Number(stored);
    return Number.isFinite(n) && n > 0 ? n : null;
  });

  useEffect(() => {
    if (pendingPromptId === null) return;

    sessionStorage.removeItem(SESSION_STORAGE_KEY.pendingPurchasePromptId);

    if (!isSuccess && message) {
      alert(message);
    }

    navigate(`/prompt/${pendingPromptId}`, { replace: true });
  }, [pendingPromptId, isSuccess, message, navigate]);

  // 돌아갈 프롬프트가 있으면 결과 화면을 보여줄 필요 없이 바로 이동한다.
  if (pendingPromptId !== null) return null;

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col items-center justify-center gap-6 px-5 text-center">
      <img src={isSuccess ? CheckIcon : AlertIcon} alt="" className="w-16 h-16" />

      <p className="text-2xl font-medium text-black">
        {isSuccess ? '결제가 완료되었습니다.' : '결제가 완료되지 않았습니다.'}
      </p>

      {message && <p className="text-base font-light text-gray-600 max-w-[480px] whitespace-pre-wrap">{message}</p>}

      <div className="flex gap-4 mt-4">
        <IconButton
          buttonType="round"
          style="fill"
          imgType="none"
          textButton="blue"
          text="메인으로"
          onClick={() => navigate('/', { replace: true })}
        />
        <IconButton
          buttonType="round"
          style="outline"
          imgType="none"
          textButton="white"
          text="구매내역 보기"
          onClick={() => navigate('/mypage', { replace: true })}
        />
      </div>
    </div>
  );
};

export default PurchaseResultPage;
