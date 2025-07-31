import ArrowUp from '@assets/mobile/icon-mobile-arrow-up.svg';
import ArrowDown from '@assets/mobile/icon-mobile-arrow-down.svg';
import { useState } from 'react';

interface SelectProps {
  menuList: { id: number; label: string }[];
  menuId: number;
  setMenuId: (id: number) => void;
}

const Select = ({ menuList, menuId, setMenuId }: SelectProps) => {
  const [show, setShow] = useState<boolean>(false);

  const handleSelect = (id: number) => {
    setMenuId(id);
    setShow(false);
  };

  return (
    <div className="relative shrink-0">
      <div className="absolute z-10 whitespace-nowrap">
        <button
          onClick={() => setShow((prev) => !prev)}
          className="rounded-[8px] bg-white shadow-button cursor-pointer py-[8px] px-[12px] text-text-on-white text-[12px] font-medium leading-[15px] flex gap-[8px] justify-center items-center">
          {menuList?.find((menu) => menu.id === menuId)?.label}
          <div className="w-[10px] h-[10px]">
            {!show && <img src={ArrowDown} alt="arrow-down" className="w-full h-full" />}
            {show && <img src={ArrowUp} alt="arrow-up" className="w-full h-full" />}
          </div>
        </button>
        {show && (
          <ul className="rounded-[8px] border border-[0.5px] border-white-stroke bg-white shadow-button-hover py-[6px] px-[12px] w-max text-text-on-background text-center flex flex-col divide-y-[0.5px] text-[12px] font-normal leading-[15px] whitespace-nowrap">
            {menuList.map((menu) => (
              <li
                key={menu.id}
                onClick={() => handleSelect(menu.id)}
                className="cursor-pointer hover:text-text-on-white py-[6px] px-[9px]">
                {menu.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
