import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import useGetChatRoomsDetail from '@/hooks/queries/ChatPage/useGetChatRoomsDetail';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import usePostPresignUrl from '@/hooks/mutations/ChatPage/usePostPresignUrl';
import usePatchPinChat from '@/hooks/mutations/ChatPage/usePatchPinChat';

import { getSocket } from '@/shared/socket/apis/socket';
import { useAuth } from '@/context/AuthContext';
import formatFileSize from '@/utils/formatFileSize';

import { QUERY_KEY } from '@/constants/key';
import formatDate from '@/utils/formatDate';
import ChatBubble from './ChatBubble';
import type { Message, ResponseChatRoomsDetailDto } from '@/types/ChatPage/chat';
import PreviewItem from './PreviewItem';
import ChatMenu from './ChatMenu';

import DefaultIcon from '@assets/icon-profile-image-default.svg';
import PinIcon from '@assets/chat/icon-pin.svg?react';
import PinPrimaryIcon from '@assets/chat/icon-pin-primary.svg?react';
import DotsIcon from '@assets/icon-dot.svg?react';
import AttachIcon from '@assets/chat/icon-attach.svg?react';
import GalleryIcon from '@assets/chat/icon-gallery.svg?react';
import SendIcon from '@assets/chat/icon-send.svg?react';

interface ChattingRoomProps {
  selectedRoomId: number;
}

