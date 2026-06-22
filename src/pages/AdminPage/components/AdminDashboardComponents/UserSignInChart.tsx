import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import googleIcon from '@/assets/icon-google-logo.svg';
import promptplaceIcon from '@/assets/icon-promptplace-logo.svg';

const data = [
  { name: '자체 가입자', value: 300, color: '#3B82F6' }, // blue-500
  { name: '구글 가입자', value: 1030, color: '#93C5FD' }, // blue-300
  { name: '네이버 가입자', value: 670, color: '#DBEAFE' }, // secondary-pressed
];

type IconLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  index?: number;
};

const renderUserSignInIconLabel = ({ cx = 0, cy = 0, midAngle = 0, outerRadius = 0, index = 0 }: IconLabelProps) => {
  const RADIAN = Math.PI / 180;
  // outerRadius(그래프 바깥쪽 테두리)보다 살짝 더 멀리 띄움 (+15)
  const radius = outerRadius + 15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // foreignObject 사이즈 정의
  const size = 44;

  let iconContent;

  if (index === 0) {
    // 자체 가입자 아이콘
    iconContent = (
      <div className="w-full h-full flex justify-center items-center">
        <div className="p-[10px] bg-white rounded-full shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
          <img className="w-3 h-3" src={promptplaceIcon} alt={promptplaceIcon} />
        </div>
      </div>
    );
  } else if (index === 1) {
    // 구글 가입자 아이콘
    iconContent = (
      <div className="w-full h-full flex justify-center items-center">
        <div className="p-2 bg-white rounded-full shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
          <img className="w-3 h-3" src={googleIcon} alt="Google Icon" />
        </div>
      </div>
    );
  } else if (index === 2) {
    // 네이버 가입자 아이콘
    iconContent = (
      <div className="w-full h-full flex justify-center items-center">
        <div className="p-[10px] bg-white rounded-full shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
          <div className="w-4 h-4 bg-green-500 rounded-sm flex justify-center items-center text-white text-[10px] font-bold">
            N
          </div>
        </div>
      </div>
    );
  }

  return (
    // HTML 태그를 SVG 내부에 그리기 위한 태그
    <foreignObject x={x - size / 2} y={y - size / 2} width={size} height={size}>
      {iconContent}
    </foreignObject>
  );
};

export function UserSignInChart() {
  const totalUsers = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white">
      {/* 타이틀 영역 */}
      <h2 className="w-full text-left text-gray-800 text-lg font-bold mb-6 font-['S-Core_Dream']">회원가입자 수</h2>

      {/* 차트 영역 (w-48, h-48 사이즈 유지) */}
      <div className="w-48 h-48 relative mb-8">
        {/* 중앙 텍스트 (absolute로 정중앙 배치) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-10">
          <div className="text-gray-700 text-xs font-medium font-['S-Core_Dream'] leading-4 mb-1">총 회원수</div>
          <div className="text-gray-900 text-base font-bold font-['S-Core_Dream'] leading-6">
            {totalUsers.toLocaleString()}명
          </div>
        </div>

        {/* Recharts 파이 차트 */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55} // 안쪽을 뚫어 도넛 형태로 만듦
              outerRadius={80} // 바깥쪽 반지름
              paddingAngle={0}
              dataKey="value"
              stroke="none" // 테두리 선 제거
              labelLine={false} // 라벨 선 제거
              label={renderUserSignInIconLabel} // 커스텀 아이콘 라벨 적용
              isAnimationActive={true}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserSignInChart;
