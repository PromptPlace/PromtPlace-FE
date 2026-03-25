import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import ArrowIcon from '@assets/header/icon-arrow_fill.svg?react';
import useGetMyDownloadedPrompts from '@/hooks/queries/MyPage/useGetMyDownloadedPrompts';
import clsx from 'clsx';

interface ChattingRoomProps {
  selectedRoomId: number;
  className?: string;
  popup?: boolean;
}

const ChattingRoom = ({ selectedRoomId, className, popup }: ChattingRoomProps) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]); // 파일 관련
  const [previews, setPreviews] = useState<string[]>([]); // 미리보기용 이미지
  const [showMenu, setShowMenu] = useState<boolean>(false); // 메뉴 클릭 여부
  const [showDownload, setShowDownload] = useState<boolean>(false); // 내가 다운받은 프롬프트
  const [showDownloadAll, setShowDownloadAll] = useState<boolean>(false); // 내가 다운받은 프롬프트 더 보기
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isFirstLoad = useRef(true); // 처음 입장했는지
  const prevHeightRef = useRef(0);

  const isTablet = window.innerWidth < 1024;

  const { data, hasNextPage, fetchNextPage, isFetching } = useGetChatRoomsDetail(selectedRoomId); // 채팅방 상세 조회
  const { mutateAsync: postPresignUrl } = usePostPresignUrl();
  const { mutate: mutatePatchPinChat } = usePatchPinChat();
  const { data: downloadPromptsData } = useGetMyDownloadedPrompts();

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
    // 1. presign
    if (files.length > 0) {
      const res = await postPresignUrl({
        files: files.map((file) => ({
          name: file.name,
          content_type: file.type,
        })),
      });

      const attachments = res.data.attatchments;

      // 2. S3 업로드
      await Promise.all(
        attachments.map(async (attachment, idx) => {
          const res = await fetch(attachment.url, {
            method: 'PUT',
            headers: {
              'Content-Type': files[idx].type,
            },
            body: files[idx],
          });

          if (!res.ok) {
            console.error('S3 업로드 실패', res);
            throw new Error('S3 upload failed');
          }
        }),
      );

      // 3. payload 생성
      filePayload = attachments.map((attachment, idx) => ({
        key: attachment.key,
        content_type: files[idx].type,
        name: files[idx].name,
        size: files[idx].size,
      }));
    }

    // 4. socket으로 메시지 전송
    socket.emit('sendMessage', { room_id: selectedRoomId, content, files: filePayload }, (ack: { ok: boolean }) => {
      if (!ack.ok) {
        console.log('sendMessage 실패', ack);
        return;
      }
      console.log('sendMessage 성공');
      setFiles([]);
      setPreviews([]);
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // 채팅 스크롤 이벤트
  const handleScroll = async () => {
    const el = scrollRef.current;
    if (!el) return;

    // 스크롤 상단 도달 -> 이전 메시지 불러오기
    if (el.scrollTop <= 200 && hasNextPage && !isFetching) {
      prevHeightRef.current = el.scrollHeight; // fetch 전 높이 저장
      await fetchNextPage();
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

    e.target.value = '';
  };

  // 파일 지우기
  const handleDeleteFile = (idx: number) => {
    URL.revokeObjectURL(previews[idx]);

    setPreviews((prev) => prev.filter((_, i) => i !== idx));
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const isNearBottom = () => {
    const el = scrollRef.current;
    if (!el) return false;
    console.log(el.scrollHeight - el.scrollTop - el.clientHeight);

    return el.scrollHeight - el.scrollTop - el.clientHeight < 200;
  };

  // tablet 이하인 경우 스크롤 막음
  useEffect(() => {
    if (!isTablet) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isTablet]);

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
  useLayoutEffect(() => {
    if (!messages.length) return;

    // 처음 입장했을 때에는 맨 아래로 이동
    if (isFirstLoad.current) {
      const el = scrollRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
      isFirstLoad.current = false;
      return;
    }

    // 사용자가 아래 보고 있을 때 스크롤 내려줌
    if (isNearBottom()) {
      const el = scrollRef.current;
      if (el) {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages.length, isTablet]);

  useEffect(() => {
    isFirstLoad.current = true;
  }, [selectedRoomId]);

  // fetch 후 스크롤 위치 유지
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (prevHeightRef.current) {
      const diff = el.scrollHeight - prevHeightRef.current;
      el.scrollTop += diff;
      prevHeightRef.current = 0;
    }
  }, [data]);

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
          <div
            className={clsx(
              'rounded-[12px] bg-white w-full p-[32px] flex flex-col h-[717px]',
              !popup && 'relative overflow-hidden',
              'max-lg:fixed max-lg:inset-0 max-lg:h-dvh',
              className,
            )}>
            {/* 내가 다운받은 프롬프트 */}
            {showDownload && (
              <div className={clsx('z-10 inset-0 top-[92px] bg-overlay', popup ? 'fixed h-dvh' : 'absolute h-full')}>
                <div
                  className={clsx(
                    'absolute inset-0 bg-white flex flex-col gap-[16px] p-[32px]',
                    showDownloadAll ? (popup ? 'h-dvh' : 'h-full') : 'h-max max-h-[215px]',
                  )}>
                  <ul className="list-disc ">
                    {/* 3개까지 잘라서 보여줌 */}
                    {!showDownloadAll &&
                      downloadPromptsData?.data.slice(0, 3).map((data) => (
                        <li key={data.prompt_id} className="custom-body2">
                          {data.title}
                        </li>
                      ))}
                    {/* 더 보기인 경우 전체 다 보여줌 */}
                    {showDownloadAll &&
                      downloadPromptsData?.data.map((data) => (
                        <li key={data.prompt_id} className="custom-body2">
                          {data.title}
                        </li>
                      ))}
                  </ul>

                  {/* 4개 이상인 경우 더 보기 버튼 */}
                  {downloadPromptsData?.data && downloadPromptsData.data.length > 4 && (
                    <div className={clsx('flex justify-center', showDownloadAll && 'flex-1 pb-[112px] items-end')}>
                      <button
                        onClick={() => {
                          setShowDownloadAll((prev) => !prev);
                          if (showDownloadAll) {
                            setShowDownload(false);
                          }
                        }}
                        className={clsx(
                          'text-gray500 px-[16px] h-[45px] flex justify-center items-center rounded-[12px] bg-white hover:bg-background duration-300',
                        )}>
                        {showDownloadAll ? '메시지로 돌아가기' : '더 보기'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 상단 회원 정보 */}
            <div className="flex justify-between items-center mb-[20px] relative">
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
                    {firstPage?.partner.role === 'USER' && (
                      <div className="flex relative">
                        <p className="custom-body2">내가 다운받은 프롬프트</p>
                        <ArrowIcon
                          className={clsx(
                            'cursor-pointer transition-all duration-500 ease-in-out',
                            showDownload ? '-rotate-180' : 'rotate-none',
                          )}
                          onClick={() => setShowDownload((prev) => !prev)}
                        />
                      </div>
                    )}
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
              <div ref={ref} className="h-2 shrink-0"></div>

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

                  <p className="custom-body3 text-center">
                    해당 이용자님과
                    <br />
                    자유롭게 대화를 나눠보세요.
                  </p>
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
                      popup={popup}
                    />
                  ))}
                </div>
              )}

              {/* <div ref={bottomRef} className="h-2 bg-red-400 shrink-0"></div> */}
            </section>

            {/* 입력창 */}
            <div className="flex flex-col w-full relative bg-background">
              <div className="w-full px-[20px] py-[16px] rounded-[8px] flex gap-[20px] items-start">
                <div className="flex gap-[8px]">
                  {/* 파일 선택 */}
                  <label>
                    <AttachIcon className="cursor-pointer text-gray500" />
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
                          type={files[idx].type}
                          name={files[idx].name}
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
