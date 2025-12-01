import InstaIcon from '@assets/icon-instagram-logo.svg';
import YoutubeIcon from '@assets/icon-youtube-logo.svg';
import XIcon from '@assets/icon-x-logo.svg';

/**
 * TODO:
 * - sns 아이디 작성 필드 추가되면 수정해야 함
 * - 현재는 url 링크 일부가 표시되도록 되어 있음
 *
 * @author 김진효
 * **/

interface SnsButtonProps {
  url: string;
  id: string;
}

const SnsButton = ({ url, id }: SnsButtonProps) => {
  const getSnsType = (url: string) => {
    if (url.includes('instagram')) return InstaIcon;
    if (url.includes('youtube')) return YoutubeIcon;
    if (url.includes('x')) return XIcon;
    else return null;
  };

  const snsType = getSnsType(url);

  return (
    <>
      {snsType && (
        <a href={url} target="_blank">
          <div className="flex py-[6px] px-[12px] gap-[8px] justify-center items-center rounded-[50px] border border-[0.8px] border-gray300 bg-white self-center max-phone:rounded-full max-phone:px-[6px] max-phone:gap-[12px] max-phone:rounded-full">
            <img src={snsType} alt="sns" className="w-[24px] h-[24px]" />
            {id && <p className="custom-body3 overflow-hidden text-ellipsis max-phone:hidden">{id}</p>}
          </div>
        </a>
      )}
    </>
  );
};

export default SnsButton;
