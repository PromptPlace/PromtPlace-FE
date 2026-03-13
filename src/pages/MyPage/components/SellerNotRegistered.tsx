import ReportIcon from '@assets/icon-report.svg';

interface SellerNotRegisteredProps {
  onRegisterClick: () => void;
}

const SellerNotRegistered = ({ onRegisterClick }: SellerNotRegisteredProps) => {
  return (
    <div className="flex flex-col gap-[56px]">
      {/* 판매자 등록 안내 섹션 */}
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[12px] text-text-on-white">
          <h2 className="text-[24px] font-medium leading-[1.4] tracking-[-0.01em]">판매자 등록이 필요해요</h2>
          <p className="text-[16px] font-light leading-[1.6] tracking-[0.02em]">
            판매자 등록을 완료하고 나만의 프롬프트를 판매해 보세요!
          </p>
        </div>

        {/* 등록하기 버튼 */}
        <button
          onClick={onRegisterClick}
          className="flex h-[57px] items-center justify-center rounded-[12px] bg-primary px-[20px] py-[16px] shadow-button">
          <span className="text-[18px] font-medium leading-[1.4] tracking-[-0.01em] text-white">판매자 등록하기</span>
        </button>

        {/* 준비물 안내 카드 */}
        <div className="flex flex-col gap-[20px] rounded-[12px] bg-white p-[24px]">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[8px]">
              <img src={ReportIcon} alt="안내" className="size-[24px]" />
              <h3 className="text-[16px] font-medium leading-[1.4] tracking-[-0.01em] text-text-on-white">
                등록하기 위해 무엇이 필요한가요?
              </h3>
            </div>
            <div className="text-[16px] font-light leading-[1.6] tracking-[0.02em] text-text-on-white">
              <p className="mb-0">유료 프롬프트를 판매하기 전, 판매자 등록을 위해서는 다음의 자료가 필요해요.</p>
              <ul className="list-disc whitespace-pre-wrap">
                <li className="mb-0 ms-[24px]">
                  <span className="leading-[1.6]">
                    본인 명의의 국내 은행 계좌번호를 준비해 주세요. (일반 입출금 계좌만 가능)
                  </span>
                </li>
                <li className="ms-[24px]">
                  <span className="leading-[1.6]">
                    개인 혹은 법인 사업자로 등록하시려면 사업자등록증을 준비해 주세요.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <a
            href="#"
            className="text-[14px] font-medium leading-[1.5] text-primary underline decoration-solid decoration-skip-ink-none">
            판매자 등록 개인정보 수집 및 이용약관 확인하기
          </a>
        </div>
      </div>

      {/* 정산 예정 금액 섹션 */}
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[24px] font-medium leading-[1.4] tracking-[-0.01em] text-text-on-white">정산 예정 금액</h2>
        <div className="flex flex-col gap-[20px] rounded-[12px] border-[0.8px] border-primary bg-white p-[24px]">
          <div className="flex gap-[20px]">
            {/* 좌측: 정산 금액 */}
            <div className="flex min-w-0 flex-1 flex-col gap-[20px]">
              <div className="flex flex-col gap-[4px]">
                <h3 className="text-[18px] font-medium leading-[1.4] tracking-[-0.01em] text-text-on-white">
                  2026년 2월 정산 예정 금액
                </h3>
                <p className="text-[12px] font-medium leading-[1.5] text-alert">
                  ※ 아직 판매자 등록이 완료되지 않아 데이터를 확인할 수 없어요.
                </p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <p className="text-[32px] font-medium leading-[1.4] tracking-[-0.01em] text-gray-400">-</p>
                <p className="text-[16px] font-light leading-[1.6] tracking-[0.02em] text-gray-700">
                  다음 정산일: 2026.03.15 (월)
                </p>
              </div>

              <div className="flex flex-col gap-[12px] rounded-[8px] bg-gray-50 px-[16px] py-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-light leading-[1.6] tracking-[0.02em] text-text-on-white">
                    총 판매 금액
                  </span>
                  <span className="text-[16px] font-medium leading-[1.4] tracking-[-0.01em] text-gray-700">-</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-light leading-[1.6] tracking-[0.02em] text-text-on-white">
                    서비스 수수료(19%)
                  </span>
                  <span className="text-[16px] font-medium leading-[1.4] tracking-[-0.01em] text-alert">-</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-light leading-[1.6] tracking-[0.02em] text-text-on-white">
                    부가가치세(VAT)
                  </span>
                  <span className="text-[16px] font-medium leading-[1.4] tracking-[-0.01em] text-alert">-</span>
                </div>
              </div>
            </div>

            {/* 우측: 정산 안내 */}
            <div className="flex shrink-0 flex-col gap-[20px]">
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[8px]">
                  <img src={ReportIcon} alt="안내" className="size-[24px]" />
                  <h3 className="text-[16px] font-medium leading-[1.4] tracking-[-0.01em] text-text-on-white">
                    정산 관련 안내 사항
                  </h3>
                </div>
                <div className="text-[16px] font-light leading-[1.6] tracking-[0.02em] text-text-on-white">
                  <ul className="list-disc whitespace-pre-wrap">
                    <li className="mb-0 ms-[24px]">
                      <span className="leading-[1.6]">정산 금액은 수수료 및 세금 공제 후 금액입니다.</span>
                    </li>
                    <li className="mb-0 ms-[24px]">
                      <span className="leading-[1.6]">
                        정산일은 매월 15일이며, 이전 한 달 동안의 수익이 정산됩니다.
                      </span>
                    </li>
                    <li className="mb-0 ms-[24px]">
                      <span className="leading-[1.6]">
                        최소 정산 금액은 10,000원이며 미달성 시 다음달로 이월됩니다.
                      </span>
                    </li>
                    <li className="ms-[24px]">
                      <span className="leading-[1.6]">부가가치세(VAT)는 수수료의 10%가 공제됩니다.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <a
                href="#"
                className="text-[14px] font-medium leading-[1.5] text-primary underline decoration-solid decoration-skip-ink-none">
                정산 관련 세부 안내사항 확인하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerNotRegistered;
