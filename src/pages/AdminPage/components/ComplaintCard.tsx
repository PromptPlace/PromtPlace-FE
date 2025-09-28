const ComplaintCard = () => {
  return (
    <div className=" w-full bg-white border-b-[1px] border-white-stroke">
      <div className="w-[72px]">읽음 여부</div>
      <div className="max-w-[678px]">프롬프트 제목</div>
      <div className="w-[223px] flex justify-center items-center">닉네임</div>
      <div className="w-[263px] flex justify-center items-center">신고 날짜</div>
    </div>
  );
};
export default ComplaintCard;