const ChattingRoom = ({ selectedRoomId }: ChattingRoomProps) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]); // 파일 관련
  const [previews, setPreviews] = useState<string[]>([]); // 미리보기용 이미지
  const [showMenu, setShowMenu] = useState<boolean>(false); // 메뉴 클릭 여부
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, fetchNextPage, isFetching } = useGetChatRoomsDetail(selectedRoomId); // 채팅방 상세 조회
  const { mutateAsync: postPresignUrl } = usePostPresignUrl();
  const { mutate: mutatePatchPinChat } = usePatchPinChat();

  const { user } = useAuth();
  const queryClient = useQueryClient(); // 캐시 업데이트를 위해서 queryClient 가져옴

  const firstPage = data?.pages[0].data; // 첫 페이지 데이터 (채팅방 및 상대방 정보)
  const messages =
    data?.pages
      .map((page) => page.data.messages)
      .flat()
      .reverse() ?? []; // 채팅방 메세지 전체 조회 (최신 메시지 아래로 가도록 순서 뒤집기)

  const { data: userData } = useGetMember({ member_id: firstPage?.partner.user_id as number }); // 상대방 정보
  const { year, month, day, dayOfWeek } = formatDate(firstPage?.room.created_at || '');

  const scrollRef = useRef<HTMLDivElement | null>(null); // 채팅 스크롤 영역
  const { ref } = useInView({ threshold: 0, root: scrollRef.current });
  const bottomRef = useRef<HTMLDivElement | null>(null); // 채팅 맨 아래 위치 (자동 스크롤)

  // 메시지 전송
  const handleSubmit = async () => {
    const content = input;
    setInput('');

    const socket = getSocket();
    if (!socket) return;

    let filePayload: {
      key: string;
      content_type: string;
      name: string;
      size: number;
    }[] = [];

    // 파일 있는 경우
    if (files.length > 0) {
      const res = await postPresignUrl({
        files: files.map((file) => ({
          name: file.name,
          content_type: file.type,
        })),
      });

      const attachments = res.data.attatchments;

      filePayload = attachments.map((attachment, idx) => ({
        key: attachment.key,
        content_type: files[idx].type,
        name: files[idx].name,
        size: files[idx].size,
      }));
    }

    // socket으로 메시지 전송
    socket.emit('sendMessage', { room_id: selectedRoomId, content, files: filePayload }, (ack: { ok: boolean }) => {
      if (!ack.ok) {
        console.log('sendMessage 실패', ack);
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

  // 채팅 스크롤 이벤트
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // 스크롤 상단 도달 -> 이전 메시지 불러오기
    if (el.scrollTop <= 10 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  // 파일 선택
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;
    if (files.length === 3) return;
    if (previews.length === 3) return;

    const fileArr = Array.from(selected);

    setFiles((prev) => [...prev, ...fileArr]);

    const previewUrl = fileArr.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...previewUrl]);
  };

  // 파일 지우기
  const handleDeleteFile = (idx: number) => {
    URL.revokeObjectURL(previews[idx]);

    setPreviews((prev) => prev.filter((_, i) => i !== idx));
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 채팅방 고정

  // 채팅방 입장
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

    return () => {
      socket.emit('leaveRoom', { room_id: selectedRoomId }, (ack: { ok: boolean }) => {
        if (!ack?.ok) {
          console.log('leaveRoom 실패');
          return;
        }
        console.log('leaveRoom 성공');
      });
    };
  }, [selectedRoomId]);

  // 새 메시지 도착 (메시지 개수 변경 시) -> 아래로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // 메시지 수신
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // 서버에서 메시지 받음
    const handleReceiveMessage = (newMessage: Message) => {
      // 캐시 업데이트
      queryClient.setQueryData(
        [QUERY_KEY.chatRooms, selectedRoomId, undefined],
        (old: InfiniteData<ResponseChatRoomsDetailDto>) => {
          if (!old) return old;

          // 기존 pages 복사
          const newPages = [...old.pages];

          // 첫 페이지에 새 메시지 추가 (최신 메시지는 가장 첫 페이지에 존재해야하므로)
          newPages[0] = {
            ...newPages[0],
            data: {
              ...newPages[0].data,
              messages: [newMessage, ...newPages[0].data.messages],
            },
          };

          return {
            ...old,
            pages: newPages,
          };
        },
      );
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [selectedRoomId, queryClient]);

  return (
    <>
      {selectedRoomId !== null && (
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

              <div ref={menuRef} className="flex items-center gap-[16px] relative">
                {firstPage?.room.is_pinned ? (
                  <PinPrimaryIcon onClick={() => mutatePatchPinChat(selectedRoomId)} className="cursor-pointer" />
                ) : (
                  <PinIcon onClick={() => mutatePatchPinChat(selectedRoomId)} className="cursor-pointer" />
                )}
                <DotsIcon className="cursor-pointer" onClick={() => setShowMenu((prev) => !prev)} />

                {/* 메뉴 */}
                {showMenu && (
                  <div className="absolute right-0 top-8">
                    <ChatMenu roomId={selectedRoomId} blocked_user_id={userData?.data.member_id as number} />
                  </div>
                )}
              </div>
            </div>

            {/* 채팅 섹션 */}
            <section
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex flex-col gap-[20px] flex-1 min-h-0 overflow-auto">
              <div ref={ref} className="h-2 bg-red-300 shrink-0"></div>

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
                    <button className="bg-overlay custom-button3 text-white rounded-[4px] px-[8px] py-[2px]">
                      운영자
                    </button>
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
                  {messages.map((msg) => (
                    <ChatBubble
                      key={msg.message_id}
                      text={msg.content}
                      files={msg.attachments}
                      isMine={(msg.sender_id ?? msg?.sender?.user_id) === user.user_id}
                    />
                  ))}
                </div>
              )}

              <div ref={bottomRef}></div>
            </section>

            {/* 입력창 */}
            <div className="flex flex-col w-full relative bg-background">
              <div className="w-full px-[20px] py-[16px] rounded-[8px] flex gap-[20px] items-start">
                <div className="flex gap-[8px]">
                  {/* 파일 선택 */}
                  <label>
                    <AttachIcon className="cursor-pointer" />
                    <input type="file" className="hidden" onChange={handleFileSelect} />
                  </label>

                  {/* 사진 선택 */}
                  <label>
                    <GalleryIcon className="cursor-pointer" />
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
                  </label>
                </div>

                <div className="flex-1">
                  {/* 채팅 입력 */}
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleEnter}
                    placeholder="메시지를 입력해주세요."
                    className="flex-1 cursor-pointer custom-body1 plcaeholder:font-['SCoreDream'] placeholder:custom-body1 placeholder:text-gray500"
                  />

                  <div className="flex gap-[4px] flex-wrap">
                    {previews.length > 0 &&
                      previews.map((item, idx) => (
                        <PreviewItem
                          key={idx}
                          imageURL={item}
                          fileSize={formatFileSize({ size: files[idx].size })}
                          handleDeleteImage={() => handleDeleteFile(idx)}
                        />
                      ))}
                  </div>
                </div>

                {/* 채팅 전송 */}
                <SendIcon onClick={handleSubmit} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChattingRoom;
