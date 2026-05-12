import { useState } from 'react';
import SellerNotRegistered from '@/pages/MyPage/components/SellerNotRegistered';
import SellerRegistrationForm from '@/pages/MyPage/components/SellerRegistrationForm';

const SellerNotRegisteredTestPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  if (showRegistrationForm) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-[20px] py-[40px]">
        <SellerRegistrationForm onSubmit={(data) => console.log('SellerRegistration test payload:', data)} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-[20px] py-[40px]">
      <SellerNotRegistered onRegisterClick={() => setShowRegistrationForm(true)} />
    </div>
  );
};

export default SellerNotRegisteredTestPage;