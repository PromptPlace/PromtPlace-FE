import { BsPaperclip } from 'react-icons/bs';

interface Postlist {
  id: number;
  title: string;
  file_url: null | string;
  create_at: string;
}
const MobileList = ({ data, onRowClick }: { data: Postlist[]; onRowClick: (id: number) => void }) => {
  return (
    <div className="w-full min-w-[280px] my-[12px] mx-[20px] cursor-pointer flex flex-col justify-center">
      {data.length === 0 ? (
        <div>
          <td colSpan={3} className="text-center py-4 text-gray-400">
            게시글이 없습니다.
          </td>
        </div>
      ) : (
        data.map((post) => (
          <div
            key={post.id}
            className="w-full min-w-[280px] h-[56px] flex flex-col justify-center border-b-[1px] border-white-stroke bg-white "
            onClick={() => onRowClick(post.id)}>
            <p className="ml-[12px] text-[8px] text-text-on-background font-medium">{post.create_at}</p>
            <div className="w-[92%] min-w-[256px] h-[16px] ml-[12px] mr-[20px] flex justify-between items-center mt-[6px]">
              <p className="text-[12px] text-text-on-white font-medium">{post.title}</p>
              <div>{post.file_url ? <BsPaperclip size={16} /> : ''}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MobileList;
