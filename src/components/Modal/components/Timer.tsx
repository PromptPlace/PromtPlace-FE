import { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number; // 👈 1. 시작 시간 (초)
  onEnd: () => void;      // 👈 2. 타이머 종료 시 실행될 함수
}

const Timer = ({ initialTime, onEnd }: TimerProps) => {
  // 3. 남은 시간을 state로 관리 (초 단위)
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    // 4. 1초마다 실행되는 인터벌 설정
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          // 5. 시간이 0초가 되면
          clearInterval(interval); // 인터벌 중지
          onEnd(); // 👈 부모에게 종료 알림
          return 0;
        }
        return prevSeconds - 1; // 1초 감소
      });
    }, 1000);

    // 6. 컴포넌트가 사라질 때 인터벌을 반드시 정리(clean up)
    return () => clearInterval(interval);
  }, [onEnd]); // 👈 onEnd prop이 바뀔 때만 effect가 다시 실행됨 (사실상 한 번)

  // 7. 남은 초(seconds)를 "mm:ss" 형식으로 포맷팅
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <span className="text-gray-400 custom-button2 bg-white px-[12px] py-[6px] w-[99px] rounded-[8px] flex justify-center items-center">
      {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
    </span>
  );
};

export default Timer;