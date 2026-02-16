import formatDate from '@/utils/formatDate';

import ChatBubble from './ChatBubble';

import DefaultIcon from '@assets/icon-profile-image-default.svg';
import PinIcon from '@assets/chat/icon-pin.svg?react';
import AttachIcon from '@assets/chat/icon-attach.svg?react';
import GalleryIcon from '@assets/chat/icon-gallery.svg?react';
import SendIcon from '@assets/chat/icon-send.svg?react';
import { useEffect, useRef, useState } from 'react';
import useGetChatRoomsDetail from '@/hooks/queries/ChatPage/useGetChatRoomsDetail';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import { getSocket } from '@/shared/socket/apis/socket';
import { useAuth } from '@/context/AuthContext';
import { useInView } from 'react-intersection-observer';

interface ChattingRoomProps {
  selectedRoomId: number;
}

const ChattingRoom = ({ selectedRoomId }: ChattingRoomProps) => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useGetChatRoomsDetail(selectedRoomId); // 채팅방 상세 조회
  const { user } = useAuth();

  const firstPage = data?.pages[0].data;
  const messages = data?.pages.map((page) => page.data.messages).flat() ?? []; // 채팅방 메세지 전체 조회

  const { data: userData } = useGetMember({ member_id: firstPage?.partner.user_id as number }); // 상대방 정보
  const { year, month, day, dayOfWeek } = formatDate(firstPage?.room.created_at || '');

  const [input, setInput] = useState('');

  const { ref, inView } = useInView({ threshold: 0 });
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
    setInput('');

    const socket = getSocket();
    if (!socket) return;

    socket.emit('sendMessage', { room_id: selectedRoomId, content: input, files: [] }, (ack: { ok: boolean }) => {
      if (!ack.ok) {
        console.log('sendMessage 실패');
        return;
      }
      console.log('sendMessage 성공');
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    const socket = getSocket();

    if (!socket || !selectedRoomId) return;

    // 방 입장
    socket.emit('joinRoom', { room_id: selectedRoomId }, (ack: { ok: boolean }) => {
      if (!ack?.ok) {
        console.log('joinRoom 실패');
        return;
      }
      console.log('joinRoom 성공');
    });
  }, [selectedRoomId]);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetching, hasNextPage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <>
      <div className="rounded-[12px] bg-white w-full p-[32px] flex flex-col h-dvh">
        {/* 상단 회원 정보 */}
        <div className="flex justify-between items-center  mb-[20px]">
          {/* 사진 ~소개 */}
          <div className="flex gap-[16px] items-center">
            <div className="size-[60px] rounded-full overflow-hidden">
              <img
                src={firstPage?.partner.profile_image_url || userData?.data.profile_image || DefaultIcon}
                alt="사용자 이미지"
                className="w-full h-full object-cover"
              />
            </div>

            <section>
              <div className="flex flex-col gap-[4px]">
                <div className="flex gap-[8px] items-center">
                  {/* 닉네임 */}
                  <h1 className="custom-h5 text-text-on-white">{firstPage?.partner.nickname}</h1>

                  {/* 운영자인 경우 운영자 버튼 */}
                  {firstPage?.partner.role === 'ADMIN' && (
                    <button className="bg-overlay custom-button3 text-white rounded-[4px] px-[8px] py-[2px]">
                      운영자
                    </button>
                  )}
                </div>

                {/* 계정 소개 */}
                {firstPage?.partner.role === 'ADMIN' && <p className="custom-body2">운영자 계정이에요</p>}
              </div>
            </section>
          </div>
          <PinIcon />
        </div>

        <div ref={ref} className="h-2 bg-red-300"></div>

        {/* 채팅 섹션 */}
        <section className="flex flex-col gap-[20px] flex-1 min-h-0 overflow-auto">
          {/* 사용자 정보 부분 */}
          <div className="flex flex-col gap-[20px] items-center pt-[20px]">
            {/* 사용자 이미지 */}
            <div className="size-[80px] rounded-full overflow-hidden">
              <img
                src={firstPage?.partner.profile_image_url || userData?.data.profile_image || DefaultIcon}
                alt="사용자 이미지"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-[8px] items-center">
              {/* 운영자인 경우 운영자 버튼 */}
              {firstPage?.partner.role === 'ADMIN' && (
                <button className="bg-overlay custom-button3 text-white rounded-[4px] px-[8px] py-[2px]">운영자</button>
              )}

              {/* 닉네임 */}
              <h1 className="custom-h5 text-text-on-white">{firstPage?.partner.nickname}</h1>

              {/* 운영자인 경우 소개 */}
              {firstPage?.partner.role === 'ADMIN' && (
                <p className="custom-body3">
                  궁금한 점을 남겨주시면 <br />
                  운영자가 확인 후 답변을 드려요.
                </p>
              )}

              {/*  채팅 내역 없는 경우 */}
              {messages.length === 0 && (
                <p className="custom-body3 text-center">
                  해당 이용자님과
                  <br />
                  자유롭게 대화를 나눠보세요.
                </p>
              )}
            </div>
          </div>

          {/* 날짜 */}
          <div className="py-[16px] flex items-center">
            <div className="w-full h-[1px] bg-gray400"></div>
            <div className="px-[20px] text-gray400">{`${year}.${month}.${day}(${dayOfWeek})`}</div>
            <div className="w-full h-[1px] bg-gray400"></div>
          </div>

          {/* 메시지 */}
          {messages && (
            <div className="flex flex-col gap-[8px] flex-1">
              {messages.map((msg, idx) => (
                <ChatBubble key={idx} text={msg.content} isMine={msg.sender_id === user.user_id} />
              ))}
            </div>
          )}

          <div ref={bottomRef}></div>
        </section>

        {/* 입력창 */}
        <div className="flex items-end w-full pt-[20px] relative">
          <div className="h-[58px] bg-background w-full px-[20px] py-[16px] rounded-[8px] flex gap-[20px] items-center">
            <div className="flex gap-[8px]">
              {/* 파일 선택 */}
              <label>
                <AttachIcon className="cursor-pointer" />
                <input type="file" className="hidden" />
              </label>

              {/* 사진 선택 */}
              <label>
                <GalleryIcon className="cursor-pointer" />
                <input type="file" className="hidden" />
              </label>
            </div>

            {/* 채팅 입력 */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="메시지를 입력해주세요."
              className="flex-1 cursor-pointer custom-body1 plcaeholder:font-['SCoreDream'] placeholder:custom-body1 placeholder:text-gray500"
            />

            {/* 채팅 전송 */}
            <SendIcon onClick={handleSubmit} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;
