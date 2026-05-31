interface RightArrowIconProps {
  fillColor: string;
}

const RightArrowIcon = ({ fillColor }: RightArrowIconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.70749 6.29303C9.51997 6.48056 9.51997 6.78719 9.70749 6.97472L14.7325 12L9.70749 17.0253C9.51997 17.2128 9.51997 17.5195 9.70749 17.707C9.89502 17.8945 10.2016 17.8945 10.3892 17.707L15.7559 12.3404C15.9434 12.1528 15.9434 11.8462 15.7559 11.6587L10.3892 6.29303C10.2016 6.1055 9.89502 6.1055 9.70749 6.29303Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default RightArrowIcon;
