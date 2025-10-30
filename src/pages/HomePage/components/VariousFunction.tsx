// components/VariousFunction.tsx
const VariousFunction = () => {
  return (
    <div className="px-[102px] w-full bg-white">
      <h2 className="text-[24px] font-medium text-[#1F2937] mb-[28px]">프롬프트 플레이스의 다양한 기능</h2>
      <div className="flex gap-[32px]">
        {/* 왼쪽: AI 꿀팁 */}
        <div className="flex-1 bg-[#F3F4F6] rounded-[12px] w-[718px] p-[40px] text-left">
          <h3 className="text-[32px] font-medium mb-1">AI 꿀팁</h3>
          <p className="text-[16px] text-[#030712] mb-4">각종 AI, 프롬프트 작성 꿀팁을 확인하세요!</p>
          <button className="flex items-center bg-[#FFFEFB] gap-2 text-sm text-[#030712] border-[#E5E7EB] rounded-full px-4 py-2 hover:bg-gray-100 transition">
            바로가기
            <span>→</span>
          </button>

          <div className="mt-4 bg-white rounded-md p-4 shadow-sm text-sm space-y-3">
            <div>
              <p className="text-[#9CA3AF] text-xs">2025.10.18.</p>
              <p className="font-medium mt-1">[AI 꿀팁] 잘 팔리고 잘 작성하는 프롬프트의 비밀</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] text-xs">2025.10.18.</p>
              <p className="font-medium mt-1">[AI 꿀팁] 잘 팔리고 잘 작성하는 프롬프트의 비밀</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] text-xs">2025.10.18.</p>
              <p className="font-medium mt-1">[AI 꿀팁] 잘 팔리고 잘 작성하는 프롬프트의 비밀</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] text-xs">2025.10.18.</p>
              <p className="font-medium mt-1">[AI 꿀팁] 잘 팔리고 잘 작성하는 프롬프트의 비밀</p>
            </div>
          </div>
        </div>

        {/* 오른쪽: 공지사항 */}
        <div className="flex-1 bg-[#F3F4F6] rounded-[12px] p-[40px]  text-left">
          <h3 className="text-[32px] font-medium mb-1">공지사항</h3>
          <p className="text-[16px] text-[#030712] mb-4">프롬프트 플레이스의 공지사항을 확인해보세요!</p>
          <button className="flex items-center bg-[#FFFEFB] gap-2 text-sm text-[#030712] border-[#E5E7EB] rounded-full px-4 py-2 hover:bg-gray-100 transition">
            바로가기
            <span>→</span>
          </button>
          {/* 공지사항 리스트 (한 박스에 모두 포함) */}
          <div className="mt-4 bg-white rounded-md p-4 shadow-sm text-sm space-y-3">
            <div>
              <p className="text-[#9CA3AF] text-xs">2025.10.18.</p>
              <p className="font-medium mt-1 text-[#EF4444]">[공지] 프롬프트 업로드 정책</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] text-xs">2025.10.18.</p>
              <p className="font-medium mt-1 text-[#EF4444]">[공지] 프롬프트 업로드 정책</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] text-xs">2025.10.18.</p>
              <p className="font-medium mt-1">[공지] 프롬프트 업로드 정책</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] text-xs">2025.10.18.</p>
              <p className="font-medium mt-1">[공지] 프롬프트 업로드 정책</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariousFunction;
