import SettingsIcon from '@assets/icon-settings.svg?react';
import UploadIcon from '@assets/icon-upload.svg?react';
import ListIcon from '@assets/icon-list.svg?react';
import AttachIcon from '@assets/icon-attach-file-blue.svg?react';
import DownloadIcon from '@assets/icon-download-white.svg?react';
import AlertIcon from '@assets/icon-alert.svg?react';
import CopyIcon from '@assets/icon-copy.svg?react';
import LogoutIcon from '@assets/icon-sidebar-FiLogOut.svg?react';
import clsx from 'clsx';

/**
 * 아이콘과 함께 사용되는 버튼과 예, 아니오에 대한 버튼 컴포넌트입니다.
 *
 * @param {ButtonType} buttonType -- 버튼 모양
 * 둥근 버튼은 round, 이미지 업로드 및 복사하기는 squareMini, 다운로드는 squareBig, 목록과 첨부는 squareMd입니다.
 * 변경된 업로드 하기는 full로 넘기면 되고, 사용 시 좌우 padding값 주시면 됩니다.
 * @param {Style} style - 버튼 스타일 관련
 * 테두리만 있는 버튼은 outline, 파란 버튼은 fill, 프롬프트 신고하기는 red 입니다.
 * @param {string} imgType -- 버튼 이미지 종류
 * 각 버튼에 들어가는 이미지 종류입니다. 없을 땐 none을 넘기면 됩니다.
 * @param {TextButton} textButton -- 예, 아니오 버튼에 대해서만 사용되는 배경 색
 * @param {string} text -- 버튼 내용
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 * @param {string} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
 *
 * @example
 * <IconButton
 *    buttonType="round"
 *    style="outline"
 *    imgType="settings"
 *    text="업로드 세부 설정"
 *    onClick={() => {
 *        alert('업로그 세부 설정 클릭');
 *    }}
 * />
 *
 * @author 김진효
 * **/

const iconButtonTheme = {
  buttonType: {
    round:
      'px-[29px] max-phone:px-[12px] py-[21px] rounded-[50px] text-xl max-phone:text-[18px] font-medium leading-[25px] max-phone:leading-[13px] gap-[15px] max-phone:gap-[5px]',
    squareBig:
      'custom-h4 px-[20px] py-[12px] max-lg:py-[8px] rounded-[10px] max-lg:rounded-[4px] max-lg:text-[14px] max-lg:leading-[18px] gap-[15px] max-lg:gap-[8px]',
    squareMd:
      'px-[20px] max-lg:px-[8px] py-[10px] max-lg:py-[2px] rounded-[10px] max-lg:rounded-[4px] h-[45px] max-lg:h-auto text-xl max-lg:text-[10px] font-medium leading-[25px] max-lg:leading-[13px] gap-[15px] max-lg:gap-[4px]',
    squreSm:
      'px-[18px] py-[10px] rounded-[10px] flex items-center justify-center gap-[15px] text-base font-normal leading-[26px] tracking-[0.46px]',
    squareMini:
      'py-[5px] max-lg:py-[4px] pl-[14px] pr-[10px] max-lg:px-[6px] rounded-[4px] gap-[5px] text-lg max-lg:text-[10px] leading-[23px] max-lg:leading-[13px] font-normal',
    full: 'custom-h4 w-full rounded-[12px] py-[20px] gap-[16px]',
  },
  style: {
    outline:
      'border border-primary hover:border-primary-hover active:border-primary-pressed text-primary hover:text-primary-hover active:text-primary-pressed active:bg-secondary bg-white',
    fill: 'bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white',
    red: 'bg-alert text-white px-[29px] max-lg:px-[] leading-[24px] shadow-none hover:shadow-none',
  },
  textButton: {
    white: 'min-w-[160px] max-phone:min-w-[80px] bg-white max-phone:px-[15px] max-phone:h-[25px]',
    blue: 'min-w-[160px] max-phone:min-w-[80px] bg-primary max-phone:px-[15px] max-phone:h-[25px]',
  },
};

type ButtonType = keyof typeof iconButtonTheme.buttonType;
type Style = keyof typeof iconButtonTheme.style;
type TextButton = keyof typeof iconButtonTheme.textButton;

interface IconButtonProps {
  buttonType: ButtonType;
  style: Style;
  imgType: 'settings' | 'upload' | 'none' | 'list' | 'attach' | 'download' | 'alert' | 'copy' | 'LogoutIcon';
  textButton?: TextButton;
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit';
}

const IconButton = ({ buttonType, style, imgType, textButton, text, onClick, type = 'button' }: IconButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        `group flex justify-center items-center shadow-button hover:shadow-button-hover transition-all duration-300 ease-in-out whitespace-nowrap ${iconButtonTheme.buttonType[buttonType]} ${iconButtonTheme.style[style]} ${textButton && iconButtonTheme.textButton[textButton]}`,
        buttonType === 'round' && style === 'fill' && imgType === 'upload' && 'max-lg:w-[117px]',
        imgType === 'settings' && '[border-width:0.5px] border border-solid',
      )}>
      {imgType === 'settings' && (
        <SettingsIcon className="w-[24px] h-[24px] max-lg:w-[12px] max-lg:h-[12px] text-primary group-hover:text-primary-hover group-active:text-primary-pressed" />
      )}
      {imgType === 'upload' && (
        <UploadIcon className={clsx(buttonType === 'squareMini' ? 'w-[16px] h-[16px]' : 'w-[20px] h-[20px]')} />
      )}
      {imgType === 'list' && <ListIcon className="w-[24px] h-[24px] max-lg:w-[12px] max-lg:h-[12px]" />}
      {imgType === 'attach' && (
        <AttachIcon className="w-[24px] h-[24px] max-lg:w-[12px] max-lg:h-[12px] text-primary group-hover:text-primary-hover group-active:text-primary-pressed" />
      )}
      {imgType === 'download' && <DownloadIcon className="w-[20px] h-[20px] max-lg:w-[14px] max-lg:h-[14px]" />}
      {imgType === 'alert' && <AlertIcon className="w-[24px] h-[24px] max-lg:w-[12px] max-lg:h-[12px]" />}
      {imgType === 'copy' && <CopyIcon className="w-[20px] h-[20px] max-lg:w-[13px] max-lg:h-[13px]" />}
      {imgType === 'LogoutIcon' && <LogoutIcon className="w-[24px] h-[24px]" />}
      {text}
    </button>
  );
};

export default IconButton;
