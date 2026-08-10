import React from 'react';

interface SearchSellerBarProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SearchSellerBar = ({ value, onChange, disabled }: SearchSellerBarProps) => {
  return (
    <input
      className="flex-1 px-5 py-4 bg-background rounded-lg w-100 h-[54px]"
      placeholder="닉네임 또는 ID로 검색해주세요."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default SearchSellerBar;
